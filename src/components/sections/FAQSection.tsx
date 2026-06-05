"use client";

import { useMemo, useState } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type PortableTextSpan = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

type PortableTextMarkDef = {
  _key?: string;
  _type?: string;
  href?: string;
  openInNewTab?: boolean;
};

type PortableTextBlock = {
  _key?: string;
  _type: string;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  style?: string;
};

type FAQQuestion = {
  _key?: string;
  question?: string;
  answerRichText?: PortableTextBlock[];
  bulletPoints?: string[];
};

type FAQCategory = {
  _key?: string;
  id?: string;
  label?: string;
  questions?: FAQQuestion[];
};

type Props = {
  data?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    categories?: FAQCategory[];
  };
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[16px] leading-[1.85] tracking-[-0.02em] text-[#444444] md:text-[18px]">
        {children}
      </p>
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const href =
        typeof value?.href === "string" ? value.href : "#";

      const openInNewTab = Boolean(value?.openInNewTab);

      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");

      return (
        <a
          href={href}
          target={openInNewTab || isExternal ? "_blank" : undefined}
          rel={
            openInNewTab || isExternal
              ? "noopener noreferrer"
              : undefined
          }
          className="font-medium text-blue-600 underline decoration-blue-600/35 underline-offset-[4px] transition-colors duration-300 hover:text-blue-700 hover:decoration-blue-700"
        >
          {children}
        </a>
      );
    },

    strong: ({ children }) => (
      <strong className="font-semibold text-[#222222]">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic">
        {children}
      </em>
    ),
  },
};

export default function FAQSection({ data }: Props) {
  const categories = useMemo(() => {
    return (data?.categories || []).filter(
      (category) =>
        category?.label &&
        Array.isArray(category?.questions) &&
        category.questions.length > 0,
    );
  }, [data?.categories]);

  const firstTabId =
    categories[0]?._key ||
    categories[0]?.id ||
    "faq-tab-0";

  const [activeTab, setActiveTab] =
    useState(firstTabId);

  const [openItem, setOpenItem] =
    useState<string | null>(null);

  const currentActiveTab =
    categories.some((category, index) => {
      const tabId =
        category._key ||
        category.id ||
        `faq-tab-${index}`;

      return tabId === activeTab;
    })
      ? activeTab
      : firstTabId;

  const activeCategory = categories.find(
    (category, index) => {
      const tabId =
        category._key ||
        category.id ||
        `faq-tab-${index}`;

      return tabId === currentActiveTab;
    },
  );

  if (!categories.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#F6F1E8] py-20 md:py-28 lg:py-32">
      <div className="pointer-events-none absolute left-[-10%] top-[16%] h-[340px] w-[340px] rounded-full bg-[#B8A071]/20 blur-[90px]" />

      <div className="pointer-events-none absolute bottom-[-12%] right-[-8%] h-[380px] w-[380px] rounded-full bg-[#2B4A40]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-4 md:px-6 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 22,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            ease: [0.32, 0.72, 0.36, 1],
          }}
          className="mx-auto mb-12 max-w-[900px] text-center md:mb-16"
        >
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#2B4A40]/70 md:text-[12px]">
            {data?.eyebrow ||
              "Frequently Asked Questions"}
          </p>

          <h2 className="font-canela text-[40px] font-medium leading-[0.95] tracking-[-0.055em] text-[#111111] md:text-[70px] lg:text-[86px]">
            {data?.title ||
              "Clarity for Your Questions"}
          </h2>

          {data?.subtitle && (
            <p className="mx-auto mt-6 max-w-[680px] text-[16px] leading-[1.8] text-[#222222]/65 md:text-[18px]">
              {data.subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="mb-8 border-b border-[#2B4A40]/15 md:mb-12"
        >
          <div className="flex items-center justify-start overflow-x-auto lg:justify-center lg:overflow-visible">
            <div className="flex min-w-max gap-8 px-1 md:gap-12">
              {categories.map((category, index) => {
                const tabId =
                  category._key ||
                  category.id ||
                  `faq-tab-${index}`;

                const isActive =
                  currentActiveTab === tabId;

                return (
                  <button
                    key={tabId}
                    onClick={() => {
                      setActiveTab(tabId);
                      setOpenItem(null);
                    }}
                    className="relative pb-4 text-[15px] font-medium text-[#8A5A44] transition-colors duration-300 hover:text-[#2B4A40] md:text-[17px]"
                  >
                    <span
                      className={
                        isActive
                          ? "text-[#2B4A40]"
                          : ""
                      }
                    >
                      {category.label}
                    </span>

                    {isActive && (
                      <motion.span
                        layoutId="faq-active-tab-line"
                        className="absolute bottom-[-1px] left-0 h-px w-full bg-[#2B4A40]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {activeCategory && (
          <motion.div
            key={currentActiveTab}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.32, 0.72, 0.36, 1],
            }}
            className="mx-auto max-w-[960px]"
          >
            {(activeCategory.questions || []).map(
              (item, index) => {
                const itemKey =
                  item._key ||
                  `${currentActiveTab}-${index}`;

                const isOpen =
                  openItem === itemKey;

                return (
                  <div
                    key={itemKey}
                    className="border-b border-[#2B4A40]/15"
                  >
                    <button
                      onClick={() =>
                        setOpenItem(
                          isOpen
                            ? null
                            : itemKey,
                        )
                      }
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-opacity duration-300 hover:opacity-70 md:py-7"
                    >
                      <span className="font-sans text-[18px] leading-[1.2] tracking-[-0.03em] text-[#111111] md:text-[24px]">
                        {item.question}
                      </span>

                      <motion.span
                        animate={{
                          rotate: isOpen
                            ? 180
                            : 0,
                        }}
                        className="shrink-0 text-[#2B4A40]"
                      >
                        <ChevronDown
                          size={28}
                          strokeWidth={1.6}
                        />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [
                              0.32,
                              0.72,
                              0.36,
                              1,
                            ],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-[820px] pb-7 pr-8">
                            {Array.isArray(
                              item.answerRichText,
                            ) &&
                              item.answerRichText.length >
                                0 && (
                                <div className="space-y-4">
                                  <PortableText
                                    value={
                                      item.answerRichText
                                    }
                                    components={
                                      portableTextComponents
                                    }
                                  />
                                </div>
                              )}

                            {item.bulletPoints &&
                              item.bulletPoints
                                .length > 0 && (
                                <ul className="mt-5 space-y-3">
                                  {item.bulletPoints.map(
                                    (
                                      point,
                                      pointIndex,
                                    ) => (
                                      <li
                                        key={`${itemKey}-bullet-${pointIndex}`}
                                        className="flex gap-3 text-[16px] leading-[1.75] text-[#444444] md:text-[18px]"
                                      >
                                        <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2B4A40]" />

                                        <span>
                                          {point}
                                        </span>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              },
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}