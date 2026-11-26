# `InlineTabs` Component Usage Documentation

A compound component built on top of Radix UI's tabs primitives. `InlineTabs` is a single-row panel of tabs with a fixed height: the tabs that do not fit into the row move to an overflow menu at its end, and the selected tab is marked with a slider under it.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Component API](#component-api)
- [Overflow](#overflow)
- [Controlled and Uncontrolled Modes](#controlled-and-uncontrolled-modes)
- [Theming](#theming)
- [Keyboard Navigation](#keyboard-navigation)
- [Accessibility](#accessibility)
- [Notes](#notes)

## Overview

`InlineTabs` consists of six parts:

- `InlineTabs` (also `InlineTabs.Root`) — the root that stores the selected tab and applies the theme
- `InlineTabs.List` — the row of tabs with the overflow button and the slider
- `InlineTabs.Tab` — a single tab with an optional counter badge
- `InlineTabs.TabLabel` — the text of a tab, truncated with an ellipsis
- `InlineTabs.TabMenuIcon` — an icon of a tab shown only in the overflow menu
- `InlineTabs.Content` — the panel shown when its tab is selected

`InlineTabs.Tab` and `InlineTabs.Content` are linked by the same `value`.

## Installation

```typescript
import {
  InlineTabs,
  InlineTabsPrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/InlineTabs';
```

## Basic Usage

```tsx
import { useState } from 'react';
import {
  InlineTabs,
  InlineTabsPrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/InlineTabs';
import SettingsIcon from './icons/settings.svg';

function CardTabs(props) {
  const { counts, onSettingsOpen } = props;

  const [tab, setTab] = useState('general');

  const handleChange = (value) => {
    if (value === 'settings') {
      onSettingsOpen();

      return;
    }

    setTab(value);
  };

  return (
    <InlineTabs
      theme={InlineTabsPrimaryTheme}
      value={tab}
      onChange={handleChange}
    >
      <InlineTabs.List overflowButtonAriaLabel="More tabs">
        <InlineTabs.Tab value="general" counter={counts.general}>
          <InlineTabs.TabLabel>General</InlineTabs.TabLabel>
        </InlineTabs.Tab>
        <InlineTabs.Tab value="team" counter={counts.team}>
          <InlineTabs.TabLabel>Team</InlineTabs.TabLabel>
        </InlineTabs.Tab>
        <InlineTabs.Tab value="settings">
          <InlineTabs.TabMenuIcon>
            <SettingsIcon />
          </InlineTabs.TabMenuIcon>
          <InlineTabs.TabLabel>Settings</InlineTabs.TabLabel>
        </InlineTabs.Tab>
      </InlineTabs.List>

      <InlineTabs.Content value="general">General content</InlineTabs.Content>
      <InlineTabs.Content value="team">Team content</InlineTabs.Content>
    </InlineTabs>
  );
}
```

The `settings` tab here is a hybrid tab: it opens a modal instead of switching the panel, so it has no `InlineTabs.Content`, and the selection stays on the current tab. See [Controlled and Uncontrolled Modes](#controlled-and-uncontrolled-modes).

## Component API

### [InlineTabs](./InlineTabs.tsx)

The root component. All other parts must be its descendants. Renders a `div` laid out as a column: the list on top, the panels below.

| Prop           | Type                      | Default | Description                                                                                  |
| -------------- | ------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `theme`        | `InlineTabsThemeType`     | —       | **Required.** Object with CSS theme properties                                               |
| `value`        | `string`                  | —       | The selected tab in controlled mode                                                          |
| `defaultValue` | `string`                  | —       | The tab that is selected on the first render in uncontrolled mode                            |
| `onChange`     | `(value: string) => void` | —       | Called when another tab is clicked or activated. Selecting the selected tab does not call it |

`onChange` receives the value directly as a string, not an event object. Radix's `onValueChange` is replaced by `onChange` and is not part of the props.

Tabs are horizontal only: `orientation` is not part of the props.

### [InlineTabs.List](./components/List/List.tsx)

The row of tabs. Has the height of `--crm-ui-kit-inline-tabs-height`, the theme background and hides everything that does not fit. Renders the overflow button after its children and the slider under the selected tab.

`InlineTabs.Tab` elements must be direct children of the list; fragments, arrays and conditions are fine. Any other children are rendered as is in their place, but their width is not reserved in the layout, so they can be cut off.

| Prop                      | Type     | Default | Description                                                                                                                                                    |
| ------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `overflowButtonAriaLabel` | `string` | —       | Accessible name of the overflow button; the counter of the hidden tabs is added to it. Without it the button has no name when the hidden tabs have no counters |

### [InlineTabs.Tab](./components/Tab/Tab.tsx)

A single tab. Requires a `value` that is unique within the list.

| Prop      | Type     | Default | Description                                                                           |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------- |
| `value`   | `string` | —       | **Required.** The value of the tab                                                    |
| `counter` | `number` | —       | Number in the badge after the content. No badge without it or at zero, `99+` above 99 |

Other `div` props (`className`, `title`, `data-*`, `aria-*`, …) and the ref go to the inner element with the tab content, not to the element with the `tab` role.

Focus and keyboard handlers (`onFocus`, `onBlur`, `onKeyDown`, `onKeyUp`, …) are not part of the props: focus is on the element with the `tab` role or on the menu item, which wrap the inner element, so these events never reach it. Handle them on `InlineTabs.List` and check `event.target`, which has the `tab` role in the panel and the value of the tab in `data-value`.

The list renders the children of a tab in several places: in the panel, in the overflow menu item and in a hidden measure layer. Each place gets its own instance of the children, so they must keep no state, effects or ids: the menu instance mounts anew every time the tab enters the menu.

The props of a tab go to the panel copy and, except `id`, to the menu copy; the measure copy gets only `className` and `style`. The panel copy stays in the DOM, hidden, while the tab is in the menu, so while the menu is open an attribute such as `data-testid` is found twice: query the menu item within the menu.

### [InlineTabs.TabLabel](./components/TabLabel/TabLabel.tsx)

The text of a tab. Renders a `span` that does not wrap and is truncated with an ellipsis.

The list reserves a width for a tab with its label capped at `--crm-ui-kit-inline-tabs-label-max-width`. When the row has free space, the tabs grow from that width up to their full width, sharing the free space equally. When it has none, the labels stay truncated at the theme width, and the tabs that still do not fit move to the overflow menu.

Takes all `span` props and the ref.

### [InlineTabs.TabMenuIcon](./components/TabMenuIcon/TabMenuIcon.tsx)

An icon of a tab shown only while the tab is in the overflow menu; in the panel it renders nothing. In the menu item it is rendered where it is placed inside the tab; put it before `InlineTabs.TabLabel` for the standard look. The icon is sized by `--crm-ui-kit-inline-tabs-menu-item-icon-size`, and an `svg` inside it is stretched to that size.

Takes all `span` props and the ref.

### [InlineTabs.Content](./components/Content/Content.tsx)

The panel of a tab. Requires a `value` that matches one `InlineTabs.Tab`. Has no styles of its own, so spacing between the list and the panel is set by the consumer.

## Overflow

- The list measures the tabs and shows as many of them as fit together with the overflow button. The rest move to the menu in the same order
- The overflow button appears only while some tabs are hidden. It shows a badge with the sum of the counters of the hidden tabs
- The menu opens on hover over the overflow button and by Enter, Space or Arrow Down when the button is focused. Selecting an item selects the tab the same way as a click on it
- While a hidden tab is selected, its menu item is highlighted and the slider is shown under the overflow button
- The slider is hidden while the menu is open
- The split is updated when the list or the tabs change size: on resize, font load, a counter or a label change

## Controlled and Uncontrolled Modes

In **controlled** mode the parent stores the selected tab: pass `value` and update it in `onChange`.

```tsx
const [tab, setTab] = useState('general');

<InlineTabs theme={InlineTabsPrimaryTheme} value={tab} onChange={setTab}>
  {/* ... */}
</InlineTabs>;
```

A click on a tab never moves the selection by itself: if `onChange` does not update `value`, the selected tab stays the same. This is how hybrid tabs work — tabs that run an action (open a modal, navigate) instead of switching the panel.

In **uncontrolled** mode `InlineTabs` stores the selected tab itself: pass `defaultValue`. `onChange` is optional and only reports the change.

```tsx
<InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="general">
  {/* ... */}
</InlineTabs>
```

## Theming

`InlineTabs` is styled through CSS custom properties passed to the root as the `theme` prop. The theme class is applied to the root element and to the overflow menu, which is rendered in a portal outside the root.

Two themes are available:

- `InlineTabsPrimaryTheme` — for a colored background, e.g. the card header
- `InlineTabsSecondaryTheme` — for the default page background

```tsx
import {
  InlineTabs,
  InlineTabsPrimaryTheme,
  type InlineTabsThemeType,
} from '@kommo-crm/crm-react-ui-kit/InlineTabs';

const WideLabelsTheme: InlineTabsThemeType = {
  ...InlineTabsPrimaryTheme,
  '--crm-ui-kit-inline-tabs-label-max-width': '120px',
};

<InlineTabs theme={WideLabelsTheme} defaultValue="general">
  {/* ... */}
</InlineTabs>;
```

The theme object must be a stable reference (a module-level constant or a `useMemo` result) — a new object on every render creates a new generated class each time.

### Tokens

The tokens below have the same default in both themes:

| Token                                             | Default                                            | Applies to                               |
| ------------------------------------------------- | -------------------------------------------------- | ---------------------------------------- |
| `--crm-ui-kit-inline-tabs-height`                 | `29px`                                             | `List`                                   |
| `--crm-ui-kit-inline-tabs-trigger-padding`        | `0 8px 8px`                                        | Tab in the panel, overflow button        |
| `--crm-ui-kit-inline-tabs-trigger-color`          | `var(--crm-ui-kit-palette-inline-tabs-text-color)` | Text of a tab and of the overflow button |
| `--crm-ui-kit-inline-tabs-trigger-font-weight`    | `700`                                              | Tab in the panel and in the menu         |
| `--crm-ui-kit-inline-tabs-trigger-line-height`    | `20px`                                             | Tab in the panel                         |
| `--crm-ui-kit-inline-tabs-label-max-width`        | `65px`                                             | `TabLabel` width reserved in the layout  |
| `--crm-ui-kit-inline-tabs-counter-spacing`        | `4px`                                              | Gap before the counter badge             |
| `--crm-ui-kit-inline-tabs-slider-height`          | `3px`                                              | Slider                                   |
| `--crm-ui-kit-inline-tabs-overflow-width`         | `32px`                                             | Minimum width of the overflow button     |
| `--crm-ui-kit-inline-tabs-menu-max-width`         | `230px`                                            | Overflow menu                            |
| `--crm-ui-kit-inline-tabs-menu-item-height`       | `36px`                                             | Menu item                                |
| `--crm-ui-kit-inline-tabs-menu-item-padding`      | `0 15px`                                           | Menu item                                |
| `--crm-ui-kit-inline-tabs-menu-item-icon-size`    | `20px`                                             | `TabMenuIcon`                            |
| `--crm-ui-kit-inline-tabs-menu-item-icon-spacing` | `8px`                                              | Gap after `TabMenuIcon`                  |

The tokens below differ between the themes; see [`InlineTabs.themes.ts`](./InlineTabs.themes.ts) for the values:

| Token                                                | Applies to                          |
| ---------------------------------------------------- | ----------------------------------- |
| `--crm-ui-kit-inline-tabs-background`                | `List`, overflow menu and its items |
| `--crm-ui-kit-inline-tabs-trigger-hover-color`       | Hovered tab and menu item text      |
| `--crm-ui-kit-inline-tabs-trigger-selected-color`    | Selected tab text in the panel      |
| `--crm-ui-kit-inline-tabs-slider-color`              | Slider                              |
| `--crm-ui-kit-inline-tabs-menu-item-separator-color` | Line between menu items             |
| `--crm-ui-kit-inline-tabs-menu-item-selected-color`  | Selected tab text in the menu       |

## Keyboard Navigation

- **Tab**: Moves focus to the selected tab, then to the overflow button and the selected panel; while the selected tab is in the overflow menu, to the first visible tab instead
- **Arrow Right/Left**: Moves focus to the next/previous visible tab
- **Home/End**: Moves focus to the first/last visible tab
- **Enter/Space**: Selects the focused tab
- **Enter/Space/Arrow Down** on the overflow button: Opens the menu and focuses its first item; **Arrow Up/Down** moves between the items, **Enter** selects one

## Accessibility

- `InlineTabs.List` has the `tablist` role, each tab the `tab` role, `InlineTabs.Content` the `tabpanel` role
- The selected tab has `aria-selected="true"`; the menu item of a selected hidden tab has `aria-current`
- A hidden tab keeps its element with the `tab` role in the list, so the panel of a selected hidden tab stays labelled by it
- The measure layer is hidden from assistive technologies
- The overflow button gets its accessible name from `overflowButtonAriaLabel` of `InlineTabs.List`; the icon is hidden from assistive technologies
- Custom `role` and `aria-*` props of `InlineTabs.Tab` go to the inner element and do not replace the tab semantics

## Notes

- The children of an unselected `InlineTabs.Content` are unmounted, so their local state is lost when switching tabs
- The selected tab and panel have `data-state="active"`, the others `data-state="inactive"`; the menu item of the selected hidden tab has `data-selected`
- The element with the `tab` role has the value of the tab in `data-value`
