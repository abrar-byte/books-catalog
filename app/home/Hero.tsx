import React, { type FC } from "react"
import SplitText from "@/components/SplitText"
import ImageTrailBase from "@/components/ImageTrail"
import Image from "next/image"

const ImageTrail = ImageTrailBase as FC<{
  items?: string[]
  variant?: number
}>

export default function Hero() {
  return (
    <section className="w-full bg-secondary">
      <div className="wrapper py-20">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="md:w-[40%]">
            <SplitText
              text="Penerbit buku anak nomor 1 di Indonesia"
              className="font-heading text-4xl font-extrabold text-white lg:text-5xl"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              //   onLetterAnimationComplete={handleAnimationComplete}
              //   showCallback
            />
          </div>
          <div className="w-1/2">
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/hero-image.png"
                alt="Hero Image"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="pointer-events-none z-0 object-cover"
                priority
              />
              <ImageTrail
                items={[
                  "https://media.ziyadbooks.net/products/1768457361_696884912b16a.webp",
                  "https://media.ziyadbooks.net/products/1768457330_6968847296819.webp",
                  "https://media.ziyadbooks.net/products/1768457303_69688457b941a.webp",
                  "https://media.ziyadbooks.net/products/1770808387_698c64432fc89.webp",
                  "https://media.ziyadbooks.net/products/1768457318_696884661fc9e.webp",
                  "https://media.ziyadbooks.net/products/1771378648_699517d8cab3b.webp",
                ]}
                variant={3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
