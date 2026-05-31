"use client";

import { ArrowLeft, X } from "lucide-react";

type EventOverlayHeaderProps = {
  title: string;
  onBack?: () => void;
  onClose: () => void;
};

export default function EventOverlayHeader({
  title,
  onBack,
  onClose,
}: EventOverlayHeaderProps) {
  return (
<header className="flex h-[40px] items-center justify-between border-b border-[#E7E4DC] bg-[#F7F5F1] px-4">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
            aria-label="Back"
          >
            <ArrowLeft size={22} strokeWidth={2.2} color="#111111" />
          </button>
        )}

<h2 className="text-left text-[16px] font-normal leading-none tracking-[-0.02em] text-[#111111]">
          {title}
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
        aria-label="Close"
      >
        <X size={24} strokeWidth={2.2} color="#111111" />
      </button>
    </header>
  );
}