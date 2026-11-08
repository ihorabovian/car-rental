import { CAR_GRID_CLASS } from "@/components/cars/car-card"
import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_CARD_COUNT = 8

const CatalogLoading = () => (
  <div className="flex flex-col gap-6 md:gap-10 md:py-4">
    <h1 className="flex h-14 items-center text-2xl leading-8 font-bold tracking-[0.12px] md:sr-only">Rent a car</h1>

    <Skeleton className="h-13 w-full rounded-full" />

    <div className={CAR_GRID_CLASS}>
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="h-[126px] rounded-3xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </div>
)

export default CatalogLoading
