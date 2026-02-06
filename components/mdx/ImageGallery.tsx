'use client'

import { ReactNode } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  children: ReactNode
  caption?: string
}

export function ImageGallery({ children, caption }: ImageGalleryProps) {
  return (
    <figure className="my-6 not-prose">
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

interface GalleryImageProps {
  src: string
  alt?: string
}

export function GalleryImage({ src, alt }: GalleryImageProps) {
  return (
    <Image
      src={src}
      alt={alt || ''}
      className="h-64 w-auto shrink-0 snap-center border border-foreground/10 object-cover"
    />
  )
}
