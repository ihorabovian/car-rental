"use client"

import { Controller, useFormContext } from "react-hook-form"

import { BookingField, BookingTextField } from "@/components/booking/booking-field"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import type { BookingValues } from "@/lib/booking/types"

export const CustomerStep = () => {
  const { control } = useFormContext<BookingValues>()

  return (
    <div className="flex flex-col gap-4 lg:w-[343px]">
      <BookingTextField name="lastName" label="Last name" autoComplete="family-name" placeholder="Smith" required />
      <BookingTextField name="firstName" label="First name" autoComplete="given-name" placeholder="John" required />
      <BookingTextField name="middleName" label="Middle name" autoComplete="additional-name" placeholder="Michael" />
      <BookingTextField name="birthDate" label="Date of birth" type="date" autoComplete="bday" required />
      <BookingTextField name="phone" label="Phone" type="tel" autoComplete="tel" placeholder="+1" required />
      <BookingTextField name="email" label="Email" type="email" autoComplete="email" placeholder="Email" required />
      <Controller
        name="comment"
        control={control}
        render={({ field, fieldState }) => (
          <BookingField id={field.name} label="Comment" error={fieldState.error}>
            <Textarea
              {...field}
              id={field.name}
              placeholder="Enter additional information"
              aria-invalid={fieldState.invalid}
              aria-describedby={fieldState.invalid ? `${field.name}-error` : undefined}
              className="min-h-[74px] rounded-2xl border-input bg-primary-foreground px-4 py-2 text-xl leading-6 tracking-[0.1px] shadow-xs placeholder:text-input md:text-xl"
            />
          </BookingField>
        )}
      />
      <Controller
        name="isTermsAccepted"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <div className="flex items-center gap-2">
              <Checkbox
                id={field.name}
                name={field.name}
                ref={field.ref}
                required
                checked={field.value}
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.invalid ? `${field.name}-error` : undefined}
                onBlur={field.onBlur}
                onCheckedChange={(isChecked) => field.onChange(isChecked === true)}
              />
              <FieldLabel htmlFor={field.name} className="text-base leading-6 font-normal tracking-[0.08px]">
                I accept the terms of the agreement
              </FieldLabel>
            </div>
            <FieldError id={`${field.name}-error`} errors={[fieldState.error]} />
          </Field>
        )}
      />
    </div>
  )
}
