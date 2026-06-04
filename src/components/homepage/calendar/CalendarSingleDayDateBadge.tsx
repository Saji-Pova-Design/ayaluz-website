type CalendarDateBadgeProps = {
  day: string;
  month: string;
  weekday: string;
};

export default function CalendarDateBadge({
  day,
  month,
  weekday,
}: CalendarDateBadgeProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        md:gap-5
      "
    >
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          border
          border-[#28543B]
          bg-transparent
          md:h-20
          md:w-20
          lg:h-24
          lg:w-24
          lg:rounded-[26px]
        "
      >
        <span
          className="
            text-3xl
            font-bold
            leading-none
            tracking-[-0.04em]
            text-[#111111]
            md:text-5xl
            lg:text-6xl
          "
        >
          {day}
        </span>
      </div>

      <div
        className="
          flex
          flex-col
          justify-center
        "
      >
        <span
          className="
            text-2xl
            font-bold
            leading-none
            tracking-[-0.04em]
            text-[#111111]
            md:text-4xl
            lg:text-5xl
          "
        >
          {month}
        </span>

        <span
          className="
            mt-2
            text-xl
            font-normal
            leading-none
            tracking-[-0.03em]
            text-[#111111]
            md:text-2xl
            lg:text-3xl
          "
        >
          {weekday}
        </span>
      </div>
    </div>
  );
}