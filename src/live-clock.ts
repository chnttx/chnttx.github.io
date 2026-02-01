import { tzOffset } from "@date-fns/tz";
import { formatInTimeZone } from "date-fns-tz";

function initClock() {
  const clockElement = document.getElementById("clock");
  if (!clockElement) return;

  const updateClock = () => {
    const now = new Date();
    const localOffsetMinutes = -now.getTimezoneOffset();
    const sydneyOffsetMinutes = tzOffset("Australia/Sydney", now);
    const diffMinutes = sydneyOffsetMinutes - localOffsetMinutes;

    const absMinutes = Math.abs(diffMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    const timeParts: string[] = [];

    if (hours > 0) {
      timeParts.push(`${hours}h`);
    }

    if (minutes > 0) {
      timeParts.push(`${minutes}m`);
    }

    const timeLabel = timeParts.join(" ");
    const relationText =
      diffMinutes === 0
        ? "I'm the same time as you"
        : `I'm ${timeLabel} ${diffMinutes > 0 ? "ahead of" : "behind"} you`;

    clockElement.textContent = `my time: ${formatInTimeZone(
      now,
      "Australia/Sydney",
      "PP p",
    )} - Sydney. ${relationText}`;
  };

  updateClock();
  setInterval(updateClock, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initClock);
} else {
  initClock();
}
