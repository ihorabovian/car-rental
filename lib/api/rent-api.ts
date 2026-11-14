import { parseISO } from "date-fns"

import { gqlClient } from "@/lib/graphql-client"
import { CREATE_CAR_RENT } from "@/lib/graphql/queries/CREATE_CAR_RENT"
import type { BookingDraft } from "@/lib/booking/types"
import type { RentalDates } from "@/lib/cars/types"

export const createCarRent = async (carId: string, dates: RentalDates, draft: BookingDraft) => {
  const response = await gqlClient.request(CREATE_CAR_RENT, {
    input: {
      ...draft,
      carId,
      startDate: parseISO(dates.startDate).getTime(),
      endDate: parseISO(dates.endDate).getTime(),
      // Backend crashes on explicit nulls, so empty optional fields are sent as undefined
      middleName: draft.middleName || undefined,
      comment: draft.comment || undefined,
    },
  })

  return response.createCarRent
}
