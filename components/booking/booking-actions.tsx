import { Button } from "@/components/ui/button"

const ACTION_CLASS = "h-13 flex-1 rounded-full px-6 text-sm"

type BookingActionsProps = {
  submitLabel: string
  isSubmitDisabled: boolean
  onBack: () => void
}

export const BookingActions = ({ submitLabel, isSubmitDisabled, onBack }: BookingActionsProps) => (
  <div className="flex gap-4">
    <Button type="button" variant="secondary" className={`${ACTION_CLASS} max-lg:hidden`} onClick={onBack}>
      Back
    </Button>
    <Button type="submit" disabled={isSubmitDisabled} className={ACTION_CLASS}>
      {submitLabel}
    </Button>
  </div>
)
