import { BookingField, BookingTextField } from "@/components/booking/booking-field"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { BookingDraft, BookingField as BookingFieldName } from "@/lib/booking/types"

type CustomerStepProps = {
  draft: BookingDraft
  isTermsAccepted: boolean
  onFieldChange: (field: BookingFieldName, value: string) => void
  onTermsChange: (isAccepted: boolean) => void
}

export const CustomerStep = ({ draft, isTermsAccepted, onFieldChange, onTermsChange }: CustomerStepProps) => (
  <div className="flex flex-col gap-4 lg:w-[343px]">
    <BookingTextField field="lastName" label="Last name" autoComplete="family-name" placeholder="Smith" required draft={draft} onChange={onFieldChange} />
    <BookingTextField field="firstName" label="First name" autoComplete="given-name" placeholder="John" required draft={draft} onChange={onFieldChange} />
    <BookingTextField field="middleName" label="Middle name" autoComplete="additional-name" placeholder="Michael" draft={draft} onChange={onFieldChange} />
    <BookingTextField field="birthDate" label="Date of birth" type="date" autoComplete="bday" required draft={draft} onChange={onFieldChange} />
    <BookingTextField field="phone" label="Phone" type="tel" autoComplete="tel" placeholder="+1" required draft={draft} onChange={onFieldChange} />
    <BookingTextField field="email" label="Email" type="email" autoComplete="email" placeholder="Email" required draft={draft} onChange={onFieldChange} />
    <BookingField id="comment" label="Comment">
      <Textarea
        id="comment"
        value={draft.comment}
        placeholder="Enter additional information"
        className="min-h-[74px] rounded-2xl border-input bg-primary-foreground px-4 py-2 text-xl leading-6 tracking-[0.1px] shadow-xs placeholder:text-input md:text-xl"
        onChange={(event) => onFieldChange("comment", event.target.value)}
      />
    </BookingField>
    <div className="flex items-center gap-2">
      <Checkbox id="terms" required checked={isTermsAccepted} onCheckedChange={(isChecked) => onTermsChange(isChecked === true)} />
      <Label htmlFor="terms" className="text-base leading-6 font-normal tracking-[0.08px]">
        I accept the terms of the agreement
      </Label>
    </div>
  </div>
)
