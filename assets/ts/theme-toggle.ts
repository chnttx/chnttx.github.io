type Theme = 'theme-light' | 'theme-dark';

const storageKey = 'preferred-theme';
const lightClass: Theme = 'theme-light';
const darkClass: Theme = 'theme-dark';

const body = document.body;
const toggle = document.querySelector<HTMLButtonElement>('.theme-toggle');

if (toggle) {
    const setButtonLabel = (theme: Theme): void => {
        const label = theme === darkClass ? 'Switch to light theme' : 'Switch to dark theme';
        const textTarget = toggle.querySelector<HTMLSpanElement>('.theme-toggle__text');
        if (textTarget) {
            textTarget.textContent = label;
        }
    };

    const applyTheme = (theme: Theme): void => {
        body.classList.remove(lightClass, darkClass);
        body.classList.add(theme);
        setButtonLabel(theme);
    };

    const resolvePreferredTheme = (): Theme => {
        const stored = window.localStorage.getItem(storageKey) as Theme | null;
        if (stored === lightClass || stored === darkClass) {
            return stored;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return darkClass;
        }
        return lightClass;
    };

    const initialTheme = resolvePreferredTheme();
    applyTheme(initialTheme);

    toggle.addEventListener('click', () => {
        const nextTheme: Theme = body.classList.contains(darkClass) ? lightClass : darkClass;
        applyTheme(nextTheme);
        try {
            window.localStorage.setItem(storageKey, nextTheme);
        } catch (error) {
            // Storage might be disabled; ignore persistence errors.
        }
    });
}
