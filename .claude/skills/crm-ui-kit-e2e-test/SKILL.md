---
name: crm-ui-kit-e2e-test
description: Write Playwright Component Testing visual e2e tests for crm-react-ui-kit components, including the playground file and the prop-cartesian screenshot test. Use when adding `<Component>.e2e.test.tsx` and `<Component>.e2e-playground.tsx` files under `src/components/<Name>/__tests__/`, generating image snapshots, or asked to write/update visual regression tests.
---

# Write E2E (Visual) Tests for a UI Kit Component

The library uses `@playwright/experimental-ct-react` to mount components and compare cropped screenshots across:

- 2 appearances (`Appearance.DEFAULT`, `Appearance.ALTERNATIVE`)
- 5 device profiles (android-chromium, ios-webkit, web-chromium, web-firefox, web-webkit)

A test is a Cartesian combination of props rendered through a thin "playground" wrapper, then screenshotted with the `expectScreenshotClippedToContent` fixture.

## Files to create

```
src/components/<Name>/__tests__/
├── <Name>.e2e-playground.tsx   # Playground wrappers — one per visual variant (theme)
└── <Name>.e2e.test.tsx         # Tests — multiCartesian + describe/test loops
```

Snapshots will be written to `src/components/<Name>/__image_snapshots__/` automatically by:

```bash
yarn test:e2e:update-snapshots
yarn test:e2e:update-snapshots -- -g "<Name>"   # filter — MUST use -g, not --grep
```

`scripts/generate_env.docker.sh` parses only `-g`; `--grep` is silently dropped and the run fans out to the full suite, which can abort with `unexpected EOF` partway and leave orphan PNGs for `<Name>` behind. If that happens, delete `src/components/<Name>/__image_snapshots__/` and retry with `-g`.

Run-only:

```bash
yarn test:e2e
```

The Playwright config (`playwright-ct.config.ts`) targets `**/*.e2e.test.tsx`.

## Required Conventions

1. Import `test` from the project's extended fixture, not Playwright directly:

   ```ts
   import { test } from '@crm-react-ui-kit-e2e/test';
   ```

2. Build prop combinations with `multiCartesian<<Name>Props>([...])` from `src/tests/e2e/utils`. Multiple objects in the array are concatenated, not multiplied — use this to skip impossible combinations.
3. Test labels come from `prettyProps(props)`. NEVER hand-write a label.
4. Each visual variant (i.e. each theme preset) gets its own `test.describe('<Name> <Variant>', ...)` block. The describe name is what appears in snapshot folder names — keep it human-readable and stable.
5. Inside a test, always:
   - `await mount(<Playground appearance={appearance} props={props} />)`
   - `await expectScreenshotClippedToContent()`
6. Playground wrappers go through `ComponentPlayground` so `appearance`, `ConfigProvider`, and a debug header showing props are wired automatically.
7. The `theme` prop is set INSIDE the playground (the component's variant), not in the test cartesian. Keep `<Name>Props` cartesian to behavioral/state props (`isDisabled`, `isLoading`, `isInvalid`, `isChecked`, `size`, etc.).

## Templates

### `<Name>.e2e-playground.tsx`

```tsx
import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  <Name>,
  <Name>PrimaryTheme,
  <Name>SecondaryTheme,
  type <Name>Props,
} from '..';

export const <Name>PrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<<Name>Props>) => (
  <ComponentPlayground<<Name>Props> appearance={appearance} props={props}>
    {(p) => (
      <<Name> {...p} theme={<Name>PrimaryTheme}>
        <Name>
      </<Name>>
    )}
  </ComponentPlayground>
);

export const <Name>SecondaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<<Name>Props>) => (
  <ComponentPlayground<<Name>Props> appearance={appearance} props={props}>
    {(p) => (
      <<Name> {...p} theme={<Name>SecondaryTheme}>
        <Name>
      </<Name>>
    )}
  </ComponentPlayground>
);
```

Notes:

- Add ONE `<Name><Variant>PlaygroundItem` per theme preset.
- For form controls without children (`Switcher`, `Checkbox`), pass nothing as children but optionally wrap in `<div>` to give the snapshot some padding/positioning context (see `Switcher.e2e-playground.tsx`).
- For absolutely positioned content (e.g. `Spinner` with `isCentered`), wrap in a relative-positioned `div` of fixed size so the screenshot has bounds (see `Spinner.e2e-playground.tsx`).
- For ellipsis/clamp tests on `Text`, set a fixed `width` style on the component so overflow can occur.

### `<Name>.e2e.test.tsx`

```tsx
import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from 'src/tests/e2e/utils';

import { type <Name>Props } from '..';

import {
  <Name>PrimaryPlaygroundItem,
  <Name>SecondaryPlaygroundItem,
} from './<Name>.e2e-playground';

export const combinations = multiCartesian<<Name>Props>([
  {
    isDisabled: [true, false],
    isInvalid: [true, false],
  },
]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('<Name> Primary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <<Name>PrimaryPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });

  test.describe('<Name> Secondary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <<Name>SecondaryPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
```

## Choosing prop combinations

### Display components with no behavioral props

If the component has NO behavioral props that change visuals (pure display, no `isDisabled`, no `size`, etc.), pass a single empty object:

```ts
export const combinations = multiCartesian<BadgeProps>([{}]);
```

This produces exactly one test per describe block (one snapshot per theme × appearance × device). `prettyProps({})` returns an empty string — that's fine for a smoke test.

---

`multiCartesian` accepts an ARRAY of orthogonal prop sets — each element is `cartesian`-expanded independently and the results concatenated. Use this to:

- Cover the default state cleanly: `{ isDisabled: [false, true], isLoading: [false, true] }`.
- Add a separate sparse axis without exploding the matrix (e.g. only test `isInvalid: true` while keeping `isDisabled` axis):

  ```ts
  multiCartesian<<Name>Props>([
    { isDisabled: [false, true], isDefaultChecked: [true, false] },
    { isInvalid: [true], isDisabled: [false, true], isDefaultChecked: [true, false] },
  ]);
  ```

- Split by groups of related props. See `Button.e2e.test.tsx` (state matrix vs icon-only matrix vs icon-button-only matrix).

Guidelines:

- Use `undefined` explicitly to cover the "prop not passed" branch when it differs from `false` (see `Text.e2e.test.tsx` — `maxRows: [undefined, 2]`).
- DO NOT include the `theme` prop in the cartesian — themes are encoded by separate playground wrappers / describe blocks.
- DO NOT include `children` in the cartesian — set them inside the playground.
- Keep total snapshots reasonable. Each combination produces `variants × appearances(2) × devices(5)` images.

### Adding non-prop variants (icons, ref-driven state)

For composed visuals (icons, ref-triggered states), define static maps inside the playground or import from `@storybook-utils/constants` (see `IconsMap` in `Button.e2e.test.tsx`). Keep them out of the cartesian if they're constant per describe block; include them as a prop when they vary.

## Snapshot file naming

Snapshots are named via `getSnapshotFileName` (in `src/tests/e2e/index.playwright.ts`):

```
__image_snapshots__/<platform>/<browser>/<appearance>/<describe-name>-<hashedProps>.png
```

You don't pass a name yourself — it's derived from `test.describe` title + `prettyProps`. This is why `describe` titles must be unique and stable.

## Workflow

```
- [ ] List the theme presets exported by <Name>.themes.ts
- [ ] Create one `<Name><Variant>PlaygroundItem` per preset
- [ ] Identify behavioral / state props that change visuals (isDisabled, isLoading, size, ...)
- [ ] Build the multiCartesian. Split into separate prop-sets to avoid impossible combos.
- [ ] Write a `test.describe` block per playground variant
- [ ] Generate snapshots: yarn test:e2e:update-snapshots -- -g "<Name>"
- [ ] Verify generated images under src/components/<Name>/__image_snapshots__/
- [ ] Commit both source AND snapshot files
```

## Reference Examples (FALLBACK ONLY)

The templates above cover the standard playground + cartesian shape. Open one of these files only if the user's component has a non-standard prop matrix not covered above. Read exactly ONE file.

| Edge case                                           | File to read (one only)                                       |
| --------------------------------------------------- | ------------------------------------------------------------- |
| Width-bounded ellipsis snapshot                     | `src/components/Text/__tests__/Text.e2e-playground.tsx`       |
| State matrix split into multiple orthogonal groups  | `src/components/Button/__tests__/Button.e2e.test.tsx`         |
| Sparse axis (e.g. `isInvalid` only on a sub-matrix) | `src/components/Checkbox/__tests__/Checkbox.e2e.test.tsx`     |
| Absolute-positioned content needing a wrapper div   | `src/components/Spinner/__tests__/Spinner.e2e-playground.tsx` |

## Anti-Patterns

- Do NOT call `page.screenshot()` directly — always use `expectScreenshotClippedToContent` so cropping & font-loading wait are handled.
- Do NOT add `await page.waitForTimeout(...)` — the helper already handles webkit's bounding-rect quirk.
- Do NOT wrap the test in arbitrary `if (browserName === ...)` branches; keep tests deterministic across projects.
- Do NOT include `children` or `theme` in the prop cartesian — they belong in the playground.
- Do NOT manually name snapshot files.
