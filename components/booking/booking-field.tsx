"use client"

import type { ComponentProps, ReactNode } from "react"
import { Controller, useFormContext, type FieldError as FormFieldError } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { BookingTextFieldName, BookingValues } from "@/lib/booking/types"

export const INPUT_CLASS =
  "h-[42px] rounded-full border-input bg-primary-foreground px-4 text-xl leading-6 tracking-[0.1px] shadow-xs placeholder:text-input md:text-xl"

type BookingFieldProps = {
  id: string
  label: string
  error: FormFieldError | undefined
  children: ReactNode
}

export const BookingField = ({ id, label, error, children }: BookingFieldProps) => (
  <Field data-invalid={error !== undefined} className="gap-1">
    <FieldLabel htmlFor={id} className="text-sm leading-[22px] tracking-[0.07px]">
      {label}
    </FieldLabel>
    {children}
    <FieldError id={`${id}-error`} errors={[error]} />
  </Field>
)

type BookingTextFieldProps = Omit<ComponentProps<typeof Input>, "id" | "name" | "value" | "onChange" | "onBlur"> & {
  name: BookingTextFieldName
  label: string
}

export const BookingTextField = ({ name, label, ...inputProps }: BookingTextFieldProps) => {
  const { control } = useFormContext<BookingValues>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BookingField id={field.name} label={label} error={fieldState.error}>
          <Input
            {...inputProps}
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.invalid ? `${field.name}-error` : undefined}
            className={INPUT_CLASS}
          />
        </BookingField>
      )}
    />
  )
}
