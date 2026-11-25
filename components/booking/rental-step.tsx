"use client"

import { Controller, useFormContext } from "react-hook-form"

import { BookingField, BookingTextField } from "@/components/booking/booking-field"
import { DateRangeField } from "@/components/booking/date-range-field"
import type { BookingValues } from "@/lib/booking/types"

export const RentalStep = () => {
  const { control } = useFormContext<BookingValues>()

  return (
    <div className="flex flex-col gap-4 lg:w-[343px]">
      <Controller
        name="dates"
        control={control}
        render={({ field, fieldState }) => (
          <BookingField id="rentalDates" label="Rental dates" error={fieldState.error}>
            <DateRangeField
              id="rentalDates"
              value={field.value ?? null}
              isInvalid={fieldState.invalid}
              onChange={field.onChange}
            />
          </BookingField>
        )}
      />
      <BookingTextField name="pickupLocation" label="Pickup location" placeholder="Address" required />
      <BookingTextField name="returnLocation" label="Return location" placeholder="Address" required />
    </div>
  )
}
