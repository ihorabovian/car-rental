import { notFound } from "next/navigation"

import { BookingFlow } from "@/components/booking/booking-flow"
import { getCar } from "@/lib/api/cars-api"
import { parseCarsFilter, toDatesSearchParams } from "@/lib/cars/filter"

type BookingPageProps = PageProps<"/cars/[carId]/booking">

const BookingPage = async ({ params, searchParams }: BookingPageProps) => {
  const { carId } = await params
  const { dates } = parseCarsFilter(await searchParams)
  const car = await getCar(carId)

  if (!car) {
    notFound()
  }

  const datesQuery = toDatesSearchParams(dates).toString()
  const carHref = datesQuery ? `/cars/${carId}?${datesQuery}` : `/cars/${carId}`

  return <BookingFlow car={{ id: car.id, name: car.name, price: car.price }} initialDates={dates} carHref={carHref} />
}

export default BookingPage
