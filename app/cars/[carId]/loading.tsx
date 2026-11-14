import { Skeleton } from "@/components/ui/skeleton"

const CarLoading = () => (
  <div className="flex flex-col gap-6 pt-14 lg:flex-row lg:gap-10 lg:pt-4">
    <div className="flex flex-col gap-2 lg:order-last lg:w-[580px]">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-[126px] rounded-3xl sm:h-[247px]" />
    </div>
    <div className="flex flex-1 flex-col gap-4">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-64" />
    </div>
  </div>
)

export default CarLoading
