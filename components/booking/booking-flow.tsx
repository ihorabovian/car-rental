"use client"

import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { parseISO } from "date-fns"
import { ClientError } from "graphql-request"
import { FormProvider, useForm, useWatch, type DeepPartialSkipArrayKey, type FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { BookingActions } from "@/components/booking/booking-actions"
import { BookingShell } from "@/components/booking/booking-shell"
import { BookingSkeleton } from "@/components/booking/booking-skeleton"
import { BookingSummary, type SummaryRow } from "@/components/booking/booking-summary"
import { CustomerStep } from "@/components/booking/customer-step"
import { RentalStep } from "@/components/booking/rental-step"
import { ReviewStep } from "@/components/booking/review-step"
import { SuccessView } from "@/components/booking/success-view"
import { createCarRent } from "@/lib/api/rent-api"
import { clearBookingDraft, readBookingDraft, saveBookingDraft } from "@/lib/booking/draft"
import { bookingSchema } from "@/lib/booking/schema"
import type { BookedRent, BookingFieldName, BookingValues } from "@/lib/booking/types"
import { formatDays, formatRentalDates, getRentalDays } from "@/lib/cars/format"
import { formatDate } from "@/lib/format"
import type { CarDetails, RentalDates } from "@/lib/cars/types"

type BookingFlowProps = {
  car: Pick<CarDetails, "id" | "name" | "price">
  initialDates: RentalDates | null
  carHref: string
}

type WatchedValues = DeepPartialSkipArrayKey<BookingValues>

const STEP_TITLES = ["Car booking", "Your details", "Review details"]

const STEP_FIELDS: BookingFieldName[][] = [
  ["dates", "pickupLocation", "returnLocation"],
  ["lastName", "firstName", "middleName", "birthDate", "phone", "email", "comment", "isTermsAccepted"],
]

const LAST_STEP_INDEX = STEP_TITLES.length - 1

const DEFAULT_ERROR = "Could not book the car. Try again later."

const EMPTY_VALUES = {
  pickupLocation: "",
  returnLocation: "",
  lastName: "",
  firstName: "",
  middleName: "",
  birthDate: "",
  phone: "",
  email: "",
  comment: "",
  isTermsAccepted: false,
}

const toRentalDates = (dates: WatchedValues["dates"]): RentalDates | null =>
  dates?.startDate && dates.endDate ? { startDate: dates.startDate, endDate: dates.endDate } : null

const getCarRows = (carName: string, dates: RentalDates | null, values: WatchedValues): SummaryRow[] => [
  { label: "Car", value: carName },
  { label: "Rental dates", value: dates ? formatRentalDates(dates) : "" },
  { label: "Pickup location", value: values.pickupLocation ?? "" },
  { label: "Return location", value: values.returnLocation ?? "" },
]

const getCustomerRows = (values: WatchedValues): SummaryRow[] => [
  { label: "Full name", value: [values.firstName, values.middleName, values.lastName].filter(Boolean).join(" ") },
  { label: "Date of birth", value: values.birthDate ? formatDate(parseISO(values.birthDate)) : "" },
  { label: "Phone", value: values.phone ?? "" },
  { label: "Email", value: values.email ?? "" },
  { label: "Comment", value: values.comment ?? "" },
]

const getInitialState = (carId: string, initialDates: RentalDates | null) => {
  const draft = readBookingDraft(carId)

  if (!draft) {
    return { stepIndex: 0, values: { ...EMPTY_VALUES, dates: initialDates ?? undefined } }
  }

  return {
    stepIndex: Math.min(draft.stepIndex, LAST_STEP_INDEX),
    values: { ...draft.values, dates: initialDates ?? draft.values.dates },
  }
}

const subscribeToNothing = () => () => {}

export const BookingFlow = (props: BookingFlowProps) => {
  const isClient = useSyncExternalStore(subscribeToNothing, () => true, () => false)

  return isClient ? <BookingForm {...props} /> : <BookingSkeleton />
}

const BookingForm = ({ car, initialDates, carHref }: BookingFlowProps) => {
  const router = useRouter()
  const [initialState] = useState(() => getInitialState(car.id, initialDates))
  const [stepIndex, setStepIndex] = useState(initialState.stepIndex)
  const [rent, setRent] = useState<BookedRent | null>(null)
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: initialState.values,
  })
  const values = useWatch({ control: form.control })

  useEffect(() => {
    saveBookingDraft(car.id, stepIndex, form.getValues())

    return form.subscribe({
      formState: { values: true },
      callback: (state) => saveBookingDraft(car.id, stepIndex, state.values),
    })
  }, [car.id, form, stepIndex])

  if (rent) {
    return <SuccessView rent={rent} />
  }

  const { errors, isSubmitting } = form.formState
  const isLastStep = stepIndex === LAST_STEP_INDEX
  const dates = toRentalDates(values.dates)
  const days = dates ? getRentalDays(dates) : 0
  const carRows = getCarRows(car.name, dates, values)
  const customerRows = getCustomerRows(values)

  const handleBack = () => (stepIndex === 0 ? router.push(carHref) : setStepIndex(stepIndex - 1))

  const submitRent = async (bookingValues: BookingValues) => {
    try {
      const response = await createCarRent(car.id, bookingValues)

      if (response.success) {
        clearBookingDraft(car.id)
        setRent(response.rent)
      } else {
        form.setError("root.server", { type: "server", message: response.reason ?? DEFAULT_ERROR })
      }
    } catch (error) {
      if (!(error instanceof ClientError)) {
        throw error
      }

      form.setError("root.server", { type: "server", message: DEFAULT_ERROR })
    }
  }

  const goToNextStep = async () => {
    const isStepValid = await form.trigger(STEP_FIELDS[stepIndex], { shouldFocus: true })

    if (isStepValid) {
      setStepIndex(stepIndex + 1)
    }
  }

  const showFirstInvalidStep = (fieldErrors: FieldErrors<BookingValues>) => {
    const invalidStepIndex = STEP_FIELDS.findIndex((fields) => fields.some((field) => field in fieldErrors))

    if (invalidStepIndex !== -1) {
      setStepIndex(invalidStepIndex)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (isLastStep) {
      void form.handleSubmit(submitRent, showFirstInvalidStep)(event)

      return
    }

    event.preventDefault()
    void goToNextStep()
  }

  return (
    <BookingShell
      titles={STEP_TITLES}
      stepIndex={stepIndex}
      isWide={isLastStep}
      aside={isLastStep ? null : <BookingSummary rows={stepIndex === 0 ? carRows : [...carRows, ...customerRows]} />}
      onBack={handleBack}
      onStepSelect={setStepIndex}
    >
      <FormProvider {...form}>
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
          {stepIndex === 0 ? <RentalStep /> : null}

          {stepIndex === 1 ? <CustomerStep /> : null}

          {isLastStep ? (
            <ReviewStep
              carRows={carRows}
              customerRows={customerRows}
              daysLabel={`Rental for ${formatDays(days)}`}
              total={car.price * days}
              onEdit={setStepIndex}
            />
          ) : null}

          {errors.root?.server ? (
            <p role="alert" className="text-sm leading-[22px] text-destructive">
              {errors.root.server.message}
            </p>
          ) : null}

          <BookingActions
            submitLabel={isLastStep ? "Confirm" : "Continue"}
            isSubmitDisabled={isSubmitting}
            onBack={handleBack}
          />
        </form>
      </FormProvider>
    </BookingShell>
  )
}
