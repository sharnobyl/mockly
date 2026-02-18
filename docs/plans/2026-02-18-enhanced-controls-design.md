# Mockly Enhanced Controls Design

**Date:** 2026-02-18

## Overview

Add granular size controls with steppers and reset buttons to all inputs, basic markdown support for body text, and remove the inline image position option.

## Changes

### 1. Remove Inline Image Position
- Delete "inline" option from position toggle buttons
- Remove `img-slot-inline` HTML element
- Only "Top" and "Bottom" positions remain

### 2. Font Size Controls with Steppers

Each text element gets independent size control:

| Element | Default | Range | Step |
|---------|---------|-------|------|
| Display Name | 14.5px | 10-24px | 0.5px |
| Handle | 13px | 10-20px | 0.5px |
| Headline | 18px | 12-32px | 1px |
| Body | 14.5px | 10-24px | 0.5px |
| Avatar | 40px | 24-64px | 2px |

### 3. Markdown Support (Basic)
Parse in body text:
- **Bold**: `**text**` or `__text__`
- *Italic*: `*text*` or `_text_`
- `Code`: `` `text` ``
- [Links](url): `[text](url)`

Implementation: Simple regex replacement, no external library.

### 4. Stepper + Reset UI Pattern

```
[ Label ]                    [−] [Value/Display] [+] [↺]
```

- **−/+** buttons: Increment/decrement value
- **↺ reset**: Restore to default

Applied to:
- All numeric sliders (width, height, inset, corner radius)
- Text size controls (name, handle, headline, body)
- Avatar size
- Color pickers (reset to default color)

### 5. State Management

Add DEFAULTS constant:
```js
const DEFAULTS = {
  nameSize: 14.5,
  handleSize: 13,
  titleSize: 18,
  bodySize: 14.5,
  avatarSize: 40,
  bgColor: '#2d49b8',
  textColor: '#ffffff',
  cornerRadius: 16,
  inset: 10,
  width: 516,
  height: 0
};
```

Current values tracked in state variables alongside existing ones.
