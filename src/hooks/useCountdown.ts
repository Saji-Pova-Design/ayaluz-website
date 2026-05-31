"use client";

import { useCallback, useEffect, useState } from "react";

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

    return { days: 0, hours: 0, minutes: 0 };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [calculate]);

  return ready ? timeLeft : { days: 0, hours: 0, minutes: 0 };
}
