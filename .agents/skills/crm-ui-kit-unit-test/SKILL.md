---
name: crm-ui-kit-unit-test
description: Write Jest + React Testing Library unit tests for components in crm-react-ui-kit, following the project's render-helper pattern, role-based queries, and userEvent interactions. Use when adding `<Component>.test.tsx` files under `src/components/<Name>/__tests__/` or asked to write unit tests for a UI kit component.
---

# Write Unit Tests for a UI Kit Component

Unit tests verify behavior (event handlers, state transitions, prop reactions). They do NOT verify visual output — that is the job of the e2e screenshot tests (see `crm-ui-kit-e2e-test`).

## Location & Naming

```
src/components/<Name>/__tests__/<Name>.test.tsx
```

The Jest config (`jest.config.ts`) picks up `<rootDir>/src/**/*.test.(ts|tsx)` and explicitly ignores `.e2e.test.*`. No special configuration per file is needed.

Run:

```bash
yarn test                    # all
yarn test <Name>             # filter
```

## Required Conventions

1. Import from the package `..` (the local `index.ts`), not from individual files:

   ```ts
   import { <Name>, <Name>PrimaryTheme, type <Name>Props } from '..';
   ```

2. Always include `import '@testing-library/jest-dom';` once at the top.
3. Wrap rendering in a `render<Name>` helper that:
   - Accepts `Partial<<Name>Props>` (or `Partial<Omit<...>>` if a prop is forced).
   - Always provides the required `theme` prop (use `<Name>PrimaryTheme` / `<Name>LightTheme`).
   - Sets a stable `role` on the element so it can be queried with `screen.getByRole(...)`.
   - Returns a `jest.fn()` mock (typically the `onChange`/`onClick` handler) for assertions.
   - Wires the mock into the component as `onClick={handleMockFn}` / `onChange={handleMockFn}` so the test actually validates the handler. Returning the mock without wiring it is a silent bug.
4. Use `userEvent` (NOT `fireEvent`) for interactions:

   ```ts
   import userEvent from '@testing-library/user-event';
   await userEvent.click(screen.getByRole('button'));
   ```

5. Prefer role queries (`getByRole`) over `getByTestId`. Use `data-testid` only when role is ambiguous (e.g. `Spinner`).
6. `clearMocks: true` is set globally — no manual `jest.clearAllMocks()` needed.

## Templates

### Form-control component (Checkbox / Switcher / Input pattern)

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { <Name>, <Name>PrimaryTheme, type <Name>Props } from '..';

import '@testing-library/jest-dom';

const render<Name> = (props: Partial<<Name>Props>) => {
  const handleMockFn = jest.fn();

  render(
    <<Name>
      isDefaultChecked={false}
      theme={<Name>PrimaryTheme}
      role="<role>"
      onChange={handleMockFn}
      {...props}
    />
  );

  return handleMockFn;
};

describe('<Name>', () => {
  it('should not call onChange function if disabled', async () => {
    const mockFn = render<Name>({ isDisabled: true });

    await userEvent.click(screen.getByRole('<role>'));

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should call onChange function if clicked', async () => {
    const mockFn = render<Name>({});

    await userEvent.click(screen.getByRole('<role>'));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('should be checked initially and toggle state if clicked', async () => {
    const mockFn = render<Name>({ isDefaultChecked: true });

    const element = screen.getByRole('<role>');

    expect(element).toBeChecked();

    await userEvent.click(element);

    expect(mockFn).toHaveBeenCalled();
    expect(element).not.toBeChecked();
  });
});
```

### Button-like component

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { <Name>, <Name>PrimaryTheme, type <Name>Props } from '..';

import '@testing-library/jest-dom';

const render<Name> = (props: Partial<<Name>Props>) => {
  const handleMockFn = jest.fn();

  render(
    <<Name>
      role="button"
      theme={<Name>PrimaryTheme}
      onClick={handleMockFn}
      {...props}
    >
      Click me
    </<Name>>
  );

  return handleMockFn;
};

describe('<Name>', () => {
  it('should be defined', () => {
    expect(<Name>).toBeDefined();
  });

  it('should call onClick when clicked', async () => {
    const mockFn = render<Name>({});

    await userEvent.click(screen.getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const mockFn = render<Name>({ isDisabled: true });

    await userEvent.click(screen.getByRole('button'));

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should not call onClick when loading', async () => {
    const mockFn = render<Name>({ isLoading: true });

    await userEvent.click(screen.getByRole('button'));

    expect(mockFn).not.toHaveBeenCalled();
  });
});
```

### Display-only component (Spinner / Text pattern)

For visual-only components there is little behavior to test. Cover smoke + className composition:

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';

import { type <Name>Props, <Name>, <Name>PrimaryTheme } from '..';

import '@testing-library/jest-dom';

const dataTestId = '<name>';

const render<Name> = (props: Partial<<Name>Props>) =>
  render(
    <<Name> data-testid={dataTestId} theme={<Name>PrimaryTheme} {...props} />
  );

describe('<Name>', () => {
  it('should be defined', () => {
    expect(<Name>).toBeDefined();
  });

  it('should apply custom span properties', () => {
    const className = 'my-class';

    render<Name>({ className });

    const element = screen.getByTestId(dataTestId);

    expect(element).toHaveClass(className);
    /**
     * 1. Module className
     * 2. Theme className
     * 3. Additional class `my-class`
     */
    expect(element.classList).toHaveLength(3);
  });

  // Add this test only if the component accepts children:
  it('should render children', () => {
    render<Name>({ children: 'Test label' });

    expect(screen.getByTestId(dataTestId)).toHaveTextContent('Test label');
  });
});
```

**Critical: self-closing form in the helper**

The render helper above uses a self-closing tag (`... {...props} />`). This is mandatory for components that accept `children`. If you write:

```tsx
// WRONG — hardcoded children override props.children silently:
render(<Name> data-testid={dataTestId} theme={<Name>PrimaryTheme} {...props}>hardcoded</<Name>>)
```

Always use the self-closing form so `renderHelper({ children: 'text' })` works correctly.

## What to cover (checklist)

```
- [ ] Component is defined / can be rendered
- [ ] Each user interaction (click, type, focus) triggers the right handler (happy path)
- [ ] Disabled / loading / read-only states block handlers
- [ ] Initial controlled / uncontrolled state is respected (isChecked vs isDefaultChecked)
- [ ] Boolean props that change semantics (isInvalid, isLoading, etc.) are reflected in the DOM (use toBeChecked, toBeDisabled, toHaveAttribute, toHaveClass)
- [ ] Refs are forwarded (only if the component does non-trivial ref work, e.g. Button's showSuccessfulStateRef)
```

## What NOT to do

- Do NOT snapshot the rendered HTML — visual regressions belong to e2e (`*.e2e.test.tsx`).
- Do NOT test CSS values or computed styles — JSDOM does not compute them and the theme classNames are dynamic (`crm-ui-kit-theme-<nanoid>`).
- Do NOT assert on the dynamic theme className string. If you assert `classList.length`, comment why each class is expected (see Spinner template).
- Do NOT use `fireEvent` when `userEvent` covers the interaction.
- Do NOT add custom Jest setup files or per-file mocks — `clearMocks: true` and css-modules transform are already configured.
- Do NOT return a `jest.fn()` from the helper without wiring it as a prop on the component — the negative tests (`not.toHaveBeenCalled`) will pass trivially and miss real bugs.

## Reference Examples (FALLBACK ONLY)

The three templates above cover ~95 % of cases. Open one of these files only if the user's component has a specific behavior not covered above (e.g. ref-driven success state, `MutationObserver`-based assertions). Read exactly ONE file, not the whole directory.

| Edge case                                          | File to read (one only)                               |
| -------------------------------------------------- | ----------------------------------------------------- |
| Ref-driven imperative state (success animation)    | `src/components/Button/__tests__/Button.test.tsx`     |
| Form control with `isInvalid` + controlled toggle  | `src/components/Checkbox/__tests__/Checkbox.test.tsx` |
| Internal `<Name>.Label` sub-component testing      | `src/components/Switcher/__tests__/Switcher.test.tsx` |
| className composition assertion on display element | `src/components/Spinner/__tests__/Spinner.test.tsx`   |
