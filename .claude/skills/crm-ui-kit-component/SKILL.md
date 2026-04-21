---
name: crm-ui-kit-component
description: Create a new React component in the crm-react-ui-kit library following the project's conventions (forwardRef, CSS variables theme system, useThemeClassName hook, .props.ts/.themes.ts/.module.css/index.ts files). Use when adding a new component under src/components, scaffolding component files, or asked to create a new UI kit component.
---

# Create a UI Kit Component

This skill scaffolds a new component inside `src/components/<ComponentName>/` following the conventions used by every other component in `crm-react-ui-kit`.

## Required File Structure

Every component MUST have this exact structure:

```
src/components/<ComponentName>/
├── index.ts                  # public exports
├── <ComponentName>.tsx       # forwardRef component
├── <ComponentName>.props.ts  # Props interface + JSDoc
├── <ComponentName>.themes.ts # CSS-variable theme types & presets
└── <ComponentName>.module.css
```

Optional folders are added later via the dedicated skills:

- `__tests__/` — unit + e2e tests
- `__stories__/` — Storybook stories + MDX
- `__image_snapshots__/` — Playwright snapshots (auto-generated)
- `hooks/` — internal hooks if the component is complex (e.g. Button)

## Conventions (MUST follow)

1. The component is exported from `<Name>.tsx` using `forwardRef`. Always set `displayName`.
2. CSS variable names use the prefix `--crm-ui-kit-<component-name>-*`.
3. Theming is applied via the `useThemeClassName<ThemeType>(theme)` hook from `src/hooks/useThemeClassName`.
4. Class names are composed with `classnames` (`import cx from 'classnames';`) and CSS Modules (`import s from './<Name>.module.css';`).
5. Boolean props are prefixed with `is*` (e.g. `isDisabled`, `isLoading`, `isInvalid`, `isCentered`, `isEllipsis`).
6. The `theme` prop is required and typed strictly as the component's theme type.
7. Default values for optional props are destructured inline (`className = '', isDisabled = false`).
8. Rest props (`...rest`) are spread onto the root native element so consumers can pass HTML attributes / data-attrs.
9. Public `index.ts` re-exports: the component, its theme types and theme presets, and props type.
10. Component name in PascalCase, file name matches component name.
11. The root CSS Module class name MUST match the lowercased component name (`s.spinner` for `Spinner`, `s.button` for `Button`, `s.text` for `Text`). Do NOT use a generic `.root`.

## Templates

### `<Name>.tsx`

```tsx
import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { type <Name>Props } from './<Name>.props';
import { type <Name>Theme } from './<Name>.themes';

import s from './<Name>.module.css';

type El = HTML<Tag>Element; // e.g. HTMLDivElement, HTMLButtonElement

export const <Name> = forwardRef<El, <Name>Props>((props, ref) => {
  const {
    className = '',
    theme,
    children,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<<Name>Theme>(theme);

  return (
    <div
      ref={ref}
      className={cx(s.<name>, themeClassName, className)}
      {...rest}
    >
      {children}
    </div>
  );
});

<Name>.displayName = '<Name>';
```

If the component renders a `<button>` / `<input>` / etc., type the element accordingly and also type the props based on `React.DetailedHTMLProps<React.<Tag>HTMLAttributes<...>, ...>`.

### `<Name>.props.ts`

```ts
import React from 'react';

import { type <Name>Theme } from './<Name>.themes';

type Native<Tag>Attributes = React.DetailedHTMLProps<
  React.<Tag>HTMLAttributes<HTML<Tag>Element>,
  HTML<Tag>Element
>;

export interface <Name>Props extends Native<Tag>Attributes {
  /**
   * Object with CSS theme properties.
   */
  theme: <Name>Theme;
  /**
   * <Describe what this prop does, the default value, and its effect.>
   */
  isExample?: boolean;
}
```

JSDoc each prop. Storybook reads it via `react-docgen-typescript` so descriptions show up in the docs.

### `<Name>.themes.ts`

Use a string-literal union as the theme key to enforce the design-token contract:

```ts
type <Name>ThemeKey =
  | '--crm-ui-kit-<name>-color'
  | '--crm-ui-kit-<name>-background-color'
  | '--crm-ui-kit-<name>-border-radius';

export type <Name>Theme = {
  [K in <Name>ThemeKey]: string;
};

const <Name>BaseThemeValues = {
  '--crm-ui-kit-<name>-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
};

export const <Name>PrimaryTheme: <Name>Theme = {
  ...<Name>BaseThemeValues,
  '--crm-ui-kit-<name>-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-<name>-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
};
```

Rules:

- All values reference palette CSS variables defined in `src/stylesheets/theme.css` whenever possible — never hardcode hex colors in default themes.
- Base values shared across presets MUST go through a `<Name>BaseThemeValues` constant (or `<Name>BaseSizesTheme: Omit<<Name>Theme, '<keys-overriden-per-preset>'>` if they cover most of the theme). Do NOT type the base as `Partial<<Name>Theme>` — it forces an `as <Name>Theme` cast on every preset.
- Optional theme keys go into a separate `<Name>ThemeOptionalKey` union and become optional on the theme type (see `Button.themes.ts` for a focus-visible example).
- Export at least one preset (`<Name>PrimaryTheme`). Add more presets following the naming `<Name><Variant>Theme`.

### Commonly used palette variables (do NOT read theme.css)

```text
Text:
  --crm-ui-kit-palette-text-primary          (dark text, default)
  --crm-ui-kit-palette-text-secondary-light  (muted gray)
  --crm-ui-kit-palette-text-secondary-dark

Backgrounds:
  --crm-ui-kit-palette-background-primary    (white / dark card)
  --crm-ui-kit-palette-background-default    (light gray page bg)
  --crm-ui-kit-palette-background-secondary-800  (subtle gray chip/tag)

Borders:
  --crm-ui-kit-palette-border-default
  --crm-ui-kit-palette-border-primary
  --crm-ui-kit-palette-border-error

Accent:
  --crm-ui-kit-palette-active-element-900    (blue, "primary" CTA)
  --crm-ui-kit-color-error                   (red, danger/error)
  --crm-ui-kit-color-white                   (pure white)

Shape:
  --crm-ui-kit-border-radius-default         (4px)
  --crm-ui-kit-disabled-opacity              (0.6)
```

### `<Name>.module.css`

<!-- prettier-ignore -->
```css
.<name> {
  color: var(--crm-ui-kit-<name>-color);
  background-color: var(--crm-ui-kit-<name>-background-color);
  border-radius: var(--crm-ui-kit-<name>-border-radius);
}
```

Use only the CSS variables declared in `<Name>.themes.ts` for any themable property. Static, non-themable styles can be hardcoded.

### `index.ts`

```ts
export { <Name> } from './<Name>';
export {
  type <Name>Theme,
  <Name>PrimaryTheme,
} from './<Name>.themes';
export { type <Name>Props } from './<Name>.props';
```

## Wire the component into the package exports

After scaffolding, add the entry to `package.json` so consumers can import it via `@kommo-crm/crm-react-ui-kit/<Name>`:

1. Add to `exports`:

   ```json
   "./<Name>": "./dist/components/<Name>/index.js",
   "./assets/<Name>.css": "./dist/assets/<Name>.css",
   ```

2. Add to `typesVersions["*"]`:

   ```json
   "<Name>": ["./dist/components/<Name>/index.d.ts"]
   ```

3. Bump the `version` field (minor bump — adding a component is a new feature):

   ```json
   "version": "X.Y+1.0"
   ```

Keep alphabetical/visual grouping consistent with neighbouring entries.

## Workflow

```
- [ ] Confirm the component name (PascalCase) and the root HTML tag
- [ ] Identify theme tokens (colors, sizes, spacing) and decide which are required vs optional
- [ ] Create the 5 files with templates above
- [ ] Replace ALL <Name>, <name>, <Tag>, <tag> placeholders
- [ ] Add entries to package.json (exports + typesVersions)
- [ ] Hand off to crm-ui-kit-unit-test, crm-ui-kit-e2e-test, crm-ui-kit-stories
```

When used as part of `crm-ui-kit-full-component`, do NOT run `yarn lint` after this phase — the orchestrator runs lint once in Phase 6 against the full file set (source + tests + stories + e2e) so prettier violations are resolved in a single pass.

## Reference Components (FALLBACK ONLY)

The templates above are the source of truth — do NOT read these proactively. Open ONE of these files only if the user's request hits a specific edge case the templates don't cover:

| Edge case                                    | File to read (one only)                  |
| -------------------------------------------- | ---------------------------------------- |
| Optional theme keys (e.g. focus-visible)     | `src/components/Button/Button.themes.ts` |
| `VisuallyHiddenInput` form-control wrapping  | `src/components/Switcher/Switcher.tsx`   |
| Internal sub-component (e.g. `<Name>.Label`) | `src/components/Switcher/Switcher.tsx`   |
| Ellipsis / line-clamp via `maxRows`          | `src/components/Text/Text.tsx`           |

Never browse a component's directory in full. Read exactly the one file that the table maps to your edge case.

## Anti-Patterns

- Do NOT hardcode colors / sizes inside `.module.css` — use the CSS variables declared in the theme file.
- Do NOT export themes from `<Name>.tsx`. Themes live in `<Name>.themes.ts`.
- Do NOT use default exports.
- Do NOT add comments explaining what the JSX does — props' JSDoc + reference patterns are enough.
- Do NOT forget `displayName` — required for Storybook and React DevTools.
- Do NOT name the root CSS class `.root` — match the lowercased component name.
