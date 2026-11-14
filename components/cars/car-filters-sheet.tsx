"use client"

import { XIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  ANY_COLOR_SWATCH_CLASS,
  BODY_TYPE_LABELS,
  BRAND_LABELS,
  COLOR_LABELS,
  COLOR_SWATCH_CLASSES,
  STEERING_LABELS,
  TRANSMISSION_LABELS,
} from "@/lib/cars/labels"
import {
  BODY_TYPES,
  BRANDS,
  COLORS,
  isOneOf,
  PRICE_MAX,
  STEERINGS,
  TRANSMISSIONS,
  type CarsFilter,
} from "@/lib/cars/types"

const ANY = "ANY"

const LABEL_CLASS = "text-sm leading-[22px] font-medium tracking-[0.07px]"

const INPUT_CLASS =
  "h-10 rounded-full bg-primary-foreground px-4 text-xl shadow-xs placeholder:text-input md:text-xl"

const SEGMENT_ITEM_CLASS =
  "h-full min-w-0 flex-1 rounded-full! px-3! text-lg font-bold tracking-[0.09px] hover:bg-transparent data-[state=on]:bg-background data-[state=on]:shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"

type CarFiltersSheetProps = {
  isOpen: boolean
  filter: CarsFilter
  onOpenChange: (isOpen: boolean) => void
  onChange: (filter: CarsFilter) => void
  onApply: () => void
  onReset: () => void
}

type OptionSelectProps<T extends string> = {
  label: string
  placeholder: string
  options: readonly T[]
  labels: Record<T, string>
  value: T | null
  onChange: (value: T | null) => void
}

const OptionSelect = <T extends string>({ label, placeholder, options, labels, value, onChange }: OptionSelectProps<T>) => (
  <div className="flex flex-col gap-1">
    <span className={LABEL_CLASS}>{label}</span>
    <Select value={value ?? ""} onValueChange={(next) => onChange(isOneOf(options, next) ? next : null)}>
      <SelectTrigger
        aria-label={label}
        className="w-full rounded-full bg-primary-foreground px-3 text-base data-placeholder:text-input data-[size=default]:h-13 [&_svg:not([class*='size-'])]:size-5"
      >
        <SelectValue placeholder={placeholder}>{value ? labels[value] : null}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ANY}>Any</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {labels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

type SegmentedControlProps<T extends string> = {
  label: string
  anyLabel: string
  options: readonly T[]
  labels: Record<T, string>
  value: T | null
  onChange: (value: T | null) => void
}

const SegmentedControl = <T extends string>({ label, anyLabel, options, labels, value, onChange }: SegmentedControlProps<T>) => (
  <div className="flex flex-col gap-1">
    <span className={LABEL_CLASS}>{label}</span>
    <ToggleGroup
      type="single"
      spacing={0}
      aria-label={label}
      value={value ?? ANY}
      onValueChange={(next) => {
        if (next !== "") {
          onChange(isOneOf(options, next) ? next : null)
        }
      }}
      className="h-[50px] w-full rounded-full bg-muted p-1"
    >
      <ToggleGroupItem value={ANY} className={SEGMENT_ITEM_CLASS}>
        {anyLabel}
      </ToggleGroupItem>
      {options.map((option) => (
        <ToggleGroupItem key={option} value={option} className={SEGMENT_ITEM_CLASS}>
          {labels[option]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  </div>
)

const parsePriceInput = (value: string) => (value === "" ? null : Math.min(Math.max(Number(value), 0), PRICE_MAX))

export const CarFiltersSheet = ({ isOpen, filter, onOpenChange, onChange, onApply, onReset }: CarFiltersSheetProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const update = <K extends keyof CarsFilter>(key: K, value: CarsFilter[K]) => onChange({ ...filter, [key]: value })

  const priceRange = [filter.minPrice ?? 0, filter.maxPrice ?? PRICE_MAX]

  const handlePriceRangeChange = (range: number[]) =>
    onChange({ ...filter, minPrice: range.at(0) ?? null, maxPrice: range.at(1) ?? null })

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side={isDesktop ? "right" : "bottom"}
        showCloseButton={false}
        className={cn(
          "gap-2.5 overflow-y-auto border-0 bg-background",
          isDesktop
            ? "p-6 data-[side=right]:inset-y-3 data-[side=right]:right-3 data-[side=right]:h-auto data-[side=right]:w-[476px] data-[side=right]:max-w-none data-[side=right]:rounded-3xl data-[side=right]:sm:max-w-none"
            : "max-h-[90dvh] rounded-t-2xl px-6 pt-4 pb-4",
        )}
      >
        <div className="flex h-14 shrink-0 items-center gap-2 py-3">
          <SheetTitle className="flex-1 text-2xl leading-8 font-bold tracking-[0.12px]">Filters</SheetTitle>
          <SheetDescription className="sr-only">Narrow down the car catalogue</SheetDescription>
          <SheetClose className="cursor-pointer rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <XIcon className="size-6" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>

        <div className="flex shrink-0 flex-col gap-6 md:flex-1">
          <OptionSelect
            label="Brand"
            placeholder="Select a brand"
            options={BRANDS}
            labels={BRAND_LABELS}
            value={filter.brand}
            onChange={(value) => update("brand", value)}
          />
          <OptionSelect
            label="Body type"
            placeholder="Select a body type"
            options={BODY_TYPES}
            labels={BODY_TYPE_LABELS}
            value={filter.bodyType}
            onChange={(value) => update("bodyType", value)}
          />
          <SegmentedControl
            label="Steering wheel"
            anyLabel="Any"
            options={STEERINGS}
            labels={STEERING_LABELS}
            value={filter.steering}
            onChange={(value) => update("steering", value)}
          />
          <SegmentedControl
            label="Transmission"
            anyLabel="Any"
            options={TRANSMISSIONS}
            labels={TRANSMISSION_LABELS}
            value={filter.transmission}
            onChange={(value) => update("transmission", value)}
          />

          <div className="flex flex-col gap-4">
            <span className="text-lg leading-[26px] tracking-[0.09px]">Price per day</span>
            <div className="flex gap-4">
              <label className="flex flex-1 flex-col gap-1">
                <span className={LABEL_CLASS}>From</span>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={PRICE_MAX}
                  placeholder="$0"
                  value={filter.minPrice ?? ""}
                  onChange={(event) => update("minPrice", parsePriceInput(event.target.value))}
                  className={INPUT_CLASS}
                />
              </label>
              <label className="flex flex-1 flex-col gap-1">
                <span className={LABEL_CLASS}>To</span>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={PRICE_MAX}
                  placeholder={`$${PRICE_MAX}`}
                  value={filter.maxPrice ?? ""}
                  onChange={(event) => update("maxPrice", parsePriceInput(event.target.value))}
                  className={INPUT_CLASS}
                />
              </label>
            </div>
            <Slider
              min={0}
              max={PRICE_MAX}
              step={1}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              aria-label="Price range"
              className="py-1 **:data-[slot=slider-range]:bg-highlight **:data-[slot=slider-thumb]:border-border-hard **:data-[slot=slider-track]:h-1.5 **:data-[slot=slider-track]:bg-secondary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className={LABEL_CLASS}>Color</span>
            <ToggleGroup
              type="single"
              aria-label="Color"
              value={filter.color ?? ANY}
              onValueChange={(next) => {
                if (next !== "") {
                  update("color", isOneOf(COLORS, next) ? next : null)
                }
              }}
              className="w-full justify-between gap-0"
            >
              <ToggleGroupItem
                value={ANY}
                aria-label="Any color"
                className="size-8 min-w-0 rounded-full border-2 border-border p-0 hover:bg-transparent data-[state=on]:border-border-hard data-[state=on]:bg-transparent sm:size-10"
              >
                <span className={cn("block size-full rounded-full border-[3px] border-white", ANY_COLOR_SWATCH_CLASS)} />
              </ToggleGroupItem>
              {COLORS.map((color) => (
                <ToggleGroupItem
                  key={color}
                  value={color}
                  aria-label={COLOR_LABELS[color]}
                  className="size-8 min-w-0 rounded-full border-2 border-border p-0 hover:bg-transparent data-[state=on]:border-border-hard data-[state=on]:bg-transparent sm:size-10"
                >
                  <span className={cn("block size-full rounded-full border-[3px] border-white", COLOR_SWATCH_CLASSES[color])} />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 pt-4 md:flex-row md:gap-4">
          <Button type="button" variant="secondary" className="h-13 rounded-full px-6 md:flex-1" onClick={onReset}>
            Reset filters
          </Button>
          <Button type="button" className="h-13 rounded-full px-6 md:flex-1" onClick={onApply}>
            Find
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
