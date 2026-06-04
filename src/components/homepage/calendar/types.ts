import type {
  SingleDayCeremonyEvent,
  RetreatCeremonyEvent,
} from "@/types/ceremony-event";

export type SingleDayEvent =
  SingleDayCeremonyEvent;

export type RetreatEvent =
  RetreatCeremonyEvent;

export type CalendarEvent =
  | SingleDayEvent
  | RetreatEvent;

export type CalendarMonth = {
  id: string;

  month: string;

  year: number;

  events: CalendarEvent[];
};