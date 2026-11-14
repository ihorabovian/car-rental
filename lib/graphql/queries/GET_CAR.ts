import { graphql } from "@/lib/gql"

export const GET_CAR = graphql(`
  query GetCar($carId: String!) {
    getCar(carId: $carId) {
      data {
        id
        name
        brand
        price
        location
        color
        bodyType
        steering
        transmission
        media {
          url
          isCover
        }
      }
    }
  }
`)
