import { MobileMenu } from "@/components/shared/navbar/MobileMenu";
import { NavbarLinks } from "@/components/shared/navbar/NavbarLinks";
import { NavbarLogo } from "@/components/shared/navbar/NavbarLogo";
import type { NavbarContent } from "@/types/cms";

type NavbarProps = {
  content: NavbarContent;
};

export function Navbar({ content }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-primary-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10 lg:py-5">
        <NavbarLogo brandName={content.brandName} logo={content.logo} />

        <nav className="hidden lg:block" aria-label="Primary">
          <NavbarLinks items={content.items} />
        </nav>

        <MobileMenu items={content.items} />
      </div>
    </header>
  );
}
