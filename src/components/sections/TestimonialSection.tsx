'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Star } from 'lucide-react'

import { urlFor } from '@/sanity/lib/image'

type SanityImage = {
  asset?: {
    _ref?: string
    _id?: string
    url?: string
  }
}

type TestimonialItem = {
  _key?: string
  id?: number
  name?: string
  from?: string
  location?: string
  event?: string
  title?: string
  text?: string
  image?: SanityImage | string
  rating?: number
}

type TestimonialsSectionProps = {
  data?: {
    eyebrow?: string
    title?: string
    testimonials?: TestimonialItem[]
    ctaLabel?: string
    ctaHref?: string
  }
}

function getImageUrl(image?: SanityImage | string) {
  if (!image) return ''

  if (typeof image === 'string') return image

  if (image?.asset?.url) return image.asset.url

  try {
    return urlFor(image).width(900).height(1100).fit('crop').url()
  } catch {
    return ''
  }
}

function TestimonialsCard({ testimonial }: { testimonial: TestimonialItem }) {
  const imageUrl = getImageUrl(testimonial.image)
  const rating = Math.max(1, Math.min(testimonial.rating ?? 5, 5))

  return (
    <div className="grid gap-7 md:grid-cols-[340px_1fr] md:items-center md:gap-12">
      <div className="relative h-[330px] w-full overflow-hidden rounded-[28px] bg-[#2B4A40]/10 md:h-[430px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={testimonial.name || 'Testimonial participant'}
            fill
            sizes="(max-width: 768px) 100vw, 340px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#2B4A40]/10 text-sm text-[#2B4A40]/60">
            No image
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/25 via-transparent to-transparent" />
      </div>

      <div>
        <div className="mb-5 flex gap-1.5">
          {Array.from({ length: rating }).map((_, index) => (
            <Star
              key={index}
              size={20}
              className="fill-[#D4AF37] text-[#D4AF37]"
            />
          ))}
        </div>

        {testimonial.title && (
          <h3 className="font-canela text-[28px] font-medium leading-[1.08] tracking-[-0.04em] text-[#111111] md:text-[42px]">
            {testimonial.title}
          </h3>
        )}

        {testimonial.text && (
          <p className="mt-5 max-w-[620px] text-[16px] italic leading-[1.75] text-[#222222]/75 md:text-[18px]">
            “{testimonial.text}”
          </p>
        )}

        <div className="mt-7 border-t border-[#2B4A40]/20 pt-5">
          {testimonial.name && (
            <p className="text-[17px] font-semibold tracking-[-0.02em] text-[#111111]">
              {testimonial.name}
            </p>
          )}

          {(testimonial.from || testimonial.location) && (
            <p className="mt-1 text-[15px] text-[#222222]/55">
              {testimonial.from || testimonial.location}
            </p>
          )}

          {testimonial.event && (
            <p className="mt-2 text-[15px] font-medium text-[#2B4A40]">
              {testimonial.event}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const testimonials = useMemo(() => {
    return data?.testimonials?.filter(Boolean) || []
  }, [data?.testimonials])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const hasTestimonials = testimonials.length > 0

  const nextSlide = () => {
    if (!hasTestimonials) return

    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    )
  }

  const previousSlide = () => {
    if (!hasTestimonials) return

    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    )
  }

  useEffect(() => {
    if (!hasTestimonials || testimonials.length <= 1 || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      )
    }, 6500)

    return () => clearInterval(interval)
  }, [hasTestimonials, testimonials.length, isHovered])

  useEffect(() => {
    if (currentIndex > testimonials.length - 1) {
      setCurrentIndex(0)
    }
  }, [currentIndex, testimonials.length])

  return (
    <section className="w-full overflow-hidden bg-[#F6F1E8] py-10 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
        <div className="mx-auto mb-12 max-w-[760px] text-center md:mb-18">
          {data?.eyebrow && (
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-[#2B4A40]/75">
              {data.eyebrow}
            </p>
          )}

          <h2 className="font-canela text-[34px] font-medium leading-[1.04] tracking-[-0.05em] text-[#111111] md:text-[56px]">
            {data?.title || 'See what our participants are saying'}
          </h2>
        </div>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mx-auto w-full max-w-[1120px]"
        >
          <div className="relative">
            {testimonials.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous testimonial"
                  className="absolute left-[-28px] top-1/2 z-20 hidden h-[56px] w-[56px] -translate-y-1/2 items-center justify-center rounded-full bg-[#2B4A40] text-[24px] text-white transition duration-300 hover:scale-105 hover:bg-[#243F36] md:flex"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                  className="absolute right-[-28px] top-1/2 z-20 hidden h-[56px] w-[56px] -translate-y-1/2 items-center justify-center rounded-full bg-[#2B4A40] text-[24px] text-white transition duration-300 hover:scale-105 hover:bg-[#243F36] md:flex"
                >
                  →
                </button>
              </>
            )}

            <div className="overflow-hidden rounded-[34px] border border-[#2B4A40]/35 bg-[#F6F1E8] p-4 shadow-[0_24px_80px_rgba(43,74,64,0.08)] md:p-12 lg:p-14">
              {hasTestimonials ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{
                      duration: 0.65,
                      ease: [0.32, 0.72, 0.36, 1],
                    }}
                  >
                    <TestimonialsCard testimonial={testimonials[currentIndex]} />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex min-h-[280px] items-center justify-center text-center">
                  <p className="max-w-[420px] text-[16px] leading-relaxed text-[#222222]/60">
                    Testimonials will appear here once they are added in Sanity.
                  </p>
                </div>
              )}
            </div>

            {testimonials.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-5 md:hidden">
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous testimonial"
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#2B4A40] text-[20px] text-white transition duration-300 active:scale-95"
                >
                  ←
                </button>

                <div className="flex min-w-[72px] items-center justify-center gap-2">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial._key || testimonial.id || index}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? 'w-7 bg-[#2B4A40]'
                          : 'w-2.5 bg-[#2B4A40]/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#2B4A40] text-[20px] text-white transition duration-300 active:scale-95"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {testimonials.length > 1 && (
            <div className="mt-8 hidden items-center justify-center gap-3 md:flex">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial._key || testimonial.id || index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 bg-[#2B4A40]'
                      : 'w-2.5 bg-[#2B4A40]/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {(data?.ctaLabel || data?.ctaHref) && (
          <div className="mt-14 text-center md:mt-16">
            <Link
              href={data?.ctaHref || '/testimonials'}
              className="group inline-flex items-center gap-2 text-[16px] font-medium tracking-[-0.02em] text-[#2B4A40] transition duration-300 hover:opacity-80 md:text-[18px]"
            >
              <span className="border-b border-transparent transition duration-300 group-hover:border-[#2B4A40]">
                {data?.ctaLabel || 'View all testimonials'}
              </span>

              <span className="transition duration-300 group-hover:translate-x-[3px]">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}