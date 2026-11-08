import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

const NotFound = () => (
  <div className="flex flex-col items-center gap-4 py-16 text-center">
    <h1 className="text-2xl leading-8 font-bold">Page not found</h1>
    <p className="text-muted-foreground">This page or car doesn&apos;t exist or has been removed.</p>
    <Link href="/" className={buttonVariants({ className: "h-13 rounded-full px-6" })}>
      Back to cars
    </Link>
  </div>
)

export default NotFound
