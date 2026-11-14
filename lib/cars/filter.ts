import { isValid, parseISO } from "date-fns"

import {
  BODY_TYPES,
  BRANDS,
  COLORS,
  EMPTY_FILTER,
  isOneOf,
  PRICE_MAX,
  STEERINGS,
  TRANSMISSIONS,
  type CarsFilter,
  type RentalDates,
} from "@/lib/cars/types"

type SearchParams = Record<string, string | string[] | undefined>

const getParam = (params: SearchParams, key: string) => {
  const value = params[key]

  return typeof value === "string" ? value.trim() : ""
}

const parseOption = <T extends string>(list: readonly T[], value: string) => (isOneOf(list, value) ? value : null)

const parsePrice = (value: string) => {
  const price = Number(value)

  return value !== "" && Number.isFinite(price) && price >= 0 ? price : null
}

const parseDates = (startDate: string, endDate: string): RentalDates | null => {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  const isRangeValid = isValid(start) && isValid(end) && end > start

  return isRangeValid ? { startDate, endDate } : null
}

export const parseCarsFilter = (params: SearchParams): CarsFilter => ({
  search: getParam(params, "search"),
  dates: parseDates(getParam(params, "startDate"), getParam(params, "endDate")),
  brand: parseOption(BRANDS, getParam(params, "brand")),
  bodyType: parseOption(BODY_TYPES, getParam(params, "bodyType")),
  steering: parseOption(STEERINGS, getParam(params, "steering")),
  transmission: parseOption(TRANSMISSIONS, getParam(params, "transmission")),
  color: parseOption(COLORS, getParam(params, "color")),
  minPrice: parsePrice(getParam(params, "minPrice")),
  maxPrice: parsePrice(getParam(params, "maxPrice")),
})

export const toDatesSearchParams = (dates: RentalDates | null) =>
  new URLSearchParams(dates ? { startDate: dates.startDate, endDate: dates.endDate } : {})

export const toSearchParams = (filter: CarsFilter) => {
  const params = toDatesSearchParams(filter.dates)
  const entries: [string, string | number | null][] = [
    ["search", filter.search || null],
    ["brand", filter.brand],
    ["bodyType", filter.bodyType],
    ["steering", filter.steering],
    ["transmission", filter.transmission],
    ["color", filter.color],
    ["minPrice", filter.minPrice === 0 ? null : filter.minPrice],
    ["maxPrice", filter.maxPrice === PRICE_MAX ? null : filter.maxPrice],
  ]

  for (const { 0: key, 1: value } of entries) {
    if (value !== null) {
      params.set(key, String(value))
    }
  }

  return params
}

export const resetDrawerFilters = (filter: CarsFilter): CarsFilter => ({
  ...EMPTY_FILTER,
  search: filter.search,
  dates: filter.dates,
})
