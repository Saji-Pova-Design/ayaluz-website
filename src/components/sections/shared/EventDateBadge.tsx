type EventDateBadgeEvent = {
  eventType?: "single-day" | "retreat";
  singleDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

type DateParts = {
  day: string;
  month: string;
  weekday: string;
  year: string;
};

const LONG_MONTHS = [
  "January",
  "February",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatMonthName(month: string) {
  if (LONG_MONTHS.includes(month)) {
    return month.slice(0, 3);
  }

  return month;
}

function getDateParts(date?: string | null): DateParts | null {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  const month = parsedDate.toLocaleDateString("en-US", {
    month: "long",
  });

  return {
    day: String(parsedDate.getDate()),
    month: formatMonthName(month),
    weekday: parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
    }),
    year: String(parsedDate.getFullYear()),
  };
}

function SingleDayDateBadge({
  date,
}: {
  date?: string | null;
}) {
  const dateParts = getDateParts(date);

  if (!dateParts) return null;

  return (
    <div className="flex items-center gap-2 md:gap-5 p-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#28543B] md:h-16 md:w-16 md:rounded-[16px]">
        <span className="text-2xl font-bold tracking-[-0.05em] md:text-3xl">
          {dateParts.day}
        </span>
      </div>

      <div>
        <div className="text-lg font-bold tracking-[-0.05em] md:text-2xl">
          {dateParts.month}
        </div>

        <div className="mt-0 text-base md:text-lg">
          {dateParts.weekday}
        </div>
      </div>
    </div>
  );
}

function RetreatDateBadge({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) {
  const start = getDateParts(startDate);
  const end = getDateParts(endDate);

  if (!start || !end) return null;

  return (
    <div className="flex items-start gap-1 p-0 md:gap-5">
      {[start, end].map((date, index) => (
        <div
          key={`${date.day}-${date.month}-${date.year}`}
          className="flex items-center gap-1 md:gap-5"
        >
          {index === 1 && (
            <div className="h-px w-5 bg-[#28543B] md:w-8" />
          )}

          <div className="flex items-center gap-2 md:gap-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#28543B] md:h-16 md:w-16 md:rounded-[16px]">
              <span className="text-2xl font-bold tracking-[-0.05em] md:text-3xl">
                {date.day}
              </span>
            </div>

            <div className="leading-none">
              <div className="text-lg font-bold tracking-[-0.05em] md:text-2xl">
                {date.month}
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#7A5F3C] md:text-xs">
                {date.year}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventDateBadge({
  event,
}: {
  event: EventDateBadgeEvent;
}) {
  if (event.eventType === "retreat") {
    return (
      <RetreatDateBadge
        startDate={event.startDate}
        endDate={event.endDate}
      />
    );
  }

  return <SingleDayDateBadge date={event.singleDate} />;
}