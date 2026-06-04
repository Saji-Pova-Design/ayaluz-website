import Link from "next/link";

type SectionCTAProps = {
  label: string;
  href: string;
};

export default function SectionCTA({
  label,
  href,
}: SectionCTAProps) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-2 text-[18px] text-[#111111] transition-all duration-300 hover:opacity-70"
    >
      <span className="border-b border-transparent transition-all duration-300 group-hover:border-[#111111]">
        {label}
      </span>

      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}