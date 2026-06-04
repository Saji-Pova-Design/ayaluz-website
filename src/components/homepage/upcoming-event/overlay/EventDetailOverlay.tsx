"use client";

import { useState } from "react";

import type { CeremonyEventDetail } from "@/types/ceremony-event";

import EventOverlayHeader from "./EventOverlayHeader";
import EventDetailView from "./EventDetailView";
import EventShareView from "./EventShareView";

type EventDetailOverlayProps = {
  event: CeremonyEventDetail;

  open: boolean;

  onClose: () => void;
};

export default function EventDetailOverlay({
  event,
 open,
  onClose,
}: EventDetailOverlayProps) {
  const [currentView, setCurrentView] =
    useState<"details" | "share">(
      "details",
    );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-[3px]">
      {/* DESKTOP MODAL */}
      <div className="hidden h-full items-center justify-center p-6 md:flex">
        <div className="w-full max-w-[760px] overflow-hidden rounded-[24px] bg-[#F7F5F1] shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
          <EventOverlayHeader
            title={
              currentView === "details"
                ? event.overlayNavTitle
                : "Share this event"
            }
            onClose={() => {
              setCurrentView("details");

              onClose();
            }}
          />

          <div className="max-h-[90vh] overflow-y-auto">
            {currentView ===
            "details" ? (
              <EventDetailView
                event={event}
                onOpenShare={() =>
                  setCurrentView(
                    "share",
                  )
                }
              />
            ) : (
              <EventShareView
                event={event}
              />
            )}
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET */}
      <div className="fixed inset-x-0 bottom-0 md:hidden">
        <div className="h-[92vh] overflow-hidden rounded-t-[32px] bg-[#F7F5F1] shadow-[0_-12px_40px_rgba(0,0,0,0.18)]">
          {/* HANDLE */}
          <div className="flex justify-center pt-3">
            <div className="h-[5px] w-[48px] rounded-full bg-[#CFCFCF]" />
          </div>

          <EventOverlayHeader
            title={
              currentView === "details"
                ? event.overlayNavTitle
                : "Share this event"
            }
            onClose={() => {
              setCurrentView("details");

              onClose();
            }}
          />

          <div className="h-[calc(92vh-72px)] overflow-y-auto">
            {currentView ===
            "details" ? (
              <EventDetailView
                event={event}
                onOpenShare={() =>
                  setCurrentView(
                    "share",
                  )
                }
              />
            ) : (
              <EventShareView
                event={event}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}