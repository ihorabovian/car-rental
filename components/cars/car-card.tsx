import Link from "next/link"
import { cn } from "cn"

import { CarImage } from "@/components/cars/car-image"
import { buttonVariants } from "@/components/ui/button"
import { toDatesSearchParams } from "@/lib/cars/filter"
import { formatDays, getCoverUrl, getRentalDays } from "@/lib/cars/format"
import { formatPrice } from "@/lib/format"
import { BODY_TYPE_LABELS, TRANSMISSION_LABELS } from "@/lib/cars/labels"
import type { CatalogCar, RentalDates } from "@/lib/cars/types"

export const CAR_GRID_CLASS = "grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

const CARD_IMAGE_SIZES = "(min-width: 1280px) 270px, (min-width: 640px) 50vw, 100vw"

type CarCardProps = {
  car: CatalogCar
  dates: RentalDates | null
}

const getPeriodPrice = (price: number, dates: RentalDates | null) => {
  if (!dates) {
    return "per day"
  }

  const days = getRentalDays(dates)

  return `${formatPrice(price * days)} for ${formatDays(days)}`
}

export const CarCard = ({ car, dates }: CarCardProps) => {
  const query = toDatesSearchParams(dates).toString()
  const href = query ? `/cars/${car.id}?${query}` : `/cars/${car.id}`

  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <CarImage
        src={getCoverUrl(car.media)}
        alt={car.name}
        sizes={CARD_IMAGE_SIZES}
        className="h-[126px] rounded-3xl border border-transparent transition-shadow group-hover:border-border-hard group-hover:shadow-[3px_3px_0_0_var(--border-hard)]"
      />

      <div className="flex flex-col gap-2 font-medium">
        <div>
          <p className="text-base leading-6 tracking-[0.08px] group-hover:text-highlight">{car.name}</p>
          <p className="text-sm leading-[22px] tracking-[0.07px] text-muted-foreground">
            {TRANSMISSION_LABELS[car.transmission]}, {BODY_TYPE_LABELS[car.bodyType]}
          </p>
        </div>

        <div>
          <p className="text-base leading-6 tracking-[0.08px]">{formatPrice(car.price)}</p>
          <p className="text-sm leading-[22px] tracking-[0.07px] text-muted-foreground">
            {getPeriodPrice(car.price, dates)}
          </p>
        </div>
      </div>

      <span className={cn(buttonVariants({ variant: "secondary" }), "hidden h-13 rounded-full px-6 md:flex")}>
        Details
      </span>
    </Link>
  )
}
