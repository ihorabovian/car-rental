import { cacheLife } from "next/cache"
import { parseISO } from "date-fns"
import { ClientError } from "graphql-request"

import { gqlClient } from "@/lib/graphql-client"
import { GET_CAR } from "@/lib/graphql/queries/GET_CAR"
import { GET_CARS } from "@/lib/graphql/queries/GET_CARS"
import type { CarDetails, CarsFilter, CatalogCar } from "@/lib/cars/types"

const CATALOG_LIMIT = 100

// Backend crashes on explicit nulls, so empty filters are sent as undefined
const toList = <T>(value: T | null) => (value === null ? undefined : [value])
const toOptional = <T>(value: T | null) => (value === null ? undefined : value)

export const getCars = async (filter: CarsFilter): Promise<CatalogCar[]> => {
  "use cache"
  cacheLife("minutes")

  const response = await gqlClient.request(GET_CARS, {
    search: filter.search || undefined,
    brand: toList(filter.brand),
    bodyType: toList(filter.bodyType),
    steering: toList(filter.steering),
    transmission: toList(filter.transmission),
    color: toList(filter.color),
    minPrice: toOptional(filter.minPrice),
    maxPrice: toOptional(filter.maxPrice),
    startDate: filter.dates ? parseISO(filter.dates.startDate).getTime() : undefined,
    endDate: filter.dates ? parseISO(filter.dates.endDate).getTime() : undefined,
    limit: CATALOG_LIMIT,
  })

  return response.getCars.data
}

export const getCar = async (carId: string): Promise<CarDetails | null> => {
  "use cache"
  cacheLife("minutes")

  try {
    const response = await gqlClient.request(GET_CAR, { carId })

    return response.getCar.data
  } catch (error) {
    if (error instanceof ClientError) {
      return null
    }

    throw error
  }
}
