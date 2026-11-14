"use client"

import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"

type ErrorPageProps = {
  error: unknown
  retry: () => void
}

const ErrorPage = ({ retry }: ErrorPageProps) => (
  <div className="flex flex-col items-center gap-4 py-16 text-center">
    <h1 className="text-2xl leading-8 font-bold">Something went wrong</h1>
    <p className="text-muted-foreground">We couldn&apos;t load this page. Please try again.</p>
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button type="button" className="h-13 rounded-full px-6" onClick={retry}>
        Try again
      </Button>
      <Link href="/" className={buttonVariants({ variant: "secondary", className: "h-13 rounded-full px-6" })}>
        Back to cars
      </Link>
    </div>
  </div>
)

export default ErrorPage
