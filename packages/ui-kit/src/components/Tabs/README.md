# `Tabs` Component Usage Documentation

A compound component built on top of Radix UI's tabs primitives. `Tabs` switches between panels of content that share the same place on the page: one tab is active at a time and only its panel is shown.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Component API](#component-api)
- [Controlled and Uncontrolled Modes](#controlled-and-uncontrolled-modes)
- [Theming](#theming)
- [Keyboard Navigation](#keyboard-navigation)
- [Accessibility](#accessibility)
- [Notes](#notes)

## Overview

`Tabs` consists of four parts:

- `Tabs` — the root that stores the active tab and applies the theme
- `Tabs.List` — the row of tabs with a bottom border
- `Tabs.Trigger` — a single tab; the active one is highlighted with an indicator line
- `Tabs.Content` — the panel shown when its tab is active

`Tabs.Trigger` and `Tabs.Content` are linked by the same `value`.

## Installation

```typescript
import { Tabs, TabsPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Tabs';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { Tabs, TabsPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Tabs';

function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <Tabs theme={TabsPrimaryTheme} value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Trigger value="general">General</Tabs.Trigger>
        <Tabs.Trigger value="team">Team</Tabs.Trigger>
        <Tabs.Trigger value="automation">Automation</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="general">General settings</Tabs.Content>
      <Tabs.Content value="team">Team settings</Tabs.Content>
      <Tabs.Content value="automation">Automation settings</Tabs.Content>
    </Tabs>
  );
}
```

## Component API

### [Tabs](./Tabs.tsx)

The root component. All other parts must be its descendants. Renders a `div` laid out as a column: the list on top, the panels below.

| Prop             | Type                      | Default     | Description                                                                                     |
| ---------------- | ------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `theme`          | `TabsThemeType`           | —           | **Required.** Object with CSS theme properties                                                  |
| `value`          | `string`                  | —           | The active tab in controlled mode                                                               |
| `defaultValue`   | `string`                  | —           | The tab that is active on the first render in uncontrolled mode                                 |
| `onChange`       | `(value: string) => void` | —           | Called when another tab is selected. Selecting the active tab does not call it                  |
| `activationMode` | `'automatic' \| 'manual'` | `automatic` | Whether a tab is selected as soon as it gets focus with the arrow keys, or by `Enter` / `Space` |

`onChange` receives the value directly as a string, not an event object. Radix's `onValueChange` is replaced by `onChange` and is not part of the props.

Tabs are horizontal only: `orientation` is not part of the props, so the arrow keys always match the row layout.

### [Tabs.List](./components/List/List.tsx)

The container of `Tabs.Trigger` elements. Lays the tabs out in a row with `--crm-ui-kit-tabs-list-spacing` between them and draws the bottom border under the whole row.

The list is never wider than its parent. When the tabs do not fit, the row scrolls horizontally with a hidden scrollbar: with a trackpad, `Shift` + mouse wheel or the arrow keys — a tab focused with the arrow keys is scrolled into view.

### [Tabs.Trigger](./components/Trigger/Trigger.tsx)

A single tab. Requires a `value` that matches one `Tabs.Content`. The text does not wrap and the tab does not shrink. The active tab gets the `--crm-ui-kit-tabs-trigger-active-color` text color and an indicator line at the bottom.

Tabs cannot be disabled: `disabled` is not part of the props.

### [Tabs.Content](./components/Content/Content.tsx)

The panel of a tab. Requires a `value` that matches one `Tabs.Trigger`. Has no styles of its own, so spacing between the list and the panel is set by the consumer.

## Controlled and Uncontrolled Modes

In **controlled** mode the parent stores the active tab: pass `value` and update it in `onChange`.

```tsx
const [activeTab, setActiveTab] = useState('general');

<Tabs theme={TabsPrimaryTheme} value={activeTab} onChange={setActiveTab}>
  {/* ... */}
</Tabs>;
```

In **uncontrolled** mode `Tabs` stores the active tab itself: pass `defaultValue`. `onChange` is optional and only reports the change.

```tsx
<Tabs theme={TabsPrimaryTheme} defaultValue="general">
  {/* ... */}
</Tabs>
```

## Theming

`Tabs` is styled through CSS custom properties passed to the root as the `theme` prop. The theme class is applied to the root element, and `Tabs.List` and `Tabs.Trigger` inherit the properties from it.

```tsx
import {
  Tabs,
  TabsPrimaryTheme,
  type TabsThemeType,
} from '@kommo-crm/crm-react-ui-kit/Tabs';

const CompactTabsTheme: TabsThemeType = {
  ...TabsPrimaryTheme,
  '--crm-ui-kit-tabs-list-spacing': '16px',
  '--crm-ui-kit-tabs-trigger-font-size': '13px',
};

<Tabs theme={CompactTabsTheme} defaultValue="general">
  {/* ... */}
</Tabs>;
```

The theme object must be a stable reference (a module-level constant or a `useMemo` result) — a new object on every render creates a new generated class each time.

### Tokens

| Token                                        | Default                                          | Applies to                            |
| -------------------------------------------- | ------------------------------------------------ | ------------------------------------- |
| `--crm-ui-kit-tabs-list-spacing`             | `32px`                                           | Gap between tabs in `List`            |
| `--crm-ui-kit-tabs-list-border-width`        | `1px`                                            | Bottom border of `List`               |
| `--crm-ui-kit-tabs-list-border-color`        | `var(--crm-ui-kit-palette-border-active)`        | Bottom border of `List`               |
| `--crm-ui-kit-tabs-trigger-padding`          | `2px 5px 7px`                                    | `Trigger`                             |
| `--crm-ui-kit-tabs-trigger-elements-spacing` | `6px`                                            | Gap between elements inside `Trigger` |
| `--crm-ui-kit-tabs-trigger-font-size`        | `15px`                                           | `Trigger`                             |
| `--crm-ui-kit-tabs-trigger-line-height`      | `20px`                                           | `Trigger`                             |
| `--crm-ui-kit-tabs-trigger-color`            | `var(--crm-ui-kit-palette-text-secondary-light)` | Inactive `Trigger` text               |
| `--crm-ui-kit-tabs-trigger-active-color`     | `var(--crm-ui-kit-palette-text-primary)`         | Active `Trigger` text                 |
| `--crm-ui-kit-tabs-trigger-indicator-height` | `3px`                                            | Indicator line of the active tab      |
| `--crm-ui-kit-tabs-trigger-indicator-color`  | `var(--crm-ui-kit-palette-border-active)`        | Indicator line of the active tab      |

## Keyboard Navigation

- **Tab**: Moves focus to the active tab, then to the active panel
- **Arrow Right/Left**: Moves focus to the next/previous tab, wrapping around at the ends
- **Home/End**: Moves focus to the first/last tab
- **Enter/Space**: Selects the focused tab (needed only with `activationMode="manual"`)

With the default `activationMode="automatic"`, a tab is selected as soon as it gets focus.

## Accessibility

- `Tabs.List` has the `tablist` role, `Tabs.Trigger` the `tab` role, `Tabs.Content` the `tabpanel` role
- The active tab has `aria-selected="true"`
- Each tab is linked to its panel with `aria-controls`, and each panel to its tab with `aria-labelledby`
- Only the active tab is in the tab order; the others are reached with the arrow keys

## Notes

- The children of an inactive `Tabs.Content` are unmounted, so their local state is lost when switching tabs
- Each `Tabs.Trigger` needs a `Tabs.Content` with the same `value`, otherwise selecting the tab shows no panel
- The active tab and panel have `data-state="active"`, the others `data-state="inactive"`
