import type {
  BodyType,
  Brand,
  Color,
  GetCarQuery,
  GetCarsQuery,
  Steering,
  Transmission,
} from "@/lib/gql/graphql"

export type { BodyType, Brand, Color, Steering, Transmission }

export type CatalogCar = GetCarsQuery["getCars"]["data"][number]

export type CarDetails = GetCarQuery["getCar"]["data"]

export type CarMedia = CatalogCar["media"][number]

export type RentalDates = {
  startDate: string
  endDate: string
}

export type CarsFilter = {
  search: string
  dates: RentalDates | null
  brand: Brand | null
  bodyType: BodyType | null
  steering: Steering | null
  transmission: Transmission | null
  color: Color | null
  minPrice: number | null
  maxPrice: number | null
}

export const BRANDS: Brand[] = [
  "TOYOTA",
  "JEEP",
  "BMW",
  "AUDI",
  "HYUNDAI",
  "VOLKSWAGEN",
  "KIA",
  "MERCEDES",
  "GARDEN_CAR",
  "GROCERY_CART",
  "HAIER",
  "INVALID",
]

export const BODY_TYPES: BodyType[] = ["SEDAN", "SUV", "COUPE", "HATCHBACK", "CABRIOLET"]

export const STEERINGS: Steering[] = ["LEFT", "RIGHT"]

export const TRANSMISSIONS: Transmission[] = ["AUTOMATIC", "MANUAL"]

export const COLORS: Color[] = ["WHITE", "BLACK", "SILVER", "GREY", "RED", "ORANGE", "BLUE", "GREEN"]

export const PRICE_MAX = 100

export const EMPTY_FILTER: CarsFilter = {
  search: "",
  dates: null,
  brand: null,
  bodyType: null,
  steering: null,
  transmission: null,
  color: null,
  minPrice: null,
  maxPrice: null,
}

export const isOneOf = <T extends string>(list: readonly T[], value: string): value is T =>
  list.some((item) => item === value)
