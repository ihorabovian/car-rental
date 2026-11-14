import { SummaryItem } from "@/components/booking/summary-item"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import type { SummaryRow } from "@/components/booking/booking-summary"

type ReviewStepProps = {
  carRows: SummaryRow[]
  customerRows: SummaryRow[]
  daysLabel: string
  total: number
  onEdit: (stepIndex: number) => void
}

const SECTION_TITLE_CLASS = "text-2xl leading-8 font-medium tracking-[0.12px]"

const SummarySection = ({ title, rows }: { title: string; rows: SummaryRow[] }) => (
  <section className="flex flex-1 flex-col gap-4">
    <h3 className={SECTION_TITLE_CLASS}>{title}</h3>
    <dl className="flex flex-col gap-4">
      {rows.map((row) => (
        <SummaryItem key={row.label} {...row} />
      ))}
    </dl>
  </section>
)

export const ReviewStep = ({ carRows, customerRows, daysLabel, total, onEdit }: ReviewStepProps) => (
  <div className="flex flex-col gap-6">
    <h2 className="hidden text-2xl leading-8 font-bold tracking-[0.12px] lg:block">Your order</h2>

    <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
      <SummarySection title="Car details" rows={carRows} />
      <SummarySection title="Customer details" rows={customerRows} />
    </div>

    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <p className="text-sm leading-[22px] tracking-[0.07px]">{daysLabel}</p>
      <p className="text-[32px] leading-10 font-bold">Total: {formatPrice(total)}</p>
    </div>

    <div className="flex flex-col gap-2 lg:flex-row">
      <Button type="button" variant="secondary" className="h-10 flex-1 rounded-full text-sm" onClick={() => onEdit(0)}>
        Edit car details
      </Button>
      <Button type="button" variant="secondary" className="h-10 flex-1 rounded-full text-sm" onClick={() => onEdit(1)}>
        Edit customer details
      </Button>
    </div>
  </div>
)
