const clockElement = document.getElementById("clock");

async function loadDateFnsTz() {
    const sources = [
        "https://esm.sh/date-fns-tz@2.0.0",
        "https://cdn.jsdelivr.net/npm/date-fns-tz@2.0.0/+esm",
    ];

    for (const url of sources) {
        try {
            return await import(url);
        } catch (error) {
            console.warn(`Failed to load date-fns-tz from ${url}`, error);
        }
    }

    throw new Error("date-fns-tz could not be loaded from any CDN.");
}

async function initClock() {
    if (!clockElement) return;

    const { formatInTimeZone } = await loadDateFnsTz();

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
