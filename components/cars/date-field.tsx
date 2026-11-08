"use client"

import { useState } from "react"
import { parseISO } from "date-fns"
import { CalendarDaysIcon } from "lucide-react"
import { cn } from "cn"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDate, toIsoDate } from "@/lib/format"

type DateFieldProps = {
  label: string
  value: string | null
  minDate: Date
  onChange: (value: string) => void
}

export const DateField = ({ label, value, minDate, onChange }: DateFieldProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedDate = value ? parseISO(value) : undefined

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(toIsoDate(date))
      setIsOpen(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-1">
      <span className="text-sm leading-[22px] font-medium tracking-[0.07px]">{label}</span>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-10 w-full cursor-pointer items-center gap-2 rounded-full border border-input bg-primary-foreground px-4 text-left text-xl leading-6 tracking-[0.1px] shadow-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <CalendarDaysIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className={cn("truncate", selectedDate ? "text-foreground" : "text-input")}>
              {selectedDate ? formatDate(selectedDate) : "Pick a date"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            defaultMonth={selectedDate ?? minDate}
            disabled={{ before: minDate }}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
