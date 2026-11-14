import type { ComponentProps, ReactNode } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { BookingDraft, BookingField as BookingFieldName } from "@/lib/booking/types"

export const INPUT_CLASS =
  "h-[42px] rounded-full border-input bg-primary-foreground px-4 text-xl leading-6 tracking-[0.1px] shadow-xs placeholder:text-input md:text-xl"

type BookingFieldProps = {
  id: string
  label: string
  children: ReactNode
}

export const BookingField = ({ id, label, children }: BookingFieldProps) => (
  <div className="flex flex-col gap-1">
    <Label htmlFor={id} className="text-sm leading-[22px] tracking-[0.07px]">
      {label}
    </Label>
    {children}
  </div>
)

type BookingTextFieldProps = Omit<ComponentProps<typeof Input>, "id" | "value" | "onChange"> & {
  field: BookingFieldName
  label: string
  draft: BookingDraft
  onChange: (field: BookingFieldName, value: string) => void
}

export const BookingTextField = ({ field, label, draft, onChange, ...inputProps }: BookingTextFieldProps) => (
  <BookingField id={field} label={label}>
    <Input
      {...inputProps}
      id={field}
      value={draft[field]}
      className={INPUT_CLASS}
      onChange={(event) => onChange(field, event.target.value)}
    />
  </BookingField>
)
