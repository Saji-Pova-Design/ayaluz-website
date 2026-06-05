"use client";

import { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

type NavbarItem = {
  _key?: string;
  label?: string;
  href?: string;
};

type NavbarData = {
  brandName?: string;
  logo?: unknown;
  items?: NavbarItem[];
};

type NavbarProps = {
  data?: NavbarData;
};

const fallbackNavItems: NavbarItem[] = [
  { label: "About us", href: "/about" },
  { label: "Ceremonies", href: "/ceremonies" },
  { label: "Retreats", href: "/retreats" },
  { label: "Calendar", href: "/calendar" },
  { label: "Healing Journey", href: "/healing-journey" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Location", href: "/location" },
  { label: "Contact us", href: "/contact" },
];

export default function Navbar({ data }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const brandName = data?.brandName || "AYALUZ";

  const navItems = useMemo(() => {
    const sanityItems =
      data?.items?.filter(
        (item) => item?.label && item?.href,
      ) || [];

    return sanityItems.length > 0
      ? sanityItems
      : fallbackNavItems;
  }, [data?.items]);

  const logoUrl = data?.logo
    ? urlFor(data.logo).url()
    : "/images/logo/logo.png";

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="relative z-50 h-[56px] w-full border-b border-black/5 bg-[#F6F1E8]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-4"
          >
            <div className="relative h-[40px] w-[40px] overflow-hidden rounded-[6px]">
              <Image
                src={logoUrl}
                alt={`${brandName} Logo`}
                fill
                priority
                className="object-cover"
              />
            </div>

            <span className="font-canela text-[18px] font-bold tracking-[-0.03em] text-[#111111]">
              {brandName}
            </span>
          </Link>

          <nav className="hidden items-center gap-10 xl:flex">
            {navItems.map((item, index) => (
              <Link
                key={
                  item._key ||
                  `${item.label}-${index}`
                }
                href={item.href || "/"}
                className="font-canela text-[16px] font-medium tracking-[-0.03em] text-[#111111] transition-opacity duration-300 hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="flex h-10 w-10 items-center justify-center xl:hidden"
          >
            <div className="flex flex-col gap-[5px]">
              <span className="h-[2px] w-6 rounded-full bg-[#111111]" />
              <span className="h-[2px] w-6 rounded-full bg-[#111111]" />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[999] bg-[#E7E1D6] transition-all duration-500 xl:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-4"
            >
              <div className="relative h-[40px] w-[40px] overflow-hidden rounded-[6px]">
                <Image
                  src={logoUrl}
                  alt={`${brandName} Logo`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <span className="font-canela text-[18px] font-bold tracking-[-0.03em] text-[#111111]">
                {brandName}
              </span>
            </Link>

            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center"
            >
              <span className="text-[32px] leading-none text-[#111111]">
                ×
              </span>
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-8">
            {navItems.map((item, index) => (
              <Link
                key={
                  item._key ||
                  `${item.label}-${index}`
                }
                href={item.href || "/"}
                onClick={closeMenu}
                className="font-canela text-[16px] font-medium tracking-[-0.03em] text-[#111111] transition-opacity duration-300 hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}