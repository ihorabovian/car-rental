import Image from "next/image"
import Link from "next/link"
import { HistoryIcon, LogOutIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import logo from "@/app/icon.png"

const ICON_BUTTON_CLASS = "size-8 rounded-full p-1 [&_svg:not([class*='size-'])]:size-5"

export const SiteHeader = () => (
  <header className="hidden min-h-16 items-center justify-between rounded-full border border-border-hard p-3 shadow-[0_0_12px_0_rgba(0,0,0,0.14)] md:flex">
    <Link href="/" className="flex items-center gap-1">
      <span className="relative h-[22px] w-[30px] overflow-hidden">
        <Image src={logo} alt="" className="absolute top-[-41.18%] left-0 h-[141.18%] w-full max-w-none" sizes="30px" />
      </span>
      <span className="text-base leading-6 font-extrabold uppercase">Leasing</span>
    </Link>

    <div className="flex items-center gap-6">
      <nav aria-label="Account" className="flex items-center gap-4">
        <Button type="button" variant="secondary" size="icon" aria-label="Rental history" className={ICON_BUTTON_CLASS}>
          <HistoryIcon />
        </Button>
        <Button type="button" variant="secondary" size="icon" aria-label="Profile" className={ICON_BUTTON_CLASS}>
          <UserIcon />
        </Button>
      </nav>
      <Button type="button" className="h-10 gap-2 rounded-full px-6 text-sm font-bold tracking-[0.07px]">
        Log out
        <LogOutIcon />
      </Button>
    </div>
  </header>
)
