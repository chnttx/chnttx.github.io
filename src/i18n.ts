export const locale = new URLSearchParams(window.location.search).get("locale") ?? "au";
export const intlLocale = locale === "vn" ? "vi" : "en";
