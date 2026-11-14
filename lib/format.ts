import { format } from "date-fns"

const LOCALE = "en-CA"
const CURRENCY = "CAD"

const PRICE_FORMAT = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
})

const DATE_FORMAT = new Intl.DateTimeFormat(LOCALE, {
  day: "numeric",
  month: "long",
  year: "numeric",
})

export const formatPrice = (price: number) => PRICE_FORMAT.format(price)

export const formatDate = (date: Date) => DATE_FORMAT.format(date)

export const formatDateRange = (start: Date, end: Date) => DATE_FORMAT.formatRange(start, end)

export const toIsoDate = (date: Date) => format(date, "yyyy-MM-dd")
