import { BookingField, BookingTextField } from "@/components/booking/booking-field"
import { DateRangeField } from "@/components/booking/date-range-field"
import type { BookingDraft, BookingField as BookingFieldName } from "@/lib/booking/types"
import type { RentalDates } from "@/lib/cars/types"

type RentalStepProps = {
  dates: RentalDates | null
  draft: BookingDraft
  onDatesChange: (dates: RentalDates) => void
  onFieldChange: (field: BookingFieldName, value: string) => void
}

export const RentalStep = ({ dates, draft, onDatesChange, onFieldChange }: RentalStepProps) => (
  <div className="flex flex-col gap-4 lg:w-[343px]">
    <BookingField id="rentalDates" label="Rental dates">
      <DateRangeField id="rentalDates" value={dates} onChange={onDatesChange} />
    </BookingField>
    <BookingTextField field="pickupLocation" label="Pickup location" placeholder="Address" required draft={draft} onChange={onFieldChange} />
    <BookingTextField field="returnLocation" label="Return location" placeholder="Address" required draft={draft} onChange={onFieldChange} />
  </div>
)
