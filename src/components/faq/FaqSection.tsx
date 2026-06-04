'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import FAQAccordionItem, { type FAQItem } from './FaqAccordionItem'
import FAQTabs from './FaqTabs'

type FAQCategory = {
  _key?: string
  id?: string
  label?: string
  questions?: FAQItem[]
}

export type FAQSectionData = {
  eyebrow?: string
  title?: string
  subtitle?: string
  categories?: FAQCategory[]
}

type FAQSectionProps = {
  data?: FAQSectionData | null
}

export default function FAQSection({ data }: FAQSectionProps) {
  const categories = useMemo(() => {
    return (data?.categories || []).filter(
      (category) => category?.label && category?.questions && category.questions.length > 0
    )
  }, [data?.categories])

  const firstTabId = categories[0]?.id || categories[0]?._key || 'faq-tab-0'

  const [activeTab, setActiveTab] = useState(firstTabId)
  const [openItem, setOpenItem] = useState<string | null>(null)

  useEffect(() => {
    setActiveTab(firstTabId)
    setOpenItem(null)
  }, [firstTabId])

  const currentCategory = categories.find((category, index) => {
    const tabId = category.id || category._key || `faq-tab-${index}`
    return tabId === activeTab
  })

  if (!categories.length) return null

  return (
    <section className="w-full bg-primary-bg py-20 lg:py-28 xl:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.32, 0.72, 0.36, 1],
          }}
          className="mb-14 text-center lg:mb-20"
        >
          {data?.eyebrow && (
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.28em] text-[#8A5A44]">
              {data.eyebrow}
            </p>
          )}

          <h2 className="font-canela text-3xl leading-[1] tracking-[-0.04em] text-primary-green md:text-5xl">
            {data?.title || 'Frequently Asked Questions'}
          </h2>

          {data?.subtitle && (
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-[#444444] md:text-lg">
              {data.subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 lg:mb-14"
        >
          <FAQTabs
            categories={categories}
            activeTab={activeTab}
            onTabChange={(tabId) => {
              setActiveTab(tabId)
              setOpenItem(null)
            }}
          />
        </motion.div>

        {currentCategory && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {(currentCategory.questions || []).map((item, index) => {
              const itemKey = item._key || `${activeTab}-${index}`
              const isOpen = openItem === itemKey

              return (
                <FAQAccordionItem
                  key={itemKey}
                  item={item}
                  isOpen={isOpen}
                  onToggle={() => setOpenItem(isOpen ? null : itemKey)}
                />
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}