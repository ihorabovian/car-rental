import { cn } from "cn"

type SummaryItemProps = {
  label: string
  value: string
}

export const SummaryItem = ({ label, value }: SummaryItemProps) => (
  <div className="flex flex-col gap-1">
    <dt className="text-sm leading-[22px] tracking-[0.07px] text-muted-foreground">{label}</dt>
    <dd className={cn("text-lg leading-6 tracking-[0.09px]", !value && "text-muted-foreground")}>{value || "Not specified"}</dd>
  </div>
)
