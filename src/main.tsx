import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";
import { intlLocale, locale } from "./i18n";
import vn from "../lang/vn.json";
import "./styles/app.css";
import "./styles/base.css";
import "./styles/petals.css";

document.documentElement.lang = intlLocale;
document.documentElement.dir = "rtl";
document.documentElement.dataset.locale = locale;

const messages = locale === "vn" ? vn : undefined;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntlProvider locale={intlLocale} messages={messages}>
      <App />
    </IntlProvider>
  </StrictMode>,
);
