import Link from "next/link"
import { CarFrontIcon, HistoryIcon, UserIcon } from "lucide-react"

const TAB_CLASS = "flex flex-1 cursor-pointer flex-col items-center gap-0.5 rounded-full py-2 text-xs leading-4 tracking-[0.06px]"

export const MobileTabBar = () => (
  <nav
    aria-label="Main"
    className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-[328px] gap-1 rounded-full border border-border-hard bg-background p-1 shadow-[0_0_12px_0_rgba(0,0,0,0.14)] md:hidden"
  >
    <Link href="/" aria-current="page" className={`${TAB_CLASS} bg-highlight font-bold text-primary-foreground`}>
      <CarFrontIcon className="size-6" />
      Rent
    </Link>
    <button type="button" className={`${TAB_CLASS} font-semibold`}>
      <HistoryIcon className="size-6" />
      History
    </button>
    <button type="button" className={`${TAB_CLASS} font-semibold`}>
      <UserIcon className="size-6" />
      Profile
    </button>
  </nav>
)
