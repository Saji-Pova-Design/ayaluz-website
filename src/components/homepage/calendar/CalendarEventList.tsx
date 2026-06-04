import CalendarEventCard from "./CalendarEventCard";

import type { CalendarEvent } from "./types";

type CalendarEventListProps = {
  events: CalendarEvent[];
};

export default function CalendarEventList({
  events,
}: CalendarEventListProps) {
  return (
    <div className="flex flex-col gap-1.5 lg:gap-6">
      {events.map((event) => (
        <CalendarEventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
}