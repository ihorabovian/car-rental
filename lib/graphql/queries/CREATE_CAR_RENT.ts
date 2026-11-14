import { graphql } from "@/lib/gql"

export const CREATE_CAR_RENT = graphql(`
  mutation CreateCarRent($input: CreateRentDto!) {
    createCarRent(input: $input) {
      success
      reason
      rent {
        _id
        startDate
        endDate
        pickupLocation
        returnLocation
        carInfo {
          name
        }
      }
    }
  }
`)
