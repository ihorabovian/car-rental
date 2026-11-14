import Link from "next/link"
import { CheckIcon, XIcon } from "lucide-react"

import { SummaryItem } from "@/components/booking/summary-item"
import { Button } from "@/components/ui/button"
import { formatDateRange } from "@/lib/format"
import type { BookedRent } from "@/lib/booking/types"

export const SuccessView = ({ rent }: { rent: BookedRent }) => (
  <div className="flex flex-col gap-6 lg:py-4">
    <Link href="/" aria-label="Close" className="flex h-8 items-center justify-end lg:hidden">
      <XIcon className="size-6" />
    </Link>

    <div className="flex flex-col gap-6 lg:w-[398px]">
      <span className="flex size-14 items-center justify-center rounded-full bg-highlight text-primary-foreground">
        <CheckIcon className="size-8" />
      </span>

      <h1 className="text-2xl leading-8 font-bold tracking-[0.12px]">Car booked</h1>

      <dl className="flex flex-col gap-4">
        <SummaryItem label="Car" value={rent.carInfo.name} />
        <SummaryItem label="Rental dates" value={formatDateRange(new Date(rent.startDate), new Date(rent.endDate))} />
        <SummaryItem label="Pickup location" value={rent.pickupLocation} />
        <SummaryItem label="Return location" value={rent.returnLocation} />
      </dl>

      <Button asChild className="h-13 rounded-full px-6 text-sm">
        <Link href="/">To home</Link>
      </Button>
    </div>
  </div>
)
