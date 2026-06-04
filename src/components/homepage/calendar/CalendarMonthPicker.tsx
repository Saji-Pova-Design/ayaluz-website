"use client";

type CalendarMonthPickerProps = {
  month: string;
  year: number;

  onPrevious: () => void;
  onNext: () => void;

  disablePrevious?: boolean;
};

export default function CalendarMonthPicker({
  month,
  year,
  onPrevious,
  onNext,
  disablePrevious = false,
}: CalendarMonthPickerProps) {
  return (
    <div
      className="
        w-full
        lg:max-w-[900px]
      "
    >
      <div
        className="
          inline-flex
          items-center
          gap-4
          rounded-full
          border
          border-[#2B4A40]/10
          bg-[#FFFAF1]
          px-4
          py-3
          shadow-[0_16px_48px_-30px_rgba(20,25,22,0.34)]
          md:gap-5
          md:px-6
          md:py-4
          lg:gap-6
          lg:px-8
          lg:py-5
        "
      >
        <button
          type="button"
          onClick={onPrevious}
          disabled={disablePrevious}
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#2B4A40]/12
            text-base
            transition-all
            duration-300
            md:h-11
            md:w-11
            md:text-lg
            ${
              disablePrevious
                ? "cursor-default opacity-25"
                : "text-[#2B4A40] hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
            }
          `}
        >
          ←
        </button>

        <div
          className="
            flex
            min-w-[150px]
            items-end
            justify-center
            gap-2
            md:min-w-[190px]
          "
        >
          <h4
            className="
              font-canela
              text-3xl
              leading-none
              tracking-[-0.04em]
              text-[#111111]
              md:text-4xl
              lg:text-5xl
            "
          >
            {month}
          </h4>

          <p
            className="
              pb-1
              text-base
              leading-none
              tracking-[-0.02em]
              text-[#5F5548]
              md:text-lg
            "
          >
            {year}
          </p>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#2B4A40]/12
            text-base
            text-[#2B4A40]
            transition-all
            duration-300
            hover:bg-[#2B4A40]
            hover:text-[#FFFAF1]
            md:h-11
            md:w-11
            md:text-lg
          "
        >
          →
        </button>
      </div>
    </div>
  );
}