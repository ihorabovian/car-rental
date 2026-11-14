"use client"

import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { CarImage } from "@/components/cars/car-image"
import { Button } from "@/components/ui/button"

type CarGalleryProps = {
  name: string
  imageUrls: string[]
}

const ARROW_CLASS = "rounded-full bg-secondary hover:bg-secondary/80 [&_svg:not([class*='size-'])]:size-5"

export const CarGallery = ({ name, imageUrls }: CarGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const imageCount = imageUrls.length
  const hasManyImages = imageCount > 1
  const activeUrl = imageUrls.at(activeIndex) ?? null

  const showPrevious = () => setActiveIndex((index) => (index - 1 + imageCount) % imageCount)
  const showNext = () => setActiveIndex((index) => (index + 1) % imageCount)

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <CarImage
          src={activeUrl}
          alt={name}
          sizes="(min-width: 1024px) 580px, 100vw"
          className="h-[126px] rounded-3xl sm:h-[247px]"
          isEager
        />

        {hasManyImages ? (
          <div className="absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
            <Button size="icon" variant="secondary" className={ARROW_CLASS} onClick={showPrevious} aria-label="Previous photo">
              <ChevronLeftIcon />
            </Button>
            <Button size="icon" variant="secondary" className={ARROW_CLASS} onClick={showNext} aria-label="Next photo">
              <ChevronRightIcon />
            </Button>
          </div>
        ) : null}
      </div>

      {hasManyImages ? (
        <div className="flex gap-2">
          {imageUrls.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-current={index === activeIndex}
              className="flex-1 cursor-pointer rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <CarImage src={url} alt="" sizes="(min-width: 1024px) 190px, 33vw" className="h-16 rounded-2xl sm:h-[92px]" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
