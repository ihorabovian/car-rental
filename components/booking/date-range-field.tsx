"use client"

import { useState } from "react"
import { differenceInCalendarDays, parseISO, startOfToday } from "date-fns"
import { CalendarDaysIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "cn"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDateRange, toIsoDate } from "@/lib/format"
import type { RentalDates } from "@/lib/cars/types"

type DateRangeFieldProps = {
  id: string
  value: RentalDates | null
  onChange: (dates: RentalDates) => void
}

const toRange = (dates: RentalDates | null): DateRange | undefined =>
  dates ? { from: parseISO(dates.startDate), to: parseISO(dates.endDate) } : undefined

export const DateRangeField = ({ id, value, onChange }: DateRangeFieldProps) => {
  const [range, setRange] = useState(() => toRange(value))

  const today = startOfToday()
  const label = range?.from && range.to ? formatDateRange(range.from, range.to) : null

  const handleSelect = (next: DateRange | undefined) => {
    setRange(next)

    if (next?.from && next.to && differenceInCalendarDays(next.to, next.from) > 0) {
      onChange({ startDate: toIsoDate(next.from), endDate: toIsoDate(next.to) })
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          className="flex h-[42px] w-full cursor-pointer items-center justify-between gap-2 rounded-full border border-input bg-primary-foreground px-4 text-left text-xl leading-6 tracking-[0.1px] shadow-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className={cn("truncate", label ? "text-foreground" : "text-input")}>{label ?? "Pick dates"}</span>
          <CalendarDaysIcon className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          defaultMonth={range?.from ?? today}
          disabled={{ before: today }}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  )
}
