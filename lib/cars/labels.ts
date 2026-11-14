import type { BodyType, Brand, Color, Steering, Transmission } from "@/lib/cars/types"

export const BRAND_LABELS: Record<Brand, string> = {
  TOYOTA: "Toyota",
  JEEP: "Jeep",
  BMW: "BMW",
  AUDI: "Audi",
  HYUNDAI: "Hyundai",
  VOLKSWAGEN: "Volkswagen",
  KIA: "Kia",
  MERCEDES: "Mercedes-Benz",
  GARDEN_CAR: "Garden car",
  GROCERY_CART: "Grocery cart",
  HAIER: "Haier",
  INVALID: "Wheelchair",
}

export const BODY_TYPE_LABELS: Record<BodyType, string> = {
  SEDAN: "Sedan",
  SUV: "SUV",
  COUPE: "Coupe",
  HATCHBACK: "Hatchback",
  CABRIOLET: "Cabriolet",
}

export const COLOR_LABELS: Record<Color, string> = {
  BLACK: "Black",
  WHITE: "White",
  RED: "Red",
  SILVER: "Silver",
  BLUE: "Blue",
  GREY: "Grey",
  ORANGE: "Orange",
  GREEN: "Green",
}

export const STEERING_LABELS: Record<Steering, string> = {
  LEFT: "Left",
  RIGHT: "Right",
}

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  AUTOMATIC: "Automatic",
  MANUAL: "Manual",
}

export const COLOR_SWATCH_CLASSES: Record<Color, string> = {
  WHITE: "bg-white",
  BLACK: "bg-[#1e1e1e]",
  SILVER: "bg-[#c7c9cc]",
  GREY: "bg-[#7d7f83]",
  RED: "bg-[#ca251c]",
  ORANGE: "bg-[#ee7d1a]",
  BLUE: "bg-[#2f54e9]",
  GREEN: "bg-[#177c44]",
}

export const ANY_COLOR_SWATCH_CLASS =
  "bg-[conic-gradient(from_90deg,#ff0000,#fdae03,#fae904,#0cc015,#1c60b6,#8e1778,#ff0000)]"
