# `Button` Component

A themed button component with support for loading, success, and invalid states, icons, and external highlight control via `data-highlighted`.

## Data Attributes (Public API)

### `data-highlighted`

The Button treats `data-highlighted` as a public contract for external highlight control. When this attribute is present on the `<button>` element, the button renders in its **hover state** (using `--crm-ui-kit-button-hover-*` theme variables), regardless of whether the cursor is actually over it.

This is useful when the button is embedded in a compound component (e.g., a dropdown trigger) that needs to keep the button visually highlighted while its associated panel is open.

**Example — custom dropdown trigger:**

```tsx
function DropdownTrigger({ isOpen, children }) {
  return (
    <Button
      theme={ButtonNeutralTheme}
      data-highlighted={isOpen ? '' : undefined}
    >
      {children}
    </Button>
  );
}
```

**How it works internally:**

```css
/* Button applies hover styles for both :hover and [data-highlighted] */
.button:not(.disabled):not(.loading):hover,
.button:not(.disabled):not(.loading)[data-highlighted] {
  color: var(--crm-ui-kit-button-hover-color);
  background: var(--crm-ui-kit-button-hover-background-color);
  /* ... */
}
```

**Integration with ContextMenu:**

When a Button is used as a `ContextMenu.Trigger` child, the trigger component sets `data-highlighted` on the button when the menu is open or hovered. No additional CSS is needed — the button's own theme handles the visual state.

```tsx
<ContextMenu.Root mode="click">
  <ContextMenu.Trigger asChild>
    <Button theme={ButtonIconGhostTheme}>
      <TriggerIcon />
    </Button>
  </ContextMenu.Trigger>

  {/* ... */}
</ContextMenu.Root>
```
