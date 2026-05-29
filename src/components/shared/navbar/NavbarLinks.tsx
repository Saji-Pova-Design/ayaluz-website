import Link from "next/link";
import type { NavItem } from "@/types/cms";

type NavbarLinksProps = {
  items: NavItem[];
  className?: string;
  onNavigate?: () => void;
};

export function NavbarLinks({ items, className = "", onNavigate }: NavbarLinksProps) {
  return (
    <ul className={`flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-7 ${className}`}>
      {items.map((item) => (
        <li key={item._key ?? item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className="font-canela text-[14px] tracking-[0.04em] text-dark/90 transition-colors duration-300 hover:text-primary-green lg:text-[13px] lg:whitespace-nowrap"
            target={item.openInNewTab ? "_blank" : undefined}
            rel={item.openInNewTab ? "noopener noreferrer" : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
