import { Button } from "@/components/homepage/hero/Button";
import type { HeroCta } from "@/types/cms";

type HeroCtasProps = {
  primary: HeroCta;
  secondary: HeroCta;
};

export function HeroCtas({ primary, secondary }: HeroCtasProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      <Button
        variant="primary"
        href={primary.href}
        openInNewTab={primary.openInNewTab}
        showTrailingArrow={primary.showTrailingArrow ?? true}
        className="w-full sm:w-auto"
      >
        {primary.label}
      </Button>
      <Button
        variant="secondary"
        href={secondary.href}
        openInNewTab={secondary.openInNewTab}
        showTrailingArrow={secondary.showTrailingArrow ?? true}
        className="w-full sm:w-auto"
      >
        {secondary.label}
      </Button>
    </div>
  );
}
