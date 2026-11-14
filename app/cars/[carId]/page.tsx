import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeftIcon } from "lucide-react"

import { CarGallery } from "@/components/cars/car-gallery"
import { Button } from "@/components/ui/button"
import { parseCarsFilter, toDatesSearchParams } from "@/lib/cars/filter"
import { formatDays, formatRentalDates, getMediaUrl, getRentalDays } from "@/lib/cars/format"
import { formatPrice } from "@/lib/format"
import { BODY_TYPE_LABELS, BRAND_LABELS, COLOR_LABELS, STEERING_LABELS, TRANSMISSION_LABELS } from "@/lib/cars/labels"
import { getCar } from "@/lib/api/cars-api"
import type { CarDetails, RentalDates } from "@/lib/cars/types"

const SECTION_TITLE_CLASS = "text-2xl leading-8 font-medium tracking-[0.12px]"

type CarPageProps = PageProps<"/cars/[carId]">

const CarPage = async ({ params, searchParams }: CarPageProps) => {
  const { carId } = await params
  const { dates } = parseCarsFilter(await searchParams)
  const car = await getCar(carId)

  if (!car) {
    notFound()
  }

  const imageUrls = car.media.map((item) => getMediaUrl(item.url))
  const datesQuery = toDatesSearchParams(dates).toString()
  const backHref = datesQuery ? `/?${datesQuery}` : "/"

  return (
    <div className="flex flex-col gap-6 lg:py-4">
      <Link href={backHref} className="flex h-14 items-center gap-4 text-2xl leading-8 font-bold tracking-[0.12px] lg:hidden">
        <ChevronLeftIcon className="size-6" />
        Back to cars
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <section className="flex flex-col gap-2 lg:order-last lg:w-[580px] lg:shrink-0">
          <h1 className="text-2xl leading-8 font-bold tracking-[0.12px]">{car.name}</h1>
          <CarGallery name={car.name} imageUrls={imageUrls} />
        </section>

        <div className="flex flex-1 flex-col gap-6 lg:pl-3">
          <Link
            href={backHref}
            className="hidden h-9 items-center gap-2 px-2 text-sm leading-[21px] font-semibold tracking-[0.07px] lg:flex"
          >
            <ChevronLeftIcon className="size-4" />
            Back
          </Link>

          <CarSpecs car={car} />

          <CarPrice price={car.price} dates={dates} />
        </div>
      </div>
    </div>
  )
}

const CarPrice = ({ price, dates }: { price: number; dates: RentalDates | null }) => {
  const days = dates ? getRentalDays(dates) : 1

  return (
    <section className="flex flex-col gap-4">
      <h2 className={SECTION_TITLE_CLASS}>Price</h2>
      <div className="flex flex-col gap-2 text-base leading-6 font-medium tracking-[0.08px]">
        <p>Rental for {formatDays(days)}</p>
        <p className="text-muted-foreground">{dates ? formatRentalDates(dates) : `${formatPrice(price)} per day`}</p>
      </div>
      <p className="text-[32px] leading-10 font-bold">Total: {formatPrice(price * days)}</p>
      <Button type="button" className="h-13 w-full rounded-full px-6 sm:w-82">
        Book
      </Button>
    </section>
  )
}

const CarSpecs = ({ car }: { car: CarDetails }) => {
  const specs = [
    { label: "Brand", value: BRAND_LABELS[car.brand] },
    { label: "Transmission", value: TRANSMISSION_LABELS[car.transmission] },
    { label: "Steering wheel", value: STEERING_LABELS[car.steering] },
    { label: "Body type", value: BODY_TYPE_LABELS[car.bodyType] },
    { label: "Color", value: COLOR_LABELS[car.color] },
    { label: "Location", value: car.location },
  ]

  return (
    <section className="flex flex-col gap-4">
      <h2 className={SECTION_TITLE_CLASS}>Specifications</h2>
      <dl className="flex flex-col font-medium">
        {specs.map((spec) => (
          <div key={spec.label} className="flex justify-between gap-4 border-b border-border py-4 first:pt-0">
            <dt className="text-base leading-6 tracking-[0.08px] text-muted-foreground">{spec.label}</dt>
            <dd className="text-right text-sm leading-[22px] tracking-[0.07px]">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default CarPage
