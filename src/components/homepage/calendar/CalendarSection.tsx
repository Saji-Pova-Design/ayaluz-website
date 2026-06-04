"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import CalendarHeadline from "./CalendarHeadline";
import CalendarMonthPicker from "./CalendarMonthPicker";
import CalendarEventList from "./CalendarEventList";
import CalendarExpandButton from "./CalendarExpandButton";

import { calendarMonths } from "./data";

type ExpandedMonth = {
  id: string;
  month: string;
  year: number;
};

export default function CalendarSection() {
  /**
   * REAL CURRENT DATE
   */
  const today = new Date();

  /**
   * CURRENT TOP MONTH
   */
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  /**
   * EXPANDED MONTHS
   */
  const [expandedMonths, setExpandedMonths] = useState<
    ExpandedMonth[]
  >([]);

  /**
   * MONTH LABEL
   */
  const currentMonth = useMemo(() => {
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
    });
  }, [currentDate]);

  const currentYear = currentDate.getFullYear();

  /**
   * PREVIOUS DISABLED
   */
  const disablePrevious =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  /**
   * NEXT MONTH
   */
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1,
      ),
    );
  };

  /**
   * PREVIOUS MONTH
   */
  const handlePreviousMonth = () => {
    if (disablePrevious) return;

    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1,
      ),
    );
  };

  /**
   * TEMP EVENTS
   */
  const currentMonthEvents =
  calendarMonths.find((monthData) => {
    return (
      monthData.month === currentMonth &&
      monthData.year === currentYear
    );
  })?.events || [];

  /**
   * EXPAND NEXT MONTH
   */
  const handleExpandMonth = () => {
    const nextIndex = expandedMonths.length + 1;

    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + nextIndex,
      1,
    );

    const nextMonth = nextDate.toLocaleDateString("en-US", {
      month: "long",
    });

    const nextYear = nextDate.getFullYear();

    const id = `${nextMonth}-${nextYear}`;

    const alreadyExists = expandedMonths.some(
      (m) => m.id === id,
    );

    if (alreadyExists) return;

    setExpandedMonths((prev) => [
      ...prev,
      {
        id,
        month: nextMonth,
        year: nextYear,
      },
    ]);
  };

  /**
   * NEXT BUTTON LABEL
   */
  const nextExpandDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + expandedMonths.length + 1,
    1,
  );

  const nextExpandMonth =
    nextExpandDate.toLocaleDateString("en-US", {
      month: "long",
    });

  const nextExpandYear =
    nextExpandDate.getFullYear();

  return (
    <section className="bg-[#F6F1E8] py-14 lg:py-20">
      {/* FULL WIDTH MOBILE/TABLET — LEFT ALIGNED DESKTOP */}
      <div className="w-full px-4 md:px-6 2xl:pl-[200px] 2xl:pr-0 xl:pl-[64px] xl:pr-0 lg:pl-[64px] lg:pr-0">
        {/* CONTENT WRAPPER */}
        <div className="flex w-full flex-col gap-4 lg:max-w-[900px] lg:gap-8">
          <CalendarHeadline
            title="Calendar"
            subtitle="Ceremony & Retreat"
            description="Select an upcoming ceremony or retreat to view the details."
          />

          {/* TOP MONTH PICKER */}
          <CalendarMonthPicker
            month={currentMonth}
            year={currentYear}
            onPrevious={handlePreviousMonth}
            onNext={handleNextMonth}
            disablePrevious={disablePrevious}
          />

          {/* CURRENT MONTH EVENTS */}
          <CalendarEventList
            events={currentMonthEvents}
          />

          {/* EXPANDED MONTHS */}
          <AnimatePresence>
            {expandedMonths.map((monthData) => (
              <motion.div
                key={monthData.id}
                initial={{
                  opacity: 0,
                  y: 30,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  height: 0,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2 lg:gap-3">
                  {/* MONTH HEADER */}
                  <div className="pt-1">
                    <h3 className="font-canela text-[18px] text-[#111111] lg:text-[28px]">
                      {monthData.month}

                      <span className="ml-2 text-[#666666]">
                        {monthData.year}
                      </span>
                    </h3>
                  </div>

                  {/* EVENTS */}
                  <CalendarEventList
                    events={
                      calendarMonths.find(
                        (m) =>
                          m.month === monthData.month &&
                          m.year === monthData.year,
                      )?.events || []
                    }
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* EXPAND BUTTON */}
          <CalendarExpandButton
            label={`Show ${nextExpandMonth} ${nextExpandYear} events ↓`}
            onClick={handleExpandMonth}
          />
        </div>
      </div>
    </section>
  );
}