import { isBefore, parseISO, startOfToday } from "date-fns"
import { z } from "zod"

import type { BookingValues } from "@/lib/booking/types"

const DRAFT_VERSION = 1

const text = z.string().catch("")

const draftSchema = z.object({
  stepIndex: z.number().int().nonnegative().catch(0),
  values: z.object({
    dates: z.object({ startDate: z.iso.date(), endDate: z.iso.date() }).optional().catch(undefined),
    pickupLocation: text,
    returnLocation: text,
    lastName: text,
    firstName: text,
    middleName: text,
    birthDate: text,
    phone: text,
    email: text,
    comment: text,
    isTermsAccepted: z.boolean().catch(false),
  }),
})

export type BookingDraft = z.output<typeof draftSchema>

const getDraftKey = (carId: string) => `booking-draft:v${DRAFT_VERSION}:${carId}`

const parseDraft = (raw: string) => {
  try {
    return draftSchema.safeParse(JSON.parse(raw))
  } catch {
    return null
  }
}

export const readBookingDraft = (carId: string): BookingDraft | null => {
  const raw = localStorage.getItem(getDraftKey(carId))

  if (raw === null) {
    return null
  }

  const result = parseDraft(raw)

  if (!result?.success) {
    return null
  }

  const { dates } = result.data.values
  const isExpired = dates !== undefined && isBefore(parseISO(dates.startDate), startOfToday())

  return isExpired ? { ...result.data, values: { ...result.data.values, dates: undefined } } : result.data
}

export const saveBookingDraft = (carId: string, stepIndex: number, values: BookingValues) =>
  localStorage.setItem(getDraftKey(carId), JSON.stringify({ stepIndex, values }))

export const clearBookingDraft = (carId: string) => localStorage.removeItem(getDraftKey(carId))
