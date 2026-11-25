import { z } from "zod"

const requiredText = (error: string) => z.string().trim().min(1, error)

export const bookingSchema = z.object({
  dates: z.object({ startDate: z.iso.date(), endDate: z.iso.date() }, "Pick rental dates"),
  pickupLocation: requiredText("Enter pickup location"),
  returnLocation: requiredText("Enter return location"),
  lastName: requiredText("Enter your last name"),
  firstName: requiredText("Enter your first name"),
  middleName: z.string().trim(),
  birthDate: z.iso.date("Enter your date of birth"),
  phone: requiredText("Enter your phone number"),
  email: requiredText("Enter your email").pipe(z.email("Enter a valid email")),
  comment: z.string().trim(),
  isTermsAccepted: z.boolean().refine((value) => value, "Accept the terms to continue"),
})
