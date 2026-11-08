import type { Metadata } from "next"
import { Nunito } from "next/font/google"

import { MobileTabBar } from "@/components/mobile-tab-bar"
import { SiteHeader } from "@/components/site-header"

import "./globals.css"

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })

export const metadata: Metadata = {
  title: "Leasing — car rental",
  description: "Browse the car catalogue and pick a car to rent.",
}

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html lang="en" className={nunito.variable}>
    <body className="antialiased">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-4 pb-28 md:px-10 md:pb-16 md:pt-16 xl:px-[120px]">
        <SiteHeader />
        <main>{children}</main>
        <MobileTabBar />
      </div>
    </body>
  </html>
)

export default RootLayout
