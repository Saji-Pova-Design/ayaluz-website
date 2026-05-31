import type { EventShareConfig } from "@/types/event-share";
import { toAbsoluteUrl } from "@/lib/share/get-site-url";
import { getSiteUrl } from "@/lib/share/get-site-url";

export type ShareActionResult =
  | { status: "copied" }
  | { status: "opened" }
  | { status: "shared" }
  | { status: "cancelled" }
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string };

function getShareUrl(config: EventShareConfig): string {
  return toAbsoluteUrl(config.canonicalPath);
}

export async function copyEventLink(
  config: EventShareConfig,
): Promise<ShareActionResult> {
  try {
    await navigator.clipboard.writeText(getShareUrl(config));
    return { status: "copied" };
  } catch {
    return { status: "error", message: "Could not copy link" };
  }
}

export function shareViaWhatsApp(config: EventShareConfig): ShareActionResult {
  const url = encodeURIComponent(getShareUrl(config));
  const text = encodeURIComponent(`${config.title}\n${config.description}\n`);
  window.open(`https://wa.me/?text=${text}${url}`, "_blank", "noopener,noreferrer");
  return { status: "opened" };
}

export function shareViaFacebook(config: EventShareConfig): ShareActionResult {
  const url = encodeURIComponent(getShareUrl(config));
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    "_blank",
    "noopener,noreferrer",
  );
  return { status: "opened" };
}

export function shareViaInstagram(config: EventShareConfig): ShareActionResult {
  const url = getShareUrl(config);

  // Instagram has no reliable web share URL; try opening the app on mobile
  const isMobile =
    typeof navigator !== "undefined" &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = "instagram://app";
    return { status: "opened" };
  }

  return {
    status: "unavailable",
    message:
      "Instagram sharing isn't available here — link copied so you can paste it in your story or DM.",
  };
}

export async function tryNativeShare(
  config: EventShareConfig,
): Promise<ShareActionResult> {
  const url = getShareUrl(config);

  if (typeof navigator === "undefined" || !navigator.share) {
    return { status: "unavailable", message: "Native share not supported" };
  }

  const shareData: ShareData = {
    title: config.title,
    text: config.description,
    url,
  };

  try {
    if (typeof navigator.canShare === "function" && !navigator.canShare(shareData)) {
      await navigator.share({ url });
    } else {
      await navigator.share(shareData);
    }
    return { status: "shared" };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { status: "cancelled" };
    }
    return { status: "error", message: "Share cancelled" };
  }
}

export function getShareDomain(): string {
  try {
    return new URL(getSiteUrl()).hostname.replace(/^www\./, "");
  } catch {
    return "ayaluz.org";
  }
}
