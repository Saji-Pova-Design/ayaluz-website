"use client";

import { AnimatePresence, motion } from "framer-motion";

type ShareToastProps = {
  message: string;
  visible: boolean;
};

export function ShareToast({ message, visible }: ShareToastProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="pointer-events-none fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-[#2B4A40] px-5 py-2.5 text-[14px] font-medium tracking-[0.02em] text-[#F6F1E8] shadow-[0_8px_32px_rgba(43,74,64,0.35)]"
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
