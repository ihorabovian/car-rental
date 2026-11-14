import { Skeleton } from "@/components/ui/skeleton"

const BookingLoading = () => (
  <div className="flex flex-col gap-6 pt-14 lg:flex-row lg:gap-4 lg:pt-4">
    <div className="flex flex-1 flex-col gap-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-64" />
    </div>
    <Skeleton className="hidden h-[344px] rounded-3xl lg:block lg:w-[482px]" />
  </div>
)

export default BookingLoading
