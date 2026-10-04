import { site } from "./site";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const formatHour = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
};

function rangeFor(dayIndex: number) {
  return site.hours.schema.find((r) => (r.dayOfWeek as readonly string[]).includes(DAYS[dayIndex]));
}

// Open/closed status in Paris time, from the hours in site.ts.
export function getOpenStatus(now = new Date()): { open: boolean; label: string } {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Paris",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  const day = DAYS.indexOf(parts.weekday);
  const minutes = (Number(parts.hour) % 24) * 60 + Number(parts.minute);

  const today = rangeFor(day);
  if (today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { open: true, label: "Actuellement ouvert" };
  }
  if (today && minutes < toMinutes(today.opens)) {
    return { open: false, label: `Actuellement fermé · Ouvre à ${formatHour(today.opens)}` };
  }
  const tomorrow = rangeFor((day + 1) % 7);
  return {
    open: false,
    label: tomorrow ? `Actuellement fermé · Ouvre demain à ${formatHour(tomorrow.opens)}` : "Actuellement fermé",
  };
}

export type OpenStatus = ReturnType<typeof getOpenStatus>;
