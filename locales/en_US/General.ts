export default {
  /* Used in sidebar */
  'Docs': 'Docs',
  'Usage': 'Usage',
  'Themes': 'Themes',
  'Typography': 'Typography',
  'Components': 'Components',
  'Default': 'Default',
  'Sizes': 'Sizes',
  'Ellipsis': 'Ellipsis',
  'Loading': 'Loading',
  'Icons': 'Icons',
  'Refs': 'Refs',
  'Uncontrolled': 'Uncontrolled',
  'Checked Styles': 'Checked Styles',
  'States': 'States',
  'Vertical': 'Vertical',
  'Multi Select': 'Multi Select',
  'Invalid Placement': 'Invalid Placement',
  'Group': 'Group',
  'With Description': 'With Description',
  'With Icons': 'With Icons',
  'Centered': 'Centered',
  'Custom Themes': 'Custom Themes',
  'Autosize': 'Autosize',
  'Directions': 'Directions',
  'Modes': 'Modes',
  'Vertical Menu': 'Vertical Menu',

  /* Used in docs */
  'Design tokens': 'Design tokens',
  'Numeric values': 'Numeric values',
  'Name': 'Name',
  'Value': 'Value',
  'Props': 'Props',
  'Parameters': 'Parameters',
  'Component logic': 'Component logic',
  'Page markup': 'Page markup',
  'Theme details': 'Theme details',

  /* Components */

  /* Text */
  'Plain text': 'Plain text',
  'Long text that will be truncated.': 'Long text that will be truncated.',

  /* Button */
  'Go to Dashboard': 'Go to Dashboard',
  'Success Ref': 'Success Ref',
  'Invalid Ref': 'Invalid Ref',
  'Data Attributes (Public API)': 'Data Attributes (Public API)',
  'button-data-highlighted-description':
    'The Button treats `data-highlighted` as a public contract for external highlight control. When this attribute is present on the `<button>` element, the button renders in its **hover state** (using `--crm-ui-kit-button-hover-*` theme variables), regardless of whether the cursor is actually over it.',
  'button-data-highlighted-usage':
    'This is useful when the button is embedded in a compound component (e.g., a dropdown trigger) that needs to keep the button visually highlighted while its associated panel is open.',

  /* Checkbox */
  'Mark': 'Mark',
  'Indeterminate': 'Indeterminate',
  'Disabled': 'Disabled',
  'Invalid': 'Invalid',
  'Check': 'Check',

  /* CheckboxGroup */
  'Select All': 'Select All',
  'Left': 'Left',
  'Top': 'Top',
  'Right': 'Right',

  /* FilterTabs */
  'One': 'One',
  'Two': 'Two',
  'Three': 'Three',
  'Four': 'Four',

  /* Label */
  'How can our partners help you?': 'How can our partners help you?',
  'Tell us about yourself': 'Tell us about yourself',
  'Provide more information': 'Provide more information',
  'Label text': 'Label text',
  'Minimize chat apps within a single button':
    'Minimize chat apps within a single button',

  /* Select */
  'Really very long option':
    'Really very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong option',
  'Custom items with icons': 'Custom items with icons',
  'With preselected item': 'With preselected item',
  'With Placeholder': 'With Placeholder',
  'Option': 'Option',

  /* Switcher */
  'Checked': 'Checked',
  'Click me': 'Click me',

  /* TextArea */
  'Required field': 'Required field',

  /* ContextMenu */
  'contextmenu-data-attrs-intro':
    'ContextMenu exposes several `data-*` attributes on rendered DOM elements. These attributes serve as a public contract: external code can rely on them for styling, testing, and integration with other components.',
  'contextmenu-trigger-highlighted-presence':
    'When the menu is **open** or trigger is **hovered**',
  'contextmenu-trigger-highlighted-desc':
    "Indicates the trigger is in an active state. Useful for keeping the trigger visually highlighted while the menu is open. When a `Button` is used as a child with `asChild`, the button's own `:hover / [data-highlighted]` styles apply automatically.",
  'contextmenu-presence-always': '**Always**',
  'contextmenu-item-data-item-desc':
    'Marker attribute present on every item. Used internally for keyboard navigation and auto-positioning logic. Can also be used in tests and selectors to target menu items.',
  'contextmenu-presence-focused-or-submenu':
    'When the item is **focused/hovered** or its **submenu is open**',
  'contextmenu-item-highlighted-desc':
    'Standard Radix highlight attribute. Indicates the item is currently active — either by mouse hover, keyboard focus, or because a child submenu (`SubRoot`) is open.',
  'contextmenu-presence-non-selectable': 'When `isSelectable={false}`',
  'contextmenu-item-non-selectable-desc':
    "Present on non-selectable items. These items are excluded from keyboard navigation cycle and auto-positioning calculations. They don't close the menu on click.",
  'contextmenu-checkbox-data-item-desc':
    'Same marker as `Item`. Present on every checkbox item for keyboard navigation and positioning.',
  'contextmenu-checkbox-highlighted-desc':
    'Same behavior as `Item`. Active when highlighted or when a child `SubRoot` is open inside this checkbox item.',
  'contextmenu-radio-data-item-desc':
    'Same marker as `Item`. Present on every radio item for keyboard navigation and positioning.',
  'contextmenu-radio-highlighted-desc':
    'Same behavior as `Item`. Active when highlighted or when a child `SubRoot` is open inside this radio item.',
  'contextmenu-subtrigger-data-item-desc':
    'Marker attribute, same as `Item`. Allows SubTrigger to participate in the keyboard navigation cycle.',
  'contextmenu-subtrigger-highlighted-presence':
    'When the **sub is open** or item is **highlighted**',
  'contextmenu-subtrigger-highlighted-desc':
    'Keeps the trigger visually active while its submenu is shown, or when hovered/focused.',
  'contextmenu-subtrigger-submenu-trigger-desc':
    'Internal marker identifying this element as a submenu trigger. Used by `ItemRightSlot` and `useSubMenu` to detect nested submenus.',
  'contextmenu-subroot-highlighted-presence':
    'When the **SubRoot is open** or item is **highlighted**',
  'contextmenu-subroot-highlighted-desc':
    'Keeps the trigger visually active while its SubRoot menu is shown.',
  'contextmenu-subroot-submenu-trigger-desc':
    'Same marker as `SubTrigger`. Identifies this element as a submenu trigger for internal detection by `ItemRightSlot` and `useSubMenu`.',
  'contextmenu-content-menu-level-value':
    'Number (`1` for root, `2+` for nested)',
  'contextmenu-content-menu-level-desc':
    'Indicates the nesting depth of the menu. Root content is level `1`, each `SubContent` or `SubRoot.Content` increments by one. Used internally for focus-loss detection to determine which menus are open.',
  'contextmenu-focusblocker-blocker-desc':
    'Internal marker on the overlay that blocks pointer/focus events in the parent menu while a `SubRoot` submenu is open. Primarily used internally; rarely needed by consumers.',
  'Profile': 'Profile',
  'User ID': 'User ID',
  'Settings': 'Settings',
  'Theme': 'Theme',
  'Light': 'Light',
  'Dark': 'Dark',
  'Lead': 'Lead',
  'Edit': 'Edit',
  'Delete': 'Delete',
  'Export to PDF': 'Export to PDF',
  'Enable notifications': 'Enable notifications',
  'Hover me': 'Hover me',
};
