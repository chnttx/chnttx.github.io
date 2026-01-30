import { formatInTimeZone } from "date-fns-tz";

function initClock() {
  const clockElement = document.getElementById("clock");
  if (!clockElement) return;

  const updateClock = () => {
    clockElement.textContent = `my time: ${formatInTimeZone(
      new Date(),
      "Australia/Sydney",
      "PPpp z",
    )} (Australia/Sydney)`;
  };

  updateClock();
  setInterval(updateClock, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initClock);
} else {
  initClock();
}
