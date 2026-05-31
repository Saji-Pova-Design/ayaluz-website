import type { EventShareConfig } from "@/types/event-share";
import { toAbsoluteUrl } from "@/lib/share/get-site-url";

export type ShareResult =
  | { status: "shared" }
  | { status: "copied" }
  | { status: "cancelled" }
  | { status: "error"; message: string };

export async function shareEvent(config: EventShareConfig): Promise<ShareResult> {
  const url = toAbsoluteUrl(config.canonicalPath);

  const shareData: ShareData = {
    title: config.title,
    text: config.description,
    url,
  };

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      const canUseFull =
        typeof navigator.canShare !== "function" || navigator.canShare(shareData);

      if (canUseFull) {
        await navigator.share(shareData);
        return { status: "shared" };
      }

      const urlOnly: ShareData = { url };
      const canUseUrl =
        typeof navigator.canShare !== "function" || navigator.canShare(urlOnly);

      if (canUseUrl) {
        await navigator.share(urlOnly);
        return { status: "shared" };
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return { status: "cancelled" };
      }
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    return { status: "copied" };
  } catch {
    return { status: "error", message: "Could not copy link" };
  }
}
