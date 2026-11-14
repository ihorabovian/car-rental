"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { parseISO } from "date-fns"
import { ClientError } from "graphql-request"

import { BookingActions } from "@/components/booking/booking-actions"
import { BookingShell } from "@/components/booking/booking-shell"
import { BookingSummary, type SummaryRow } from "@/components/booking/booking-summary"
import { CustomerStep } from "@/components/booking/customer-step"
import { RentalStep } from "@/components/booking/rental-step"
import { ReviewStep } from "@/components/booking/review-step"
import { SuccessView } from "@/components/booking/success-view"
import { createCarRent } from "@/lib/api/rent-api"
import { EMPTY_BOOKING_DRAFT, type BookedRent, type BookingDraft, type BookingField } from "@/lib/booking/types"
import { formatDays, formatRentalDates, getRentalDays } from "@/lib/cars/format"
import { formatDate } from "@/lib/format"
import type { CarDetails, RentalDates } from "@/lib/cars/types"

type BookingFlowProps = {
  car: Pick<CarDetails, "id" | "name" | "price">
  initialDates: RentalDates | null
  carHref: string
}

const STEP_TITLES = ["Car booking", "Your details", "Review details"]

const LAST_STEP_INDEX = STEP_TITLES.length - 1

const DEFAULT_ERROR = "Could not book the car. Try again later."

const getCarRows = (carName: string, dates: RentalDates | null, draft: BookingDraft): SummaryRow[] => [
  { label: "Car", value: carName },
  { label: "Rental dates", value: dates ? formatRentalDates(dates) : "" },
  { label: "Pickup location", value: draft.pickupLocation },
  { label: "Return location", value: draft.returnLocation },
]

const getCustomerRows = (draft: BookingDraft): SummaryRow[] => [
  { label: "Full name", value: [draft.firstName, draft.middleName, draft.lastName].filter(Boolean).join(" ") },
  { label: "Date of birth", value: draft.birthDate ? formatDate(parseISO(draft.birthDate)) : "" },
  { label: "Phone", value: draft.phone },
  { label: "Email", value: draft.email },
  { label: "Comment", value: draft.comment },
]

export const BookingFlow = ({ car, initialDates, carHref }: BookingFlowProps) => {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)
  const [dates, setDates] = useState(initialDates)
  const [draft, setDraft] = useState(EMPTY_BOOKING_DRAFT)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [rent, setRent] = useState<BookedRent | null>(null)

  if (rent) {
    return <SuccessView rent={rent} />
  }

  const isLastStep = stepIndex === LAST_STEP_INDEX
  const days = dates ? getRentalDays(dates) : 0
  const carRows = getCarRows(car.name, dates, draft)
  const customerRows = getCustomerRows(draft)

  const handleFieldChange = (field: BookingField, value: string) => setDraft((current) => ({ ...current, [field]: value }))

  const handleBack = () => (stepIndex === 0 ? router.push(carHref) : setStepIndex(stepIndex - 1))

  const submitRent = async (rentalDates: RentalDates) => {
    setIsPending(true)
    setErrorMessage(null)

    try {
      const response = await createCarRent(car.id, rentalDates, draft)

      if (response.success) {
        setRent(response.rent)
      } else {
        setErrorMessage(response.reason ?? DEFAULT_ERROR)
      }
    } catch (error) {
      if (!(error instanceof ClientError)) {
        throw error
      }

      setErrorMessage(DEFAULT_ERROR)
    } finally {
      setIsPending(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isLastStep) {
      setStepIndex(stepIndex + 1)

      return
    }

    if (dates) {
      void submitRent(dates)
    }
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {stepIndex === 0 ? (
          <RentalStep dates={dates} draft={draft} onDatesChange={setDates} onFieldChange={handleFieldChange} />
        ) : null}

        {stepIndex === 1 ? (
          <CustomerStep
            draft={draft}
            isTermsAccepted={isTermsAccepted}
            onFieldChange={handleFieldChange}
            onTermsChange={setIsTermsAccepted}
          />
        ) : null}

        {isLastStep ? (
          <ReviewStep
            carRows={carRows}
            customerRows={customerRows}
            daysLabel={`Rental for ${formatDays(days)}`}
            total={car.price * days}
            onEdit={setStepIndex}
          />
        ) : null}

        {errorMessage ? (
          <p role="alert" className="text-sm leading-[22px] text-destructive">
            {errorMessage}
          </p>
        ) : null}

        <BookingActions
          submitLabel={isLastStep ? "Confirm" : "Continue"}
          isSubmitDisabled={isPending || (stepIndex === 0 && !dates)}
          onBack={handleBack}
        />
      </form>
    </BookingShell>
  )
}
