// Loads this site's upcoming events from the TOP events Lambda.
//
// The Lambda works out which client's events to return from the page's
// Origin, so there is no domain to pass here. It returns only public fields,
// soonest first. For local development, the dev server's origin (e.g.
// http://localhost:5173) must be approved in the Lambda's ORIGIN_DOMAINS.

import { useEffect, useState } from "react";

const EVENTS_URL = "https://64mxhwtkrfbb6u6e6f54lw7lca0yiwmp.lambda-url.us-east-1.on.aws/";

// Shown when an event has no time zone of its own.
const DEFAULT_TIME_ZONE = "America/New_York";

export interface TopEvent {
  id: string;
  title: string;
  description: string;
  /** Start time, ISO 8601 in UTC. Display it in `timeZone`. */
  dateTime: string;
  /** End time, ISO 8601 in UTC, or null when the event has no end time. */
  endDateTime: string | null;
  timeZone: string | null;
  location: string;
  /** 0 for free events. */
  price: number;
  imageUrls: string[];
  /** null when the event has no capacity limit. */
  capacity: number | null;
  spotsLeft: number | null;
}

interface EventsPage {
  events: TopEvent[];
  page: number;
  size: number;
  totalPages: number;
  totalEvents: number;
  last: boolean;
}

export async function fetchUpcomingEvents(size = 20, signal?: AbortSignal): Promise<TopEvent[]> {
  const res = await fetch(`${EVENTS_URL}?size=${size}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Events request failed (${res.status})`);
  }
  const data: EventsPage = await res.json();
  return data.events ?? [];
}

/** Upcoming events for this site. Fetches when the calling component mounts. */
export function useUpcomingEvents(size = 20) {
  const [events, setEvents] = useState<TopEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchUpcomingEvents(size, controller.signal)
      .then(setEvents)
      .catch((err) => {
        if (err?.name === "AbortError") return;
        console.error("Failed to load events:", err);
        setError("We couldn't load our upcoming events right now. Please try again shortly.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [size]);

  return { events, loading, error };
}

/**
 * Date and time parts of an event, in the event's own time zone. `time` is
 * the start ("12:00 PM"), or the range when there's an end time
 * ("12:00 PM - 4:00 PM", or "6:00 PM - Dec 13, 1:00 AM" across midnight).
 */
export function eventDateParts(event: TopEvent) {
  const timeZone = event.timeZone || DEFAULT_TIME_ZONE;
  const format = (iso: string, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { timeZone, ...options }).format(new Date(iso));
  const clock: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" };

  const startTime = format(event.dateTime, clock);
  let time = startTime;
  if (event.endDateTime) {
    const sameDay =
      format(event.dateTime, { dateStyle: "short" }) === format(event.endDateTime, { dateStyle: "short" });
    const endTime = sameDay
      ? format(event.endDateTime, clock)
      : format(event.endDateTime, { month: "short", day: "numeric", ...clock });
    time = `${startTime} - ${endTime}`;
  }

  return {
    month: format(event.dateTime, { month: "long" }), // "October"
    day: format(event.dateTime, { day: "numeric" }), // "31"
    weekday: format(event.dateTime, { weekday: "long" }), // "Saturday"
    time,
  };
}

/** "$10.00", or "" for free events. */
export function formatEventPrice(event: TopEvent) {
  return event.price > 0
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(event.price)
    : "";
}
