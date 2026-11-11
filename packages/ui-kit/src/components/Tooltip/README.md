# `Tooltip` Component Usage Documentation

A short hint shown next to an element on hover, keyboard focus or tap. Built on top of Radix UI's tooltip primitives with fixed positioning, an inverse (dark) surface and touch support.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Component API](#component-api)
- [Behavior](#behavior)
- [Content](#content)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [Examples](#examples)
- [When Not to Use](#when-not-to-use)

## Overview

- **Opens without delay** on hover and on keyboard focus; closes when the pointer leaves the trigger, on `Escape`, on a click outside and on scroll.
- **Hoverable content**: the tooltip stays open while the pointer is over it, so links inside it are clickable.
- **Fixed positioning**: always above the trigger, centered, 2 px away. When there is no room, Radix flips it below and shifts it along the axis to keep it inside the collision boundary (the viewport by default).
- **One at a time**: opening a tooltip closes any other open one.
- **Touch**: the first tap shows the tooltip, the second tap activates the trigger.
- **Inverse surface**: the content is dark in the default appearance and light in the alternative one. `Link` inside it switches its colors automatically.

## Installation

```tsx
import {
  Tooltip,
  TooltipPrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/Tooltip';
```

## Basic Usage

```tsx
import {
  Tooltip,
  TooltipPrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/Tooltip';
import { Button, ButtonNeutralTheme } from '@kommo-crm/crm-react-ui-kit/Button';

function Example() {
  return (
    <Tooltip.Root theme={TooltipPrimaryTheme}>
      <Tooltip.Trigger asChild>
        <Button theme={ButtonNeutralTheme}>Save</Button>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content>
          Saves the draft without publishing it
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
```

`Tooltip` is a compound component: `Tooltip.Root` → `Tooltip.Trigger` + `Tooltip.Portal` → `Tooltip.Content` → `Tooltip.Arrow`. `Tooltip.Content` is not portalled by itself — wrap it in `Tooltip.Portal`.

## Component API

Props of every part are Radix props, except the ones listed as excluded: they are fixed by design.

### [Tooltip.Root](./Tooltip.tsx)

| Prop            | Type                        | Default | Description                                                                                                           |
| --------------- | --------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `children`      | `ReactNode`                 | —       | `Tooltip.Trigger` and `Tooltip.Portal`.                                                                               |
| `isOpen`        | `boolean`                   | —       | Controlled open state. The tooltip is controlled when it is not `undefined`.                                          |
| `isDefaultOpen` | `boolean`                   | `false` | Initial open state in uncontrolled mode.                                                                              |
| `onOpenChange`  | `(isOpen: boolean) => void` | —       | Called when the tooltip requests to open or close.                                                                    |
| `isDisabled`    | `boolean`                   | `false` | Ignores open requests from interaction and closes an open uncontrolled tooltip. Does not block a controlled `isOpen`. |
| `theme`         | `TooltipThemeType`          | —       | Object with CSS theme properties. Required.                                                                           |

Excluded: `open`, `defaultOpen` (renamed to `isOpen`, `isDefaultOpen`), `delayDuration`, `disableHoverableContent`.

`onOpenChange(false)` is called not only when the pointer leaves the trigger, but also on a click on the trigger, `Escape`, a click outside, scroll and when another tooltip opens.

### [Tooltip.Trigger](./components/Trigger/Trigger.tsx)

All props of Radix `Tooltip.Trigger`.

| Prop      | Type      | Default                      | Description                                                   |
| --------- | --------- | ---------------------------- | ------------------------------------------------------------- |
| `asChild` | `boolean` | `false`                      | Merge props onto the child instead of rendering a `<button>`. |
| `type`    | `string`  | `'button'` without `asChild` | `type` of the rendered `<button>`.                            |

- **Prefer `asChild`.** Without it the trigger is a native `<button>` with the browser's button styles.
- Without `asChild` the trigger gets `type="button"`, so it does not submit a surrounding form. With `asChild` only the `type` you pass is applied: on an anchor `type` is a MIME type.
- The `asChild` child must accept a `ref` and spread event props onto a DOM element.

### [Tooltip.Portal](./components/Portal/Portal.tsx)

| Prop        | Type                  | Default         | Description                           |
| ----------- | --------------------- | --------------- | ------------------------------------- |
| `children`  | `ReactNode`           | —               | `Tooltip.Content`.                    |
| `container` | `HTMLElement \| null` | `document.body` | DOM node the content is mounted into. |

Excluded: `forceMount`.

### [Tooltip.Content](./components/Content/Content.tsx)

All props of Radix `Tooltip.Content`, including standard `div` attributes.

| Prop                | Type                           | Default  | Description                                                |
| ------------------- | ------------------------------ | -------- | ---------------------------------------------------------- |
| `children`          | `ReactNode`                    | —        | Tooltip content and `Tooltip.Arrow`.                       |
| `className`         | `string`                       | —        | Custom class on the content element.                       |
| `style`             | `CSSProperties`                | —        | Inline styles. Radix moves `zIndex` to the popper wrapper. |
| `collisionBoundary` | `Element \| Element[] \| null` | viewport | Area inside which collisions and the flip are computed.    |
| `aria-label`        | `string`                       | —        | Text for screen readers instead of `children`.             |
| `asChild`           | `boolean`                      | `false`  | Merge props onto `children` instead of rendering a `div`.  |

Excluded (fixed by design): `side`, `align`, `sideOffset`, `alignOffset`, `avoidCollisions`, `collisionPadding`, `sticky`, `arrowPadding`, `hideWhenDetached`, `updatePositionStrategy`, `forceMount`, `onEscapeKeyDown`, `onPointerDownOutside`.

### [Tooltip.Arrow](./components/Arrow/Arrow.tsx)

| Prop              | Type     | Description                |
| ----------------- | -------- | -------------------------- |
| `className`       | `string` | Class on the arrow fill.   |
| `borderClassName` | `string` | Class on the arrow border. |

Plus standard `svg` props and `ref`. The size is fixed; the fill and the border come from the theme. Place it inside `Tooltip.Content`.

## Behavior

### Uncontrolled and controlled

By default the tooltip manages its own state. Pass `isOpen` to control it:

```tsx
const [isOpen, setIsOpen] = useState(false);

<Tooltip.Root
  theme={TooltipPrimaryTheme}
  isOpen={isOpen}
  onOpenChange={setIsOpen}
>
  …
</Tooltip.Root>;
```

A controlled tooltip that ignores `onOpenChange` stays as the `isOpen` prop says — use it for hints the code shows, e.g. "Copied" after a click (see [Examples](#examples)).

### Disabled

`isDisabled` blocks opening from interaction and closes an open uncontrolled tooltip. Use it instead of hiding the content with CSS.

### Touch

Radix does not open tooltips on touch. `Tooltip.Trigger` adds it:

| Tap    | Result                                                                                         |
| ------ | ---------------------------------------------------------------------------------------------- |
| First  | The tooltip opens. The trigger's `onClick`, form submit and link navigation do **not** happen. |
| Second | The tooltip closes and the click goes through as usual.                                        |

- A tap on the content keeps the tooltip open; a tap outside closes it.
- A tap on another trigger closes the open tooltip.
- A **controlled** (`isOpen`) or **disabled** tooltip does not take the tap — it goes straight to the trigger.
- A touch cancelled by scrolling does not count as a tap.
- Requires the Pointer Events API.

### Disabled trigger

A natively `disabled` `<button>` receives no pointer events, so a tooltip on it never opens. For the kit `Button`, pass `isClickableWhileDisabled` along with `isDisabled`: the button looks disabled but keeps the events, so it can be the trigger itself:

```tsx
<Tooltip.Root theme={TooltipPrimaryTheme}>
  <Tooltip.Trigger asChild>
    <Button theme={ButtonNeutralTheme} isDisabled isClickableWhileDisabled>
      Publish
    </Button>
  </Tooltip.Trigger>
  …
</Tooltip.Root>
```

`onClick` still fires on such a button — do not perform the action while it is disabled.

For other natively disabled elements, make the trigger a wrapper:

```tsx
<Tooltip.Root theme={TooltipPrimaryTheme}>
  <Tooltip.Trigger asChild>
    <span>
      <input type="checkbox" disabled />
    </span>
  </Tooltip.Trigger>
  …
</Tooltip.Root>
```

## Content

- **Text needs no wrapper.** The tooltip sets the font, size, line height and color. Do not wrap the text in `Text`: its theme sets its own color and breaks contrast on the inverse surface. Use `span`/`div` with a class only for layout (paragraphs, spacing).
- **Width** is limited to 240 px of text; longer text wraps. Do not override the width.
- **Links**: use `Link` with any theme that takes its colors from the palette (e.g. `LinkPrimaryTheme`). Inside `Tooltip.Content` the colors switch to the inverse ones on their own.

```tsx
<Tooltip.Content>
  Messages are sent through the official API.{' '}
  <Link theme={LinkPrimaryTheme} href="/help/api">
    Learn more
  </Link>
  <Tooltip.Arrow />
</Tooltip.Content>
```

### Inverse surface

`Tooltip.Content` renders with `data-crm-ui-kit-surface="inverse"`. Inside an element with this attribute the global `theme.css` swaps the link palette tokens to their inverse values. To render a regular surface inside it, mark it with `data-crm-ui-kit-surface="default"`:

```tsx
<Tooltip.Content>
  <div data-crm-ui-kit-surface="default" className={s.card}>
    <Link theme={LinkPrimaryTheme} href="#">
      Regular colors
    </Link>
  </div>
</Tooltip.Content>
```

## Theming

The `theme` prop of `Tooltip.Root` is required. Pass `TooltipPrimaryTheme` or your own theme object based on it:

```tsx
import {
  Tooltip,
  TooltipPrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/Tooltip';

const WideTooltipTheme = {
  ...TooltipPrimaryTheme,
  '--crm-ui-kit-tooltip-max-width': '320px',
};

<Tooltip.Root theme={WideTooltipTheme}>…</Tooltip.Root>;
```

| Variable                             | Default                                                   |
| ------------------------------------ | --------------------------------------------------------- |
| `--crm-ui-kit-tooltip-background`    | `var(--crm-ui-kit-palette-background-secondary-inverse)`  |
| `--crm-ui-kit-tooltip-text-color`    | `var(--crm-ui-kit-palette-text-primary-inverse)`          |
| `--crm-ui-kit-tooltip-font-size`     | `13px`                                                    |
| `--crm-ui-kit-tooltip-line-height`   | `15px`                                                    |
| `--crm-ui-kit-tooltip-font-weight`   | `400`                                                     |
| `--crm-ui-kit-tooltip-border-color`  | `var(--crm-ui-kit-palette-background-secondary-inverse)`  |
| `--crm-ui-kit-tooltip-box-shadow`    | `var(--crm-ui-kit-palette-tooltip-box-shadow)`            |
| `--crm-ui-kit-tooltip-padding`       | `8px`                                                     |
| `--crm-ui-kit-tooltip-border-radius` | `4px`                                                     |
| `--crm-ui-kit-tooltip-box-sizing`    | `content-box`                                             |
| `--crm-ui-kit-tooltip-max-width`     | `240px` (width of the text, padding and border are added) |
| `--crm-ui-kit-tooltip-z-index`       | `1001`                                                    |

The arrow uses `--crm-ui-kit-tooltip-background` for the fill and `--crm-ui-kit-tooltip-border-color` for the border.

## Accessibility

- The trigger gets `aria-describedby` pointing to the content while the tooltip is open.
- Radix renders a visually hidden copy of the content with `role="tooltip"` for screen readers; pass `aria-label` to `Tooltip.Content` when the visible content reads poorly (icons, markup).
- The tooltip opens on keyboard focus and closes on `Escape`.
- Do not put essential information or the only way to perform an action into a tooltip: it is not available until the user hovers, focuses or taps the trigger.

## Examples

### Icon with a hint

```tsx
<Tooltip.Root theme={TooltipPrimaryTheme}>
  <Tooltip.Trigger asChild>
    <span className={s.hintIcon}>
      <HelpIcon />
    </span>
  </Tooltip.Trigger>

  <Tooltip.Portal>
    <Tooltip.Content>
      The limit resets on the first day of the month
      <Tooltip.Arrow />
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip.Root>
```

### "Copied" after a click

```tsx
function CopyButton({ value }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <Tooltip.Root theme={TooltipPrimaryTheme} isOpen={isCopied}>
      <Tooltip.Trigger asChild>
        <Button theme={ButtonNeutralTheme} onClick={handleClick}>
          Copy
        </Button>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content>
          Copied
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
```

The tooltip is controlled, so hover does not open it and a tap copies right away.

### Inside a modal

Mount the content into the modal and keep it inside the modal's area:

```tsx
<Tooltip.Portal container={modalBodyElement}>
  <Tooltip.Content collisionBoundary={modalBodyElement}>
    …
    <Tooltip.Arrow />
  </Tooltip.Content>
</Tooltip.Portal>
```

## When Not to Use

A tooltip is a non-interactive hint. Use a popover-like component instead when the content:

- has buttons or other actions (e.g. "Got it", "Delete");
- opens on click or stays open on its own (coachmarks, onboarding hints);
- needs a different side, a bigger width or its own layout.
