"use client";

import type { CeremonyEventDetail } from "@/types/ceremony-event";

import SharePreviewCard from "./SharePreviewCard";
import ShareActionGrid from "./ShareActionGrid";

type EventShareViewProps = {
  event: CeremonyEventDetail;
  onClose: () => void;
};

export default function EventShareView({
  event,
  onClose,
}: EventShareViewProps) {
  return (
    <div className="p-10">
      <SharePreviewCard
        title={event.ceremonyTitle}
        description={event.description}
      />

      <ShareActionGrid onClose={onClose} />
    </div>
  );
}