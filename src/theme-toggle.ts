const storageKey = "preferred-theme";
const lightClass = "theme-light";
const darkClass = "theme-dark";
const body = document.body;
const toggle = document.querySelector(".theme-toggle");
if (toggle) {
  const setButtonLabel = (theme: string) => {
    const label = theme === darkClass ? "Switch to light theme" : "Switch to dark theme";
    const textTarget = toggle.querySelector(".theme-toggle__text");
    if (textTarget) {
      textTarget.textContent = label;
    }
  };
  const applyTheme = (theme: string) => {
    body.classList.remove(lightClass, darkClass);
    body.classList.add(theme);
    setButtonLabel(theme);
  };
  const resolvePreferredTheme = () => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === lightClass || stored === darkClass) {
      return stored;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return darkClass;
    }
    return lightClass;
  };
  const initialTheme = resolvePreferredTheme();
  applyTheme(initialTheme);
  toggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains(darkClass) ? lightClass : darkClass;
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch (error) {
      console.log({ error });
    }
  });
}
