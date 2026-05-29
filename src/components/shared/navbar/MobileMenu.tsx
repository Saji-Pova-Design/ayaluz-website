"use client";

import { useEffect, useState } from "react";
import { NavbarLinks } from "@/components/shared/navbar/NavbarLinks";
import type { NavItem } from "@/types/cms";

type MobileMenuProps = {
  items: NavItem[];
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[8px] transition-colors duration-300 hover:bg-secondary-bg"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block h-[1.5px] w-6 bg-primary-green transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-primary-green transition-all duration-300 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-primary-green transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
        />
      </button>

      <div
        id="mobile-nav-panel"
        className={`fixed inset-x-0 top-[var(--header-offset,120px)] z-40 border-t border-border bg-primary-bg transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="px-6 py-8" aria-label="Mobile">
          <NavbarLinks items={items} onNavigate={() => setOpen(false)} />
        </nav>
      </div>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-dark/20"
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
