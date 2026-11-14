"use client"

import { Nunito } from "next/font/google"

import { Button } from "@/components/ui/button"

import "./globals.css"

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })

type GlobalErrorProps = {
  error: unknown
  retry: () => void
}

const GlobalError = ({ retry }: GlobalErrorProps) => (
  <html lang="en" className={nunito.variable}>
    <body className="antialiased">
      <title>Something went wrong — Leasing</title>
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl leading-8 font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">The app failed to load. Please try again.</p>
        <Button type="button" className="h-13 rounded-full px-6" onClick={retry}>
          Try again
        </Button>
      </main>
    </body>
  </html>
)

export default GlobalError
