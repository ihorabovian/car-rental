import { SummaryItem } from "@/components/booking/summary-item"

export type SummaryRow = {
  label: string
  value: string
}

export const BookingSummary = ({ rows }: { rows: SummaryRow[] }) => (
  <aside className="hidden h-fit flex-col gap-4 rounded-3xl bg-secondary p-10 lg:flex lg:w-[482px] lg:shrink-0">
    <h2 className="text-2xl leading-8 font-bold tracking-[0.12px]">Your booking</h2>
    <dl className="flex flex-col gap-4">
      {rows.map((row) => (
        <SummaryItem key={row.label} {...row} />
      ))}
    </dl>
  </aside>
)
