import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useClock } from "./hooks/useClock";
import { useTheme } from "./hooks/useTheme";
import { locale } from "./i18n";

export default function App() {
  const intl = useIntl();
  const { theme, toggle } = useTheme();
  const clock = useClock();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "uMPbIxqkaZ",
      defaultMessage: "harry's site",
      description: "Browser tab title",
    });
  }, [intl]);

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.location.href = `?locale=${e.target.value}`;
  };

  return (
    <>
      <div className="top-controls">
        <select
          className="locale-select"
          value={locale}
          onChange={handleLocaleChange}
          aria-label={intl.formatMessage({
            id: "zq-Uz1NFsZ",
            defaultMessage: "Select language",
            description: "Aria label for locale selector",
          })}
        >
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          <option value="au">🇦🇺 EN</option>
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          <option value="vn">🇻🇳 VI</option>
        </select>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggle}
          aria-label={intl.formatMessage({
            id: "o0Ff258xq-",
            defaultMessage: "Toggle color theme",
            description: "Aria label for theme toggle button",
          })}
        >
          {theme === "theme-dark"
            ? intl.formatMessage({
                id: "zQrsiJoYOj",
                defaultMessage: "Switch to light theme",
                description: "Theme toggle button label when dark mode is active",
              })
            : intl.formatMessage({
                id: "c0bab_V1oU",
                defaultMessage: "Switch to dark theme",
                description: "Theme toggle button label when light mode is active",
              })}
        </button>
      </div>
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 50 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <main>
        <div className="main-text">
          <p className="ltr">{clock}</p>
          <nav className="nav">
            <a href="/CV.html">
              <FormattedMessage
                id="iIHFDIlQN3"
                defaultMessage="CV"
                description="Navigation link to CV page"
              />
            </a>
            <a href="/geoguessr-notes/">
              <FormattedMessage
                id="01PG4xgdR3"
                defaultMessage="GeoGuessr notes"
                description="Navigation link to GeoGuessr notes page"
              />
            </a>
          </nav>
          <p className="ltr">
            <FormattedMessage
              id="TwXGJZuUNk"
              defaultMessage="Currently I'm working at Luxury Escapes as a Software Engineer. Prior to that, I got the opportunity to work as a Vacation Student at CSIRO under the supervision of Dr. Liz Cooper and Dr. Jason Dowling."
              description="First paragraph about work experience"
            />
          </p>
          <p className="ltr">
            <FormattedMessage
              id="RzRcrOo2P2"
              defaultMessage="I made this website to put on my LinkedIn, so I'd have an excuse to send more connection requests. I want more people checking out my website. I try to work on my own projects outside of work as well - it complements my work, and vice versa."
              description="Second paragraph about the website purpose"
            />
          </p>
          <p className="ltr">
            <FormattedMessage
              id="mqMqZN5PTv"
              defaultMessage="<link>Professor-style websites</link> look really cool, so I'm making mine similar."
              description="Third paragraph about website style inspiration"
              values={{
                link: (chunks) => (
                  <a href="https://www.reddit.com/r/ProgrammerHumor/comments/5n8t7x/comp_sci_professor_website_starter_pack/">
                    {chunks}
                  </a>
                ),
              }}
            />
          </p>
          <p className="ltr">
            <FormattedMessage
              id="JUiejykcm2"
              defaultMessage="<link>I'm currently Master I on GeoGuessr.</link> I try to write detailed region-guessing notes for each country. Hopefully you can learn something from them just as much as I try not to forget them."
              description="Fourth paragraph about GeoGuessr"
              values={{
                link: (chunks) => (
                  <a href="https://www.geoguessr.com/user/687660725547092f67d9becb">{chunks}</a>
                ),
              }}
            />
          </p>
          <p className="ltr">
            <FormattedMessage
              id="JjssUYmJJZ"
              defaultMessage="I'm a casual road cyclist, and now I'm starting out running."
              description="Fifth paragraph about hobbies"
            />
          </p>
          <p className="ltr">
            <FormattedMessage
              id="52VPGSFbuJ"
              defaultMessage="reach out! <link>harrynguyen8624 [at] gmail [dot] com</link>"
              description="Sixth paragraph with contact link"
              values={{
                link: (chunks) => <a href="mailto:harrynguyen8624@gmail.com">{chunks}</a>,
              }}
            />
          </p>
        </div>
      </main>
    </>
  );
}
