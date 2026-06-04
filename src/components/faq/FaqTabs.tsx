'use client'

import { motion } from 'framer-motion'

export type FAQCategory = {
  _key?: string
  id?: string
  label?: string
}

type FAQTabsProps = {
  categories: FAQCategory[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function FAQTabs({
  categories,
  activeTab,
  onTabChange,
}: FAQTabsProps) {
  const visibleCategories = categories.filter((category) => category?.label)

  if (visibleCategories.length === 0) return null

  return (
    <div className="border-b border-[#D8CEC2]">
      <div className="flex items-center justify-start overflow-x-auto lg:justify-center lg:overflow-visible">
        <div className="mx-auto flex gap-8 px-4 lg:gap-12 lg:px-0">
          {visibleCategories.map((category, index) => {
            const tabId = category.id || category._key || `faq-tab-${index}`
            const isActive = activeTab === tabId

            return (
              <motion.button
                key={tabId}
                onClick={() => onTabChange(tabId)}
                className="relative whitespace-nowrap py-4 font-sans text-base font-normal transition-colors lg:text-lg"
                whileHover={{ color: '#2B4A40' }}
                transition={{ duration: 0.2 }}
              >
                <span className={isActive ? 'text-[#2B4A40]' : 'text-[#8A5A44]'}>
                  {category.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="faq-tabs-underline"
                    className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#2B4A40]"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.32, 0.72, 0.36, 1],
                    }}
                    style={{ originX: 0.5 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}