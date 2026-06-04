'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'

export type FAQItem = {
  _key?: string
  question?: string
  answer?: string
  bulletPoints?: string[]
}

type FAQAccordionItemProps = {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}

export default function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: FAQAccordionItemProps) {
  if (!item?.question) return null

  return (
    <>
      <motion.button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left font-sans lg:py-6"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <span className="pr-4 font-serif text-lg text-[#222222] lg:text-xl">
          {item.question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="shrink-0"
        >
          {isOpen ? (
            <X className="h-5 w-5 text-[#2B4A40] lg:h-6 lg:w-6" strokeWidth={2} />
          ) : (
            <Plus className="h-5 w-5 text-[#2B4A40] lg:h-6 lg:w-6" strokeWidth={2} />
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.32, 0.72, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="pb-6 lg:pb-7"
            >
              {item.answer && (
                <p className="mb-4 font-sans text-base leading-relaxed text-[#222222] lg:mb-5 lg:text-lg">
                  {item.answer}
                </p>
              )}

              {item.bulletPoints && item.bulletPoints.length > 0 && (
                <ul className="ml-5 space-y-2 lg:ml-6 lg:space-y-3">
                  {item.bulletPoints.map((point, index) => (
                    <li
                      key={`${item._key || item.question}-bullet-${index}`}
                      className="flex items-start font-sans text-base leading-relaxed text-[#222222] lg:text-lg"
                    >
                      <span className="mt-1 mr-3 shrink-0 text-[#2B4A40] lg:mr-4">
                        •
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="h-px bg-[#D8CEC2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </>
  )
}