import Image from "next/image";
import Link from "next/link";
import { BrandEmblem } from "@/components/shared/banner/BrandEmblem";
import { ArrowIcon } from "@/components/shared/banner/ArrowIcon";
import type { PromoBannerContent } from "@/types/cms";

type PromoBannerProps = {
  content: PromoBannerContent;
};

export function PromoBanner({ content }: PromoBannerProps) {
  if (!content.enabled) return null;

  const { label, message, link, icon } = content;

  return (
    <aside
      className="bg-primary-green text-light"
      role="region"
      aria-label="Promotional announcement"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-2.5 px-4 py-2.5 text-center sm:gap-3 sm:px-6 sm:py-3">
        {icon?.src ? (
          <Image
            src={icon.src}
            alt={icon.alt ?? ""}
            width={20}
            height={20}
            className="shrink-0"
          />
        ) : (
          <BrandEmblem size={20} className="shrink-0 opacity-90" />
        )}

        <p className="font-canela text-[12px] leading-snug tracking-[0.03em] sm:text-[13px]">
          <span className="opacity-95">{label}</span>
          <span className="mx-1.5 opacity-60" aria-hidden>
            ·
          </span>
          <span>{message}</span>
          <span className="mx-1.5 hidden opacity-60 sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href={link.href}
            className="mt-1 inline-flex items-center gap-1 underline-offset-2 transition-opacity hover:opacity-80 sm:mt-0"
            target={link.openInNewTab ? "_blank" : undefined}
            rel={link.openInNewTab ? "noopener noreferrer" : undefined}
          >
            <span>{link.label}</span>
            <ArrowIcon className="inline-block" />
          </Link>
        </p>
      </div>
    </aside>
  );
}
