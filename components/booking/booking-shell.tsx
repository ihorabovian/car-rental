import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon, HouseIcon } from "lucide-react"

type BookingShellProps = {
  titles: string[]
  stepIndex: number
  isWide?: boolean
  aside?: ReactNode
  children: ReactNode
  onBack: () => void
  onStepSelect: (stepIndex: number) => void
}

export const BookingShell = ({ titles, stepIndex, isWide = false, aside, children, onBack, onStepSelect }: BookingShellProps) => {
  const title = titles[stepIndex]
  const crumbs = titles.slice(0, stepIndex + 1)

  return (
    <div className="flex flex-col gap-6 lg:py-4">
      <button
        type="button"
        className="flex h-14 cursor-pointer items-center gap-4 text-left text-2xl leading-8 font-bold tracking-[0.12px] lg:hidden"
        onClick={onBack}
      >
        <ChevronLeftIcon className="size-6" />
        {title}
      </button>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-4">
        <div className={`flex min-w-0 flex-1 flex-col gap-6 ${isWide ? "lg:max-w-[844px]" : ""}`}>
          <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-sm leading-[22px] tracking-[0.07px] lg:flex">
            <Link href="/" aria-label="Home" className="px-2 text-muted-foreground">
              <HouseIcon className="size-4" />
            </Link>
            {crumbs.map((crumb, index) => (
              <span key={crumb} className="flex items-center gap-2">
                <ChevronRightIcon className="size-4 text-muted-foreground" />
                {index === stepIndex ? (
                  <span aria-current="page" className="font-medium">
                    {crumb}
                  </span>
                ) : (
                  <button type="button" className="cursor-pointer text-muted-foreground" onClick={() => onStepSelect(index)}>
                    {crumb}
                  </button>
                )}
              </span>
            ))}
          </nav>

          <h1 className="hidden text-2xl leading-8 font-bold tracking-[0.12px] lg:block">{title}</h1>

          <div className="flex flex-col gap-2">
            <p className="text-sm leading-[22px] tracking-[0.07px]">
              Step {stepIndex + 1} of {titles.length}
            </p>
            <div
              role="progressbar"
              aria-label="Booking progress"
              aria-valuemin={1}
              aria-valuemax={titles.length}
              aria-valuenow={stepIndex + 1}
              className="h-1 rounded-full bg-border"
            >
              <div className="h-full rounded-full bg-highlight" style={{ width: `${((stepIndex + 1) / titles.length) * 100}%` }} />
            </div>
          </div>

          {children}
        </div>

        {aside}
      </div>
    </div>
  )
}
