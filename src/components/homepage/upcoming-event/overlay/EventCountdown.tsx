"use client";

import { useCountdown } from "@/hooks/useCountdown";

type EventCountdownProps = {
  targetDate: Date;
};

export default function EventCountdown({
  targetDate,
}: EventCountdownProps) {
  const timeLeft = useCountdown(targetDate);

  const date = new Date(targetDate);

  const day = date.getDate();

  const month = date.toLocaleDateString("en-US", {
    month: "short",
  });

  const weekday = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-5">
        <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[8px] border-[2px] border-[#28543B]">
          <span className="text-[20px] font-semibold leading-none text-[#111111]">
            {day}
          </span>
        </div>

        <div className="flex flex-col leading-[1.1]">
          <span className="text-[18px] font-semibold text-[#111111]">
            {month}
          </span>

          <span className="mt-1 text-[18px] font-normal text-[#111111]">
            {weekday}
          </span>
        </div>
      </div>

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
    </div>
  );
}