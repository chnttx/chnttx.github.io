# Rules

- Never concatenate translated strings. Keep meaning whole by expressing each case as a full, self-contained sentence in `intl.formatMessage` / `FormattedMessage`.
- Never use physical CSS properties (`left`, `right`, `top`, `bottom`, `width`, `height`, `margin-left`, `padding-right`, etc.). Always use logical CSS equivalents (`inset-inline-start`, `inset-inline-end`, `inset-block-start`, `inset-block-end`, `inline-size`, `block-size`, `margin-inline-start`, `padding-inline-end`, etc.).
