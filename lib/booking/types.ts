import type { z } from "zod"

import type { bookingSchema } from "@/lib/booking/schema"
import type { CreateCarRentMutation } from "@/lib/gql/graphql"

export type BookedRent = CreateCarRentMutation["createCarRent"]["rent"]

export type BookingValues = z.output<typeof bookingSchema>

export type BookingFieldName = keyof BookingValues

export type BookingTextFieldName = Exclude<BookingFieldName, "dates" | "isTermsAccepted">
