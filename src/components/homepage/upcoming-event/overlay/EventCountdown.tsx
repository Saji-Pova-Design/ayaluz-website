"use client";

import { useCountdown } from "@/hooks/useCountdown";

type EventCountdownProps = {
  targetDate: Date;
};

export default function EventCountdown({
  targetDate,
}: EventCountdownProps) {
  const timeLeft = useCountdown(targetDate);

  return (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center">
        <span className="text-[20px] font-medium leading-none text-[#111111]">
          {String(timeLeft.days).padStart(2, "0")}
        </span>

        <span className="mt-2 text-[12px] text-[#8B8B8B]">
          Days
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-[20px] font-medium leading-none text-[#111111]">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>

        <span className="mt-2 text-[12px] text-[#8B8B8B]">
          hrs
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-[20px] font-medium leading-none text-[#111111]">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>

        <span className="mt-2 text-[12px] text-[#8B8B8B]">
          mins
        </span>
      </div>
    </div>
  );
}