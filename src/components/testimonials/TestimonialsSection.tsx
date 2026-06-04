'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import TestimonialsCard from './TestimonialsCard'
import { testimonials } from './testimonialsData'

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    )
  }

  const previousSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    )
  }

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [currentIndex, isHovered])

  return (
    <section className="w-full bg-[#F6F1E8] py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
        {/* TITLE */}
        <div className="mb-14 text-center md:mb-20">
        <h2
      className="
        font-canela
        font-medium
        text-2xl
        leading-[1.08]
        tracking-[-0.04em]
        text-[#111111]
        md:text-4xl
      "
    >
            See what our participants are saying
          </h2>
        </div>

        {/* WRAPPER */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mx-auto w-full max-w-[1100px]"
        >
          {/* FRAME ROW */}
          <div className="relative">
            {/* LEFT ARROW */}
            <button
              onClick={previousSlide}
              className="
                absolute
                left-[-26px]
                top-1/2
                z-20
                hidden
                h-[56px]
                w-[56px]
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-[#2B4A40]
                text-white
                transition-opacity
                duration-300
                hover:opacity-80
                md:flex
              "
            >
              ←
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={nextSlide}
              className="
                absolute
                right-[-26px]
                top-1/2
                z-20
                hidden
                h-[56px]
                w-[56px]
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-[#2B4A40]
                text-white
                transition-opacity
                duration-300
                hover:opacity-80
                md:flex
              "
            >
              →
            </button>

            {/* CARD */}
            <div className="overflow-hidden rounded-[32px] border border-[#2B4A40] bg-[#F6F1E8] p-6 md:p-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.32, 0.72, 0.36, 1],
                  }}
                >
                  <TestimonialsCard
                    testimonial={testimonials[currentIndex]}
                    isActive={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* MOBILE ARROWS */}
            <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
              <button
                onClick={previousSlide}
                className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#2B4A40] text-white"
              >
                ←
              </button>

              <button
                onClick={nextSlide}
                className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#2B4A40] text-white"
              >
                →
              </button>
            </div>
          </div>

          {/* DOTS */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? 'scale-125 bg-[#2B4A40]'
                    : 'bg-[#2B4A40]/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
<div className="mt-16 text-center">
  <Link
    href="/testimonials"
    className="
      group
      inline-flex
      items-center
      gap-2
      text-[16px]
      md:text-[18px]
      font-medium
      tracking-[-0.02em]
      text-[#2B4A40]
      transition-all
      duration-300
      hover:opacity-80
    "
  >
    <span
      className="
        border-b
        border-transparent
        transition-all
        duration-300
        group-hover:border-[#2B4A40]
      "
    >
      View all testimonials
    </span>

    <span
      className="
        transition-transform
        duration-300
        group-hover:translate-x-[2px]
      "
    >
      →
    </span>
  </Link>
</div>
      </div>
    </section>
  )
}