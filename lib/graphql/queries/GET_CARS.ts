import { graphql } from "@/lib/gql"

export const GET_CARS = graphql(`
  query GetCars(
    $search: String
    $brand: [Brand!]
    $bodyType: [BodyType!]
    $steering: [Steering!]
    $transmission: [Transmission!]
    $color: [Color!]
    $minPrice: Float
    $maxPrice: Float
    $startDate: Float
    $endDate: Float
    $limit: Float
  ) {
    getCars(
      search: $search
      brand: $brand
      bodyType: $bodyType
      steering: $steering
      transmission: $transmission
      color: $color
      minPrice: $minPrice
      maxPrice: $maxPrice
      startDate: $startDate
      endDate: $endDate
      limit: $limit
    ) {
      data {
        id
        name
        price
        transmission
        bodyType
        media {
          url
          isCover
        }
      }
    }
  }
`)
