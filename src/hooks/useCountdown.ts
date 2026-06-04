"use client";

import { useCallback, useMemo } from "react";

export type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
};

export function useCountdown(targetDate: Date): CountdownValues {
  const calculate = useCallback((): CountdownValues => {
    const difference = targetDate.getTime() - Date.now();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return {
      days: 0,
      hours: 0,
      minutes: 0,
    };
  }, [targetDate]);

  return useMemo(() => calculate(), [calculate]);
}