import { parseISO } from "date-fns"

import { gqlClient } from "@/lib/graphql-client"
import { CREATE_CAR_RENT } from "@/lib/graphql/queries/CREATE_CAR_RENT"
import type { BookingValues } from "@/lib/booking/types"

export const createCarRent = async (carId: string, values: BookingValues) => {
  const response = await gqlClient.request(CREATE_CAR_RENT, {
    input: {
      carId,
      startDate: parseISO(values.dates.startDate).getTime(),
      endDate: parseISO(values.dates.endDate).getTime(),
      pickupLocation: values.pickupLocation,
      returnLocation: values.returnLocation,
      lastName: values.lastName,
      firstName: values.firstName,
      birthDate: values.birthDate,
      phone: values.phone,
      email: values.email,
      // Backend crashes on explicit nulls, so empty optional fields are sent as undefined
      middleName: values.middleName || undefined,
      comment: values.comment || undefined,
    },
  })

  return response.createCarRent
}
