import { CAR_GRID_CLASS, CarCard } from "@/components/cars/car-card"
import { CarSearch } from "@/components/cars/car-search"
import { parseCarsFilter } from "@/lib/cars/filter"
import { getCars } from "@/lib/api/cars-api"

const HomePage = async ({ searchParams }: PageProps<"/">) => {
  const filter = parseCarsFilter(await searchParams)
  const cars = await getCars(filter)

  return (
    <div className="flex flex-col gap-6 md:gap-10 md:py-4">
      <h1 className="flex h-14 items-center text-2xl leading-8 font-bold tracking-[0.12px] md:sr-only">Rent a car</h1>

      <CarSearch key={JSON.stringify(filter)} filter={filter} />

      {cars.length > 0 ? (
        <ul className={CAR_GRID_CLASS}>
          {cars.map((car) => (
            <li key={car.id}>
              <CarCard car={car} dates={filter.dates} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-10 text-center text-base text-muted-foreground">No cars match your search.</p>
      )}
    </div>
  )
}

export default HomePage
