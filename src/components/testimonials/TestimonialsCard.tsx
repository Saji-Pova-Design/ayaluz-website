'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

import type { Testimonial } from './testimonialsData'

type TestimonialsCardProps = {
  testimonial: Testimonial
  isActive: boolean
}

export default function TestimonialsCard({
  testimonial,
  isActive,
}: TestimonialsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className={isActive ? 'block' : 'hidden'}
    >
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="relative h-80 w-full shrink-0 overflow-hidden rounded-2xl md:w-80">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={22}
                className="fill-[#D4AF37] text-[#D4AF37]"
              />
            ))}
          </div>

          <h3 className="mb-4 font-serif text-2xl text-[#222222]">
            {testimonial.title}
          </h3>

          <p className="mb-6 italic leading-relaxed text-[#222222]/80">
            &ldquo;{testimonial.text}&rdquo;
          </p>

          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-[#222222]/60">{testimonial.from}</p>
            <p className="text-[#2B4A40]">{testimonial.event}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}