'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import type { Testimonial } from './testimonialsData'

interface TestimonialsCardProps {
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
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-80 flex-shrink-0">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-80 object-cover rounded-2xl"
          />
        </div>

        <div className="flex-1">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i: number) => (
              <Star
                key={i}
                size={22}
                className="fill-[#D4AF37] text-[#D4AF37]"
              />
            ))}
          </div>

          <h3 className="text-2xl font-serif mb-4 text-[#222222]">
            {testimonial.title}
          </h3>

          <p className="italic text-[#222222]/80 leading-relaxed mb-6">
            "{testimonial.text}"
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