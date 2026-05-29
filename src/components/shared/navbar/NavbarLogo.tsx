import Image from "next/image";
import Link from "next/link";
import { BrandEmblem } from "@/components/shared/banner/BrandEmblem";
import type { NavbarContent } from "@/types/cms";

type NavbarLogoProps = Pick<NavbarContent, "brandName" | "logo">;

export function NavbarLogo({ brandName, logo }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2.5 transition-opacity duration-300 hover:opacity-85"
      aria-label={`${brandName} home`}
    >
      {logo?.src ? (
        <Image
          src={logo.src}
          alt={logo.alt ?? brandName}
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
      ) : (
        <BrandEmblem size={36} />
      )}
      <span className="font-canela text-[17px] tracking-[0.22em] text-dark sm:text-[18px]">
        {brandName}
      </span>
    </Link>
  );
}
