# `ContextMenu` Component Usage Documentation

A comprehensive, feature-rich context menu component built on top of Radix UI's dropdown menu primitives. The ContextMenu component provides advanced functionality including hover and click modes, nested submenus, animations, keyboard navigation, and experimental SubRoot support for more flexible submenu implementations.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Component API](#component-api)
- [Modes](#modes)
- [SubRoot (Experimental Feature)](#subroot-experimental-feature)
- [Advanced Features](#advanced-features)
- [Keyboard Navigation](#keyboard-navigation)
- [Accessibility](#accessibility)
- [Examples](#examples)

## Overview

The ContextMenu component is a flexible and powerful dropdown menu system that supports:

- **Multiple interaction modes**: Click-based and hover-based menu activation
- **Nested submenus**: Support for deeply nested menu structures using both standard `Sub` and experimental `SubRoot` components
- **Smooth animations**: Configurable animation durations with opacity transitions
- **Keyboard navigation**: Full keyboard support with automatic focus management and arrow key navigation
- **Focus tracking**: Automatic menu closure when focus moves outside the menu and its submenus
- **Focus management**: Advanced focus handling for inputs within menu items
- **Auto-positioning**: Intelligent positioning with collision detection (excludes non-selectable items)
- **Rich component library**: Items, groups, labels, separators, checkboxes, radio buttons, and more

## Installation

```typescript
import { ContextMenu } from 'src/components/ContextMenu';
```

## Basic Usage

```tsx
import { ContextMenu } from 'src/components/ContextMenu';

function MyComponent() {
  return (
    <ContextMenu.Root mode="click">
      <ContextMenu.Trigger>
        <button>Open Menu</button>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content>
          <ContextMenu.Item>
            <span>First Item</span>
          </ContextMenu.Item>

          <ContextMenu.Item>
            <span>Second Item</span>
          </ContextMenu.Item>

          <ContextMenu.Separator />

          <ContextMenu.Item isDanger>
            <span>Delete</span>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
```

## Component API

### [ContextMenu.Root](./ContextMenu.tsx)

The root component that wraps the entire menu structure. All other components must be children of `Root`.

**Props:**

- `mode` (required): `'click'` | `'hover'` - Defines how the menu is triggered
- `onOpen?`: `(open: boolean) => void` - Callback when open state changes
- `onAnimatedOpen?`: `(open: boolean) => void` - Callback when animation state changes
- `isOpen?`: `boolean` - Controlled open state
- `defaultOpen?`: `boolean` - Uncontrolled initial open state
- `shouldCloseCurrentMenuOnSelect?`: `boolean` - Whether menu closes on item click (default: `true`)
- `enableInnerInputFocus?`: `boolean` - Enable focus management for inputs inside items (default: `false`)

### [ContextMenu.Trigger](./components/Trigger/Trigger.tsx)

The element that triggers the menu to open.

**Props:**

- Standard HTML button props
- `asChild?`: `boolean` - Merge props with child element (Radix UI pattern)

### [ContextMenu.Portal](./components/Portal/Portal.tsx)

Portals the menu content to a different part of the DOM. Recommended for z-index and overflow handling.

### [ContextMenu.Content](./components/Content/Content.tsx)

The container for menu items.

**Props:**

- `direction?`: `'down-right'` | `'down-left'` | `'up-right'` | `'up-left'` | `'right-up'` | `'right-down'` | `'left-up'` | `'left-down'` - Positioning direction (default: `'down-right'`)
- `sideOffset?`: `number` - Distance from trigger (default: `5`)
- `alignOffset?`: `number` - Alignment offset
- `collisionBoundary?`: `HTMLElement` - Element to check collisions against
- `disableAutoPositioning?`: `boolean` - Disable automatic position adjustment
- `disableRepositioning?`: `boolean` - Disable repositioning on collision
- Standard Radix UI Content props

### [ContextMenu.Item](./components/Item/Item.tsx)

A clickable menu item.

**Props:**

- `isDisabled?`: `boolean` - Disable the item
- `isDanger?`: `boolean` - Apply danger styling
- `isSelectable?`: `boolean` - Whether item is selectable (affects click behavior)
- `shouldCloseCurrentMenuOnSelect?`: `boolean` - Whether selecting closes current menu (default: `true`)
- `shouldCloseRootMenuOnSelect?`: `boolean` - Close root menu on select
- `onSelect?`: `(event: Event) => void` - Selection handler
- Standard Radix UI Item props

### [ContextMenu.Sub](./components/Sub/Sub.tsx)

Standard submenu component for nested menus.

**Props:**

- `mode?`: `'click'` | `'hover'` - Submenu trigger mode (default: `'hover'`)
- `onOpen?`: `(open: boolean) => void` - Open state callback
- `defaultOpen?`: `boolean` - Initial open state
- `shouldCloseRootMenuOnSelect?`: `boolean` - Close root menu on item select (default: `true`)
- `shouldCloseCurrentMenuOnSelect?`: `boolean` - Close current submenu on item select (default: `true`)

**Usage:**

```tsx
<ContextMenu.Sub>
  <ContextMenu.SubTrigger>
    <span>Submenu</span>
    <ContextMenu.ItemRightSlot>
      <ChevronIcon />
    </ContextMenu.ItemRightSlot>
  </ContextMenu.SubTrigger>

  <ContextMenu.Portal>
    <ContextMenu.SubContent>
      <ContextMenu.Item>Submenu Item 1</ContextMenu.Item>
      <ContextMenu.Item>Submenu Item 2</ContextMenu.Item>
    </ContextMenu.SubContent>
  </ContextMenu.Portal>
</ContextMenu.Sub>
```

### [ContextMenu.SubTrigger](./components/SubTrigger/SubTrigger.tsx)

Trigger element for opening a `Sub` submenu. Must be used inside `ContextMenu.Sub`.

**Props:**

- `isDisabled?`: `boolean` - Disable the submenu trigger
- Standard Radix UI SubTrigger props (excluding `disabled`, `textValue`)

**Usage:**

```tsx
<ContextMenu.Sub>
  <ContextMenu.SubTrigger>
    <span>Submenu</span>
    <ContextMenu.ItemRightSlot>
      <ChevronRightIcon />
    </ContextMenu.ItemRightSlot>
  </ContextMenu.SubTrigger>
  {/* ... SubContent ... */}
</ContextMenu.Sub>
```

### [ContextMenu.SubContent](./components/SubContent/SubContent.tsx)

Content container for `Sub` submenu items. Must be used inside `ContextMenu.Sub` and wrapped in `ContextMenu.Portal`.

**Props:**

- `disableAutoPositioning?`: `boolean` - Disable automatic positioning (default: `false`)
- `disableRepositioning?`: `boolean` - Disable repositioning on collision (default: `false`)
- Standard Radix UI SubContent props

**Usage:**

```tsx
<ContextMenu.Sub>
  <ContextMenu.SubTrigger>Submenu</ContextMenu.SubTrigger>
  <ContextMenu.Portal>
    <ContextMenu.SubContent>
      <ContextMenu.Item>Submenu Item</ContextMenu.Item>
    </ContextMenu.SubContent>
  </ContextMenu.Portal>
</ContextMenu.Sub>
```

### [ContextMenu.CheckboxItem](./components/CheckboxItem/CheckboxItem.tsx)

Menu item with checkbox functionality. Allows toggling a boolean state.

**Props:**

- `isChecked?`: `boolean` - Whether checkbox is checked
- `onChange?`: `(e: React.ChangeEvent<HTMLInputElement>) => void` - Change handler (mimics native input onChange)
- `isDisabled?`: `boolean` - Disable the checkbox item
- `hasIconCheckFn?`: `(children: React.ReactNode) => boolean` - Function to check for icon presence
- `shouldCloseCurrentMenuOnSelect?`: `boolean` - Whether selecting closes current menu (default: `true`)
- `shouldCloseRootMenuOnSelect?`: `boolean` - Close root menu on select (default: `false`)
- Standard Radix UI CheckboxItem props

**Usage:**

```tsx
<ContextMenu.CheckboxItem
  isChecked={checked}
  onChange={(e) => setChecked(e.target.checked)}
>
  <ContextMenu.ItemIndicator>
    <CheckIcon />
  </ContextMenu.ItemIndicator>
  <span>Enable notifications</span>
</ContextMenu.CheckboxItem>
```

### [ContextMenu.RadioGroup](./components/RadioGroup/RadioGroup.tsx)

Container for radio button items. Manages exclusive selection state.

**Props:**

- `value`: `string` - Currently selected radio value
- `onChange?`: `(e: React.ChangeEvent<HTMLInputElement>) => void` - Change handler (replaces Radix `onValueChange`)
- Standard Radix UI RadioGroup props (excluding `onValueChange`)

**Usage:**

```tsx
<ContextMenu.RadioGroup value={theme} onChange={handleThemeChange}>
  <ContextMenu.RadioItem value="light">Light</ContextMenu.RadioItem>
  <ContextMenu.RadioItem value="dark">Dark</ContextMenu.RadioItem>
</ContextMenu.RadioGroup>
```

### [ContextMenu.RadioItem](./components/RadioItem/RadioItem.tsx)

Individual radio button item within a RadioGroup.

**Props:**

- `value`: `string` (required) - Unique value for this radio option
- `isDisabled?`: `boolean` - Disable the radio item
- `hasIconCheckFn?`: `(children: React.ReactNode) => boolean` - Function to check for icon presence
- `shouldCloseCurrentMenuOnSelect?`: `boolean` - Whether selecting closes current menu (default: `true`)
- `shouldCloseRootMenuOnSelect?`: `boolean` - Close root menu on select (default: `false`)
- Standard Radix UI RadioItem props (excluding `disabled`)

**Usage:**

```tsx
<ContextMenu.RadioItem value="light">
  <span>Light Theme</span>
</ContextMenu.RadioItem>
```

### Additional Components

#### [ContextMenu.Separator](./components/Separator/Separator.tsx)

Visual separator line between menu items. Used to group related items visually.

**Props:**

- Standard Radix UI Separator props (no additional props)

**Usage:**

```tsx
<ContextMenu.Item>Item 1</ContextMenu.Item>
<ContextMenu.Separator />
<ContextMenu.Item>Item 2</ContextMenu.Item>
```

#### [ContextMenu.Label](./components/Label/Label.tsx)

Section header/label for grouping menu items. Used for accessibility and visual organization.

**Props:**

- Standard Radix UI Label props (no additional props)

**Usage:**

```tsx
<ContextMenu.Label>
  <span>Settings</span>
</ContextMenu.Label>
<ContextMenu.Item>Preferences</ContextMenu.Item>
```

#### [ContextMenu.Group](./components/Group/Group.tsx)

Logical grouping component for menu items. Provides semantic structure for screen readers.

**Props:**

- Standard Radix UI Group props (no additional props)

**Usage:**

```tsx
<ContextMenu.Group>
  <ContextMenu.Item>Item 1</ContextMenu.Item>
  <ContextMenu.Item>Item 2</ContextMenu.Item>
</ContextMenu.Group>
```

#### [ContextMenu.ItemIcon](./components/ItemIcon/ItemIcon.tsx)

Container for icon elements within menu items. Ensures proper alignment and spacing.

**Props:**

- `children`: `React.ReactNode` (required) - Icon element
- `className?`: `string` - Custom CSS class

**Usage:**

```tsx
<ContextMenu.Item>
  <ContextMenu.ItemIcon>
    <EditIcon />
  </ContextMenu.ItemIcon>
  <span>Edit</span>
</ContextMenu.Item>
```

#### [ContextMenu.ItemIndicator](./components/ItemIndicator/ItemIndicator.tsx)

Container for indicators (checkmarks, radio dots, etc.) in menu items. Used with `CheckboxItem` and `RadioItem`.

**Props:**

- Standard Radix UI ItemIndicator props (no additional props)

**Usage:**

```tsx
<ContextMenu.CheckboxItem isChecked={checked}>
  <ContextMenu.ItemIndicator>
    <CheckIcon />
  </ContextMenu.ItemIndicator>
  <span>Option</span>
</ContextMenu.CheckboxItem>
```

#### [ContextMenu.ItemRightSlot](./components/ItemRightSlot/ItemRightSlot.tsx)

Right-aligned content slot for menu items. Commonly used for icons, badges, or submenu triggers.

**Props:**

- `children`: `React.ReactNode` (required) - Content to display in right slot
- `className?`: `string` - Custom CSS class
- Standard HTML div props

**Usage:**

```tsx
<ContextMenu.Item>
  <span>Settings</span>
  <ContextMenu.ItemRightSlot>
    <ChevronRightIcon />
  </ContextMenu.ItemRightSlot>
</ContextMenu.Item>
```

#### [ContextMenu.Arrow](./components/Arrow/Arrow.tsx)

Decorative arrow pointer that points toward the menu trigger. Automatically positions based on menu placement.

**Props:**

- Standard Radix UI Arrow props (no additional props)

**Usage:**

```tsx
<ContextMenu.Content>
  <ContextMenu.Item>Item 1</ContextMenu.Item>
  <ContextMenu.Arrow />
</ContextMenu.Content>
```

#### [ContextMenu.FocusBlocker](./components/FocusBlocker/FocusBlocker.tsx)

Utility component that blocks pointer and focus events to prevent accidental interactions. Used internally by `SubRoot` when a submenu is open. Automatically simulates mouseenter events on menu items when the blocker is removed if the cursor was over it.

**Props:**

- `className?`: `string` - Custom CSS class for the blocker
- Standard HTML div props (onFocus, onPointerEnter, onPointerLeave, onPointerMove)

**Note:** This component is primarily used internally. Most users won't need to use it directly.

## Modes

### Click Mode

Menu opens when trigger is clicked and closes when clicking outside or on an item.

```tsx
<ContextMenu.Root mode="click">{/* ... */}</ContextMenu.Root>
```

### Hover Mode

Menu opens on mouse hover and closes when mouse leaves. Includes configurable delay before closing.

```tsx
<ContextMenu.Root mode="hover">{/* ... */}</ContextMenu.Root>
```

**Note:** On touch devices, hover mode automatically switches to click mode.

## SubRoot (Experimental Feature)

**⚠️ EXPERIMENTAL: This feature is experimental and subject to change. Use with caution in production.**

`SubRoot` is an experimental alternative to the standard `Sub` component for creating nested menus. It provides more flexibility and control but uses a different implementation approach.

### What is SubRoot?

`SubRoot` creates a fully independent menu instance that can be nested within a menu item, particularly useful for `ItemRightSlot` scenarios. Unlike `Sub`, which uses Radix UI's `Sub` primitive, `SubRoot` creates a new root-level menu that's managed as a child of the parent menu.

### ⚠️ Critical Requirement: Context Dependency

**IMPORTANT:** `SubRoot` **MUST** be used inside one of the following menu item components: `ContextMenu.Item`, `ContextMenu.CheckboxItem`, or `ContextMenu.RadioItem`. It cannot be used as a standalone component outside of these menu item components.

**Why this requirement exists:**

- `SubRoot` relies on two contexts for proper operation:
  1. **ContextMenuProvider**: Provided by `ContextMenu.Root` - provides `animationDuration`, `hoverCloseDelay`, and other menu configuration values
  2. **SubMenuProvider**: Provided by `Item`, `CheckboxItem`, or `RadioItem` components via the `useSubMenu` hook - provides `subMenuOpen`, `setSubMenuOpen` state management
- The `Item`, `CheckboxItem`, and `RadioItem` components automatically wrap their children with `SubMenuProvider` through the `useSubMenu` hook (see `withProvider` function in useSubMenu.tsx)
- Without both contexts, `SubRoot` will fail to function correctly and may throw errors

**Recommended usage (inside ItemRightSlot within Item components):**

```tsx
<ContextMenu.Item>
  <span>Menu Item</span>
  <ContextMenu.ItemRightSlot>
    {/* ✅ Recommended: SubRoot inside ItemRightSlot */}
    <ContextMenu.experimental_SubRoot>
      {/* ... */}
    </ContextMenu.experimental_SubRoot>
  </ContextMenu.ItemRightSlot>
</ContextMenu.Item>
```

**Also valid (directly inside Item components):**

```tsx
<ContextMenu.Item>
  <span>Menu Item</span>
  {/* ✅ Valid: SubRoot can also be directly inside Item */}
  <ContextMenu.experimental_SubRoot>{/* ... */}</ContextMenu.experimental_SubRoot>
</ContextMenu.Item>

<ContextMenu.CheckboxItem isChecked={checked} onChange={handleChange}>
  <span>Checkbox Item</span>
  {/* ✅ Valid: SubRoot inside CheckboxItem */}
  <ContextMenu.experimental_SubRoot>{/* ... */}</ContextMenu.experimental_SubRoot>
</ContextMenu.CheckboxItem>

<ContextMenu.RadioItem value="value">
  <span>Radio Item</span>
  {/* ✅ Valid: SubRoot inside RadioItem */}
  <ContextMenu.experimental_SubRoot>{/* ... */}</ContextMenu.experimental_SubRoot>
</ContextMenu.RadioItem>
```

**Incorrect usage (standalone):**

```tsx
<ContextMenu.Content>
  {/* ❌ WRONG: SubRoot cannot be used directly in Content */}
  <ContextMenu.SubRoot>
    {/* This will fail - missing required context */}
  </ContextMenu.SubRoot>
</ContextMenu.Content>
```

**Valid placement locations:**

- Inside `ContextMenu.Item` (recommended to use `ItemRightSlot` within it)
- Inside `ContextMenu.CheckboxItem` (recommended to use `ItemRightSlot` within it)
- Inside `ContextMenu.RadioItem` (recommended to use `ItemRightSlot` within it)
- Inside `ContextMenu.ItemRightSlot` (when used within Item, CheckboxItem, or RadioItem)

**Invalid placement locations:**

- Directly inside `ContextMenu.Content`
- Directly inside `ContextMenu.Root`
- Outside of any menu item component (Item, CheckboxItem, RadioItem)
- As a sibling to menu item components without being inside one

### Key Differences from Sub

| Feature                         | Sub                            | SubRoot (Experimental)                                                                        |
| ------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------- |
| **Implementation**              | Uses Radix UI `Sub` primitive  | Uses Radix UI `Root` primitive                                                                |
| **Trigger Location**            | Must be `SubTrigger` component | Can use `SubRoot.Trigger` inside Item/CheckboxItem/RadioItem (recommended in `ItemRightSlot`) |
| **Content Component**           | `SubContent`                   | `SubRoot.Content`                                                                             |
| **Control**                     | Managed by parent context      | More independent with its own context                                                         |
| **Use Case**                    | Standard nested menus          | Custom trigger placement, especially in item right slots                                      |
| **Default Mode**                | `hover`                        | `hover`                                                                                       |
| **shouldCloseRootMenuOnSelect** | `true` (default)               | `false` (default)                                                                             |

### When to Use SubRoot

Consider using `SubRoot` (experimentally) when:

1. **Custom Trigger Placement**: You need to place a submenu trigger in `ItemRightSlot` or other locations within a menu item (`Item`, `CheckboxItem`, or `RadioItem`)
2. **Independent Behavior**: You need a submenu that behaves more independently from its parent (while still being inside a menu item component)
3. **Custom Styling**: You require different styling approaches that don't fit the `Sub` component pattern
4. **Advanced Positioning**: You need more control over positioning logic

**Remember:** `SubRoot` must always be placed inside one of: `ContextMenu.Item`, `ContextMenu.CheckboxItem`, or `ContextMenu.RadioItem`. It's recommended to use `ItemRightSlot` within these components for better layout control. It cannot be used as a standalone component.

**⚠️ Warning:** Since `SubRoot` is experimental:

- The API may change in future versions
- There may be edge cases or bugs
- Performance characteristics may differ from `Sub`
- Not all features may work identically to `Sub`

### SubRoot API

#### [ContextMenu.SubRoot](./components/SubRoot/SubRoot.tsx)

The root component for experimental submenus.

**Props:**

- `mode?`: `'click'` | `'hover'` - Trigger mode (default: `'hover'`)
- `onOpen?`: `(open: boolean) => void` - Open state callback
- `onAnimatedOpen?`: `(open: boolean) => void` - Animation state callback
- `defaultOpen?`: `boolean` - Initial open state
- `shouldCloseRootMenuOnSelect?`: `boolean` - Close root menu on item select (default: `false`)
- `shouldCloseCurrentMenuOnSelect?`: `boolean` - Close current submenu on item select (default: `true`)

#### [ContextMenu.SubRoot.Trigger](./components/SubRoot/components/Trigger/Trigger.tsx)

The trigger element for SubRoot.

**Props:**

- Standard HTML button props
- Automatically handles hover/click behavior based on `mode`
- Includes focus management and highlighting

#### [ContextMenu.SubRoot.Content](./components/SubRoot/components/Trigger/Trigger.tsx)

The content container for SubRoot menu.

**Props:**

- Same as `ContextMenu.Content` props
- `direction?`: Positioning direction
- `alignOffset?`: Alignment offset
- `sideOffset?`: Distance from trigger
- `collisionBoundary?`: Collision detection boundary
- `disableAutoPositioning?`: Disable auto-positioning
- `disableRepositioning?`: Disable repositioning

### SubRoot Usage Example

```tsx
<ContextMenu.Root mode="click">
  <ContextMenu.Trigger>
    <button>Main Menu</button>
  </ContextMenu.Trigger>

  <ContextMenu.Portal>
    <ContextMenu.Content>
      <ContextMenu.Item>
        <span>Workspace Settings</span>

        <ContextMenu.ItemRightSlot>
          <ContextMenu.experimental_SubRoot
            mode="hover"
            shouldCloseRootMenuOnSelect
          >
            <ContextMenu.experimental_SubRoot.Trigger
              style={{
                display: 'flex',
                padding: '10px 16px',
                margin: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <TriggerIcon />
            </ContextMenu.experimental_SubRoot.Trigger>

            <ContextMenu.Portal>
              <ContextMenu.experimental_SubRoot.Content
                sideOffset={-5}
                alignOffset={16}
              >
                <ContextMenu.CheckboxItem
                  isChecked={autoupdateChecked}
                  onChange={handleAutoupdateChange}
                  shouldCloseRootMenuOnSelect
                >
                  <ContextMenu.ItemIndicator>
                    <CheckIcon />
                  </ContextMenu.ItemIndicator>
                  <span>Autoupdate</span>
                </ContextMenu.CheckboxItem>

                <ContextMenu.Separator />

                <ContextMenu.RadioGroup
                  value={theme}
                  onChange={handleThemeChange}
                >
                  <ContextMenu.RadioItem
                    value="light"
                    shouldCloseRootMenuOnSelect
                  >
                    <span>Light</span>
                  </ContextMenu.RadioItem>

                  <ContextMenu.RadioItem
                    value="dark"
                    shouldCloseRootMenuOnSelect
                  >
                    <span>Dark</span>
                  </ContextMenu.RadioItem>
                </ContextMenu.RadioGroup>
              </ContextMenu.experimental_SubRoot.Content>
            </ContextMenu.Portal>
          </ContextMenu.experimental_SubRoot>
        </ContextMenu.ItemRightSlot>
      </ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

### SubRoot Implementation Details

**How it Works:**

1. **Dual Context Dependency**: `SubRoot` **must** be inside a menu item (`Item`, `CheckboxItem`, or `RadioItem`) that provides `SubMenuProvider` context, and that item must be within a `ContextMenu.Root` hierarchy that provides `ContextMenuProvider` context. It reads animation settings from `ContextMenuProvider` and submenu state from `SubMenuProvider`
2. **Independent Root**: `SubRoot` creates its own `RadixDropdownMenuRoot`, making it a fully separate menu instance, but it still requires the parent context to function
3. **Context Integration**: It integrates with the parent menu's context through `useContextMenuSubMenu` hook, which calls both `useContextMenuContext` (from `ContextMenuProvider`) and `useSubMenuContext` (from `SubMenuProvider` provided by Item/CheckboxItem/RadioItem components via `useSubMenu` hook)
4. **Focus Blocker**: Automatically includes a `FocusBlocker` when open to handle outside clicks
5. **Submenu Context**: Uses `useSubMenuContext` to coordinate with parent menu's submenu state
6. **Animation**: Supports the same animation system as the root menu with opacity transitions

**Critical Implementation Note:**

The `useContextMenuSubMenu` hook used by `SubRoot` requires two contexts:

1. **ContextMenuProvider context**: Provided by `ContextMenu.Root` or `ContextMenu.Content` - provides `animationDuration`, `hoverCloseDelay`, and other menu settings. `SubRoot` calls `useContextMenuContext(DISPLAY_NAME)` at line 39-40 in SubRoot.tsx.

2. **SubMenuProvider context**: Provided by `Item`, `CheckboxItem`, or `RadioItem` components through the `useSubMenu` hook. These components wrap their children in `SubMenuProvider` which provides `subMenuOpen` and `setSubMenuOpen`. `SubRoot` calls `useSubMenuContext(DISPLAY_NAME)` at line 42-43 in SubRoot.tsx.

This is why `SubRoot` **must** be used inside `ContextMenu.Item`, `ContextMenu.CheckboxItem`, or `ContextMenu.RadioItem` (which provide `SubMenuProvider`), and these items must be within a `ContextMenu.Root` hierarchy (which provides `ContextMenuProvider`). While `ItemRightSlot` is recommended for placement, any location within these item components is valid.

**Technical Characteristics:**

- Uses `useContextMenuSubMenu` hook instead of `useContextMenuSub`
- Creates separate `ContextMenuProvider` instance
- Maintains its own open state while coordinating with parent
- Supports all standard menu features (items, groups, etc.)
- Keyboard navigation works with Arrow Left to close and return focus

**Limitations & Known Issues (Experimental):**

- **CRITICAL**: Must be used inside `ContextMenu.Item`, `ContextMenu.CheckboxItem`, or `ContextMenu.RadioItem` - cannot be standalone
- **Recommended**: Use `ItemRightSlot` within these components for better layout and styling
- May have different behavior than `Sub` in edge cases
- Performance may vary with deeply nested structures
- Some accessibility features may differ
- API is subject to change
- Positioning calculations may behave differently

**Migration from Sub to SubRoot:**

If you need to migrate from `Sub` to `SubRoot`:

1. Ensure `SubRoot` is placed inside `Item`, `CheckboxItem`, or `RadioItem` (recommended: use `ItemRightSlot` within these)
2. Replace `<ContextMenu.Sub>` with `<ContextMenu.experimental_SubRoot>`
3. Replace `<ContextMenu.SubTrigger>` with `<ContextMenu.experimental_SubRoot.Trigger>`
4. Replace `<ContextMenu.SubContent>` with `<ContextMenu.experimental_SubRoot.Content>`
5. Review `shouldCloseRootMenuOnSelect` prop (different default: `false` vs `true`)
6. Test hover/click behavior thoroughly
7. Verify keyboard navigation works as expected

**Recommendation:**

For most use cases, prefer the standard `Sub` component. Only use `SubRoot` when you specifically need its unique capabilities, such as custom trigger placement within `Item`, `CheckboxItem`, or `RadioItem` components (recommended to use `ItemRightSlot` for better layout). Always thoroughly test experimental features before using in production.

## Advanced Features

### Inner Input Focus

Enable focus management for inputs (text fields, etc.) inside menu items. When enabled, items with focused inputs will automatically set `isSelectable={false}` and the menu will remain open while the input is focused.

```tsx
<ContextMenu.Root mode="click" enableInnerInputFocus>
  {/* Menu with input fields */}
  <ContextMenu.Item isSelectable={false}>
    <input type="text" placeholder="Search..." />
  </ContextMenu.Item>
</ContextMenu.Root>
```

### Animation Control

Monitor animation state:

```tsx
<ContextMenu.Root
  mode="hover"
  onAnimatedOpen={(animated) => {
    console.log('Animation state:', animated);
  }}
>
  {/* ... */}
</ContextMenu.Root>
```

### Controlled Open State

```tsx
const [isOpen, setIsOpen] = useState(false);

<ContextMenu.Root mode="click" isOpen={isOpen} onOpen={setIsOpen}>
  {/* ... */}
</ContextMenu.Root>;
```

## Keyboard Navigation

The ContextMenu component provides comprehensive keyboard navigation:

- **Arrow Down/Up**: Navigate between menu items. When menu is first opened, Arrow Down focuses the first available item
- **Arrow Right**: Open submenu (if present)
- **Arrow Left**: Close submenu and return to parent (also closes `SubRoot`)
- **Enter/Space**: Activate/select item (only works when focus is inside the menu)
- **Escape**: Close menu. Focus restoration to trigger is prevented when menu closes due to focus loss
- **Home/End**: Jump to first/last item
- **Type to search**: First-letter navigation (Radix UI feature)

The component automatically tracks focus changes and closes the menu when focus moves outside the menu and its submenus.

### Keyboard Navigation with SubRoot

When using experimental `SubRoot`:

- **Arrow Right**: Opens `SubRoot` menu
- **Arrow Left**: Closes `SubRoot` and focuses parent item trigger
- **Escape**: Closes `SubRoot` menu
- Navigation works seamlessly with parent menu

## Accessibility

The ContextMenu component follows ARIA best practices:

- Proper ARIA roles and attributes
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Proper labeling support

### Accessibility Features

- **ARIA Roles**: Correct roles applied to menu, menuitem, etc.
- **Keyboard Support**: Full keyboard navigation
- **Focus Management**: Proper focus trapping and restoration
- **Labeling**: Support for labels and descriptions
- **Disabled States**: Proper disabled state handling

## Examples

### Basic Menu with Items

```tsx
<ContextMenu.Root mode="click">
  <ContextMenu.Trigger asChild>
    <button>Options</button>
  </ContextMenu.Trigger>

  <ContextMenu.Portal>
    <ContextMenu.Content>
      <ContextMenu.Item>
        <ContextMenu.ItemIcon>
          <EditIcon />
        </ContextMenu.ItemIcon>
        <span>Edit</span>
      </ContextMenu.Item>

      <ContextMenu.Item>
        <ContextMenu.ItemIcon>
          <CopyIcon />
        </ContextMenu.ItemIcon>
        <span>Copy</span>
      </ContextMenu.Item>

      <ContextMenu.Separator />

      <ContextMenu.Item isDanger>
        <ContextMenu.ItemIcon>
          <DeleteIcon />
        </ContextMenu.ItemIcon>
        <span>Delete</span>
      </ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

### Menu with Standard Submenu

```tsx
<ContextMenu.Root mode="hover">
  <ContextMenu.Trigger>
    <button>Menu</button>
  </ContextMenu.Trigger>

  <ContextMenu.Portal>
    <ContextMenu.Content>
      <ContextMenu.Item>Item 1</ContextMenu.Item>

      <ContextMenu.Sub>
        <ContextMenu.SubTrigger>
          <span>Submenu</span>
          <ContextMenu.ItemRightSlot>
            <ChevronRightIcon />
          </ContextMenu.ItemRightSlot>
        </ContextMenu.SubTrigger>

        <ContextMenu.Portal>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Submenu Item 1</ContextMenu.Item>
            <ContextMenu.Item>Submenu Item 2</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Portal>
      </ContextMenu.Sub>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

### Menu with Checkboxes and Radio Groups

```tsx
<ContextMenu.Root mode="click">
  <ContextMenu.Trigger>
    <button>Settings</button>
  </ContextMenu.Trigger>

  <ContextMenu.Portal>
    <ContextMenu.Content>
      <ContextMenu.Label>
        <span>Preferences</span>
      </ContextMenu.Label>

      <ContextMenu.CheckboxItem
        isChecked={notificationsEnabled}
        onChange={(e) => setNotificationsEnabled(e.target.checked)}
      >
        <ContextMenu.ItemIndicator>
          <CheckIcon />
        </ContextMenu.ItemIndicator>
        <span>Enable Notifications</span>
      </ContextMenu.CheckboxItem>

      <ContextMenu.Separator />

      <ContextMenu.Label>
        <span>Theme</span>
      </ContextMenu.Label>

      <ContextMenu.RadioGroup
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <ContextMenu.RadioItem value="light">
          <span>Light</span>
        </ContextMenu.RadioItem>
        <ContextMenu.RadioItem value="dark">
          <span>Dark</span>
        </ContextMenu.RadioItem>
      </ContextMenu.RadioGroup>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

### Complex Menu with Experimental SubRoot

```tsx
const [settings, setSettings] = useState({
  autoupdate: true,
  theme: 'light',
});

<ContextMenu.Root mode="click" enableInnerInputFocus>
  <ContextMenu.Trigger>
    <button>Advanced Menu</button>
  </ContextMenu.Trigger>

  <ContextMenu.Portal>
    <ContextMenu.Content direction="down-right">
      <ContextMenu.Label>
        <span>Workspace</span>
      </ContextMenu.Label>

      <ContextMenu.Item isSelectable={false}>
        <span>
          <b>Workspace:</b> Kommo
        </span>
      </ContextMenu.Item>

      <ContextMenu.Separator />

      <ContextMenu.Item>
        <span>Workspace Settings</span>

        <ContextMenu.ItemRightSlot>
          <ContextMenu.experimental_SubRoot
            mode="hover"
            shouldCloseRootMenuOnSelect
          >
            <ContextMenu.experimental_SubRoot.Trigger
              style={{
                display: 'flex',
                padding: '10px 16px',
                margin: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <SettingsIcon />
            </ContextMenu.experimental_SubRoot.Trigger>

            <ContextMenu.Portal>
              <ContextMenu.experimental_SubRoot.Content
                sideOffset={-5}
                alignOffset={16}
              >
                <ContextMenu.CheckboxItem
                  isChecked={settings.autoupdate}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      autoupdate: e.target.checked,
                    }))
                  }
                  shouldCloseRootMenuOnSelect
                >
                  <ContextMenu.ItemIndicator>
                    <CheckIcon />
                  </ContextMenu.ItemIndicator>
                  <span>Autoupdate</span>
                </ContextMenu.CheckboxItem>

                <ContextMenu.Separator />

                <ContextMenu.Label>
                  <span>Theme</span>
                </ContextMenu.Label>

                <ContextMenu.RadioGroup
                  value={settings.theme}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      theme: e.target.value,
                    }))
                  }
                >
                  <ContextMenu.RadioItem
                    value="light"
                    shouldCloseRootMenuOnSelect
                  >
                    <span>Light</span>
                  </ContextMenu.RadioItem>

                  <ContextMenu.RadioItem
                    value="dark"
                    shouldCloseRootMenuOnSelect
                  >
                    <span>Dark</span>
                  </ContextMenu.RadioItem>
                </ContextMenu.RadioGroup>
              </ContextMenu.experimental_SubRoot.Content>
            </ContextMenu.Portal>
          </ContextMenu.experimental_SubRoot>
        </ContextMenu.ItemRightSlot>
      </ContextMenu.Item>

      <ContextMenu.Arrow />
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>;
```

## Best Practices

1. **Always use Portal**: Wrap `Content` in `Portal` for proper z-index and overflow handling
2. **Provide Labels**: Use `Label` components for better accessibility
3. **Use Separators**: Organize related items with `Separator`
4. **Handle Async Actions**: For async actions, consider keeping menu open until action completes
5. **Test Keyboard Navigation**: Always test keyboard navigation paths
6. **Use Appropriate Modes**: Choose click or hover mode based on use case
7. **SubRoot Experimental**: Only use `SubRoot` when you need its specific capabilities; prefer `Sub` for standard submenus
8. **Animation Awareness**: Consider animation duration when implementing interactions
9. **Focus Management**: Be mindful of focus when using `enableInnerInputFocus`

## Notes

- Animation duration is fixed at `150ms` (internal constant)
- Hover close delay is fixed at `200ms` (internal constant)
- On touch devices, hover mode automatically converts to `click` mode
- Multiple menus can coordinate closure via context menu bus
- SubRoot creates independent menu instances but coordinates with parent context
- Menu automatically closes when focus moves outside the menu and its submenus
- FocusBlocker automatically simulates mouseenter events when removed if cursor was over it
- Non-selectable items are excluded from keyboard navigation and positioning calculations
