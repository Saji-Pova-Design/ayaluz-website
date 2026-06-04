"use client";

import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-[#D9E6DF]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-2 py-2 text-center md:flex-row md:px-6 lg:px-10">
        {/* TEXT */}
        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
          <span className="font-canela text-[18px] tracking-[-0.03em] text-[#111111] md:text-[18px]">
            Sacred Valley Retreats
          </span>

          <span className="hidden text-[#7B746A] md:block">
            •
          </span>

          <p className="text-[14px] text-[#4A453F] md:text-[15px]">
            Limited spaces available for upcoming ceremonies and healing journeys.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/retreats"
          className="group inline-flex items-center gap-2 text-[14px] font-medium text-[#111111] transition-all duration-300 hover:opacity-70 md:text-[15px]"
        >
          <span className="border-b border-transparent transition-all duration-300 group-hover:border-[#111111]">
            Explore Retreats
          </span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}