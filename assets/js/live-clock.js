import { formatInTimeZone } from 'date-fns-tz';

const clockElement = document.getElementById("clock");

function initClock() {
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

initClock().catch(error => {
    console.error("Live clock failed to initialize", error);
});
