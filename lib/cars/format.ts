import { differenceInCalendarDays, parseISO } from "date-fns"

import { formatDateRange } from "@/lib/format"
import type { CarMedia, RentalDates } from "@/lib/cars/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ""

export const getMediaUrl = (path: string) => `${API_URL}${path}`

export const getCoverUrl = (media: CarMedia[]) => {
  const cover = media.find((item) => item.isCover) ?? media.at(0)

  return cover ? getMediaUrl(cover.url) : null
}

export const getRentalDays = (dates: RentalDates) =>
  differenceInCalendarDays(parseISO(dates.endDate), parseISO(dates.startDate))

export const formatDays = (days: number) => (days === 1 ? "1 day" : `${days} days`)

export const formatRentalDates = (dates: RentalDates) =>
  formatDateRange(parseISO(dates.startDate), parseISO(dates.endDate))
