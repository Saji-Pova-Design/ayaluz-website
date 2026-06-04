"use client";

import { Share2 } from "lucide-react";

type CalendarShareButtonProps = {
  label: string;
};

export default function CalendarShareButton({
  label,
}: CalendarShareButtonProps) {
  return (
    <button className="flex items-center gap-3">
      <Share2
        size={18}
        strokeWidth={2}
        className="text-[#111111]"
      />

      <span className="text-[16px] text-[#111111]">
        {label}
      </span>
    </button>
  );
}