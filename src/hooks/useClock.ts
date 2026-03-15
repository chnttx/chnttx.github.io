import { tzOffset } from "@date-fns/tz";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

export function useClock(): string {
  const intl = useIntl();
  const [text, setText] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      const localOffsetMinutes = -now.getTimezoneOffset();
      const sydneyOffsetMinutes = tzOffset("Australia/Sydney", now);
      const diffMinutes = sydneyOffsetMinutes - localOffsetMinutes;

      const absMinutes = Math.abs(diffMinutes);
      const hours = Math.floor(absMinutes / 60);
      const minutes = absMinutes % 60;
      const parts: string[] = [];
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0) parts.push(`${minutes}m`);
      const timeLabel = parts.join(" ");

      const time = intl.formatDate(now, {
        timeZone: "Australia/Sydney",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      const relation =
        diffMinutes === 0
          ? intl.formatMessage({
              id: "oW2CZZy89s",
              defaultMessage: "I'm the same time as you",
              description: "Clock relation text when visitor is in the same timezone",
            })
          : diffMinutes > 0
            ? intl.formatMessage(
                {
                  id: "biWUaiL9y-",
                  defaultMessage: "I'm {timeLabel} ahead of you",
                  description: "Clock relation text when Sydney is ahead of the visitor",
                },
                { timeLabel },
              )
            : intl.formatMessage(
                {
                  id: "BXYEvfwyf-",
                  defaultMessage: "I'm {timeLabel} behind you",
                  description: "Clock relation text when Sydney is behind the visitor",
                },
                { timeLabel },
              );

      setText(
        intl.formatMessage(
          {
            id: "ZeGtYX487Q",
            defaultMessage: "my time: {time} - Sydney. {relation}",
            description: "Full clock display text showing Sydney time and timezone relation",
          },
          { time, relation },
        ),
      );
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [intl]);

  return text;
}
