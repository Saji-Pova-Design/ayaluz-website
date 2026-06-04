"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

const navItems = [
  {
    label: "About us",
    href: "/about",
  },
  {
    label: "Ceremonies",
    href: "/ceremonies",
  },
  {
    label: "Retreats",
    href: "/retreats",
  },
  {
    label: "Calendar",
    href: "/calendar",
  },
  {
    label: "Healing Journey",
    href: "/healing-journey",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
  },
  {
    label: "Location",
    href: "/location",
  },
  {
    label: "Contact us",
    href: "/contact",
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

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
          {/* LEFT */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-4"
          >
            {/* LOGO */}
            <div className="relative h-[40px] w-[40px] overflow-hidden rounded-[6px]">
              <Image
                src="/images/logo/logo.png"
                alt="AyaLuz Logo"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* BRAND */}
            <span className="font-canela text-[18px] font-bold tracking-[-0.03em] text-[#111111]">
              AYALUZ
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-10 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-canela text-[16px] font-medium tracking-[-0.03em] text-[#111111] transition-opacity duration-300 hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* MOBILE BUTTON */}
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

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[999] bg-[#E7E1D6] transition-all duration-500 xl:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-6">
          {/* TOP */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-4"
            >
              <div className="relative h-[40px] w-[40px] overflow-hidden rounded-[6px]">
                <Image
                  src="/images/logo/logo.png"
                  alt="AyaLuz Logo"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <span className="font-canela text-[18px] font-bold tracking-[-0.03em] text-[#111111]">
                AYALUZ
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

          {/* LINKS */}
          <nav className="mt-16 flex flex-col gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
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