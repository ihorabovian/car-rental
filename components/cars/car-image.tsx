import Image from "next/image"
import { cn } from "cn"

type CarImageProps = {
  src: string | null
  alt: string
  sizes: string
  className: string
  isEager?: boolean
}

export const CarImage = ({ src, alt, sizes, className, isEager = false }: CarImageProps) => (
  <div className={cn("relative overflow-hidden bg-placeholder-image", className)}>
    {src ? (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={isEager ? "eager" : "lazy"}
        fetchPriority={isEager ? "high" : "auto"}
        className="object-cover"
      />
    ) : null}
  </div>
)
