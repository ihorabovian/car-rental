import type { CreateCarRentMutation, CreateRentDto } from "@/lib/gql/graphql"

export type BookedRent = CreateCarRentMutation["createCarRent"]["rent"]

export type BookingField = Exclude<keyof CreateRentDto, "carId" | "startDate" | "endDate">

export type BookingDraft = Record<BookingField, string>

export const EMPTY_BOOKING_DRAFT: BookingDraft = {
  pickupLocation: "",
  returnLocation: "",
  lastName: "",
  firstName: "",
  middleName: "",
  birthDate: "",
  phone: "",
  email: "",
  comment: "",
}
