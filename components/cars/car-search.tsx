"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { addDays, parseISO, startOfToday } from "date-fns"
import { ListFilterIcon, SearchIcon } from "lucide-react"

import { CarFiltersSheet } from "@/components/cars/car-filters-sheet"
import { DateField } from "@/components/cars/date-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetDrawerFilters, toSearchParams } from "@/lib/cars/filter"
import { toIsoDate } from "@/lib/format"
import type { CarsFilter } from "@/lib/cars/types"

type DateDraft = {
  startDate: string | null
  endDate: string | null
}

const FILTER_BUTTON_CLASS = "rounded-full [&_svg:not([class*='size-'])]:size-5"

const toDateDraft = (filter: CarsFilter): DateDraft => ({
  startDate: filter.dates?.startDate ?? null,
  endDate: filter.dates?.endDate ?? null,
})

const toRentalDates = (draft: DateDraft) =>
  draft.startDate && draft.endDate && draft.endDate > draft.startDate
    ? { startDate: draft.startDate, endDate: draft.endDate }
    : null

export const CarSearch = ({ filter }: { filter: CarsFilter }) => {
  const router = useRouter()
  const [draft, setDraft] = useState(filter)
  const [dateDraft, setDateDraft] = useState(() => toDateDraft(filter))
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const today = startOfToday()
  const minEndDate = dateDraft.startDate ? addDays(parseISO(dateDraft.startDate), 1) : addDays(today, 1)

  const applyFilter = (next: CarsFilter) => {
    const query = toSearchParams({ ...next, dates: toRentalDates(dateDraft) }).toString()

    router.push(query ? `/?${query}` : "/")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    applyFilter(draft)
  }

  const handleStartDateChange = (startDate: string) =>
    setDateDraft((current) => ({
      startDate,
      endDate: current.endDate && current.endDate > startDate ? current.endDate : toIsoDate(addDays(parseISO(startDate), 1)),
    }))

  const handleFiltersApply = () => {
    setIsFiltersOpen(false)
    applyFilter(draft)
  }

  const openFilters = () => setIsFiltersOpen(true)

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
        <div className="order-2 flex flex-col gap-4 md:order-1 md:flex-1 md:flex-row">
          <DateField label="Rental start" value={dateDraft.startDate} minDate={today} onChange={handleStartDateChange} />
          <DateField
            label="Rental end"
            value={dateDraft.endDate}
            minDate={minEndDate}
            onChange={(endDate) => setDateDraft((current) => ({ ...current, endDate }))}
          />
        </div>

        <div className="order-1 flex items-end gap-2 md:order-2 md:w-80">
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-sm leading-[22px] font-medium tracking-[0.07px]">Search</span>
            <span className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                name="search"
                value={draft.search}
                onChange={(event) => setDraft({ ...draft, search: event.target.value })}
                placeholder="Car model"
                className="h-10 rounded-full bg-primary-foreground pr-4 pl-10 text-xl shadow-xs placeholder:text-input md:text-xl"
              />
            </span>
          </label>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Filters"
            className={`size-10 md:hidden ${FILTER_BUTTON_CLASS}`}
            onClick={openFilters}
          >
            <ListFilterIcon />
          </Button>
        </div>

        <div className="order-3 flex items-end gap-4">
          <Button type="submit" className="h-13 flex-1 rounded-full px-6 md:w-40 md:flex-none">
            Find a car
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Filters"
            className={`hidden size-13 md:flex ${FILTER_BUTTON_CLASS}`}
            onClick={openFilters}
          >
            <ListFilterIcon />
          </Button>
        </div>
      </form>

      <CarFiltersSheet
        isOpen={isFiltersOpen}
        filter={draft}
        onOpenChange={setIsFiltersOpen}
        onChange={setDraft}
        onApply={handleFiltersApply}
        onReset={() => setDraft(resetDrawerFilters(draft))}
      />
    </>
  )
}
