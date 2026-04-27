---
name: crm-ui-kit-stories
description: Write Storybook 8 stories (.stories.tsx + .mdx) for crm-react-ui-kit components — including the meta with title/USAGE snippet, controlled/uncontrolled stories, hidden per-theme stories tagged !dev, and a Themes.mdx with ThemeVisualization. Use when adding `<Component>.stories.tsx`, `<Component>.mdx`, or `Themes.mdx` files under `src/components/<Name>/__stories__/`.
---

# Write Storybook Stories for a UI Kit Component

## Files to create

```
src/components/<Name>/__stories__/
├── <Name>.stories.tsx   # Stories + meta (CSF3)
├── <Name>.mdx           # Auto docs page using the Default story
└── Themes.mdx           # One ThemeVisualization block per theme preset
```

Run Storybook:

```bash
yarn storybook
```

## Required Conventions

1. CSF3 + `satisfies Meta<typeof <Name>>`. Type stories as `StoryObj<typeof meta>`.
2. `meta.title`:
   - Components → `'Components/<Name>'`.
   - Typography primitives → `'Typography/<Name>'`.
   - Themes pages live under `'<Section>/<Name>/Themes'` — set in the MDX `<Meta title>`.
3. Always use `i18n.t('...')` for any user-visible string (`import { i18n } from '@i18n';`).
4. Always include a `USAGE` constant (multi-line backtick string) and pass it through `parameters.docs.source`. Use the public package import path:

   ```
   import { <Name>, <Name>PrimaryTheme } from '@kommo-crm/crm-react-ui-kit/<Name>';
   ```

5. Always set `parameters: { ...CanvasCentered }` (from `@storybook-utils/constants`).
6. Per-theme stories that exist only to feed `Themes.mdx` MUST be tagged `tags: ['!dev']` so they are hidden from the sidebar.
7. For form controls (Switcher, Checkbox), wrap renders in `LabelWrapper` from `@storybook-utils/components` and use `useArgs` to sync `isChecked` back to controls (controlled story pattern).
8. Use `argTypes`:
   - For enum-like props (`size`, `theme`, icon slots) declare `control: 'select'`, `options`, and `mapping` from a local map object.
   - To hide ref props from the table: `{ table: { disable: true } }`.
9. Themes referenced from JSX MUST be passed through a local `themeMap` / `ThemesMap` so they can be selected via the `select` control.

## Templates

### `<Name>.stories.tsx` — display component (Spinner / Text style)

No `import React from 'react'` — this file has no `render` functions, and the modern JSX transform handles it. Add `import React from 'react'` ONLY if you add a story with an inline `render: (props) => <JSX />` function.

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import {
  <Name>,
  <Name>PrimaryTheme,
  <Name>SecondaryTheme,
} from '..';

const themeMap = {
  <Name>PrimaryTheme,
  <Name>SecondaryTheme,
};

const USAGE = `
import { <Name>, <Name>PrimaryTheme } from '@kommo-crm/crm-react-ui-kit/<Name>';

function App() {
  return (
    <<Name> theme={<Name>PrimaryTheme}>
      ${i18n.t('<Name>')}
    </<Name>>
  );
}
`;

const meta = {
  title: 'Components/<Name>',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: <Name>,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
  },
  args: {
    children: i18n.t('<Name>'),
    theme: <Name>PrimaryTheme,
  },
} satisfies Meta<typeof <Name>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const <Name>Primary: Story = {
  tags: ['!dev'],
  args: { theme: <Name>PrimaryTheme },
};

export const <Name>Secondary: Story = {
  tags: ['!dev'],
  args: { theme: <Name>SecondaryTheme },
};
```

### `<Name>.stories.tsx` — form-control with controlled/uncontrolled split (Switcher / Checkbox style)

```tsx
import React from 'react';
import { type Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import { CanvasCentered } from '@storybook-utils/constants';
import { LabelWrapper } from '@storybook-utils/components';

import { i18n } from '@i18n';

import { <Name>, <Name>PrimaryTheme } from '..';

const USAGE = `
import { useState } from 'react';
import {
  <Name>,
  <Name>PrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/<Name>';

function App() {
  const [checked, setChecked] = useState(false);
  return (
    <<Name>
      isChecked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      theme={<Name>PrimaryTheme}
    />
  );
}
`;

const meta = {
  title: 'Components/<Name>',
  parameters: {
    ...CanvasCentered,
    docs: { source: { code: USAGE, language: 'jsx' } },
  },
  component: <Name>,
  args: {
    theme: <Name>PrimaryTheme,
    onChange: action('onChange'),
  },
  render: (props) => {
    const [, setArgs] = useArgs();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e);
      if (!('isDefaultChecked' in props)) {
        setArgs({ isChecked: e.target.checked });
      }
    };

    return (
      <LabelWrapper Component={<Name>.Label} isCentered textPlacement="right">
        <<Name> {...props} onChange={handleChange} />
      </LabelWrapper>
    );
  },
} satisfies Meta<typeof <Name>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { isChecked: false } };

export const Uncontrolled: Story = { args: { isDefaultChecked: true } };

export const States: Story = {
  args: { isDefaultChecked: false },
  render: (props) => (
    <div>
      <LabelWrapper
        Component={<Name>.Label}
        text={i18n.t('Disabled')}
        textPlacement="right"
      >
        <<Name> {...props} isDisabled />
      </LabelWrapper>
      <LabelWrapper
        Component={<Name>.Label}
        text={i18n.t('Checked')}
        textPlacement="right"
      >
        <<Name> theme={props.theme} isDefaultChecked />
      </LabelWrapper>
    </div>
  ),
};
```

### `<Name>.mdx` (auto-docs page)

```mdx
import { Title, Meta, Canvas, Controls } from '@storybook/blocks';
import { CodeBlock } from '@storybook-utils/components';
import * as <Name>Stories from './<Name>.stories';
import { i18n } from '@i18n';
import ReactMarkdown from 'react-markdown';

<Meta of={<Name>Stories} />

<Title><Name></Title>

<Canvas of={<Name>Stories.Default} />

<ReactMarkdown>{'## ' + i18n.t('Usage')}</ReactMarkdown>

<CodeBlock of={<Name>Stories.Default} />

<ReactMarkdown>{'## ' + i18n.t('Props')}</ReactMarkdown>

<Controls />
```

### `Themes.mdx`

One `## <ThemeName>` + import snippet + `<ThemeVisualization>` block per theme preset. The `of={...}` references the per-theme `!dev` story.

````mdx
import { Title, Meta } from '@storybook/blocks';
import * as <Name>Stories from './<Name>.stories';
import { ThemeVisualization } from '@storybook-utils/components';
import {
  <Name>PrimaryTheme,
  <Name>SecondaryTheme,
} from '..';
import { i18n } from '@i18n';

<Meta title="Components/<Name>/Themes" of={<Name>Stories} />

<Title>{i18n.t('Themes')}</Title>

## <Name>PrimaryTheme

```jsx
import { <Name>PrimaryTheme } from '@kommo-crm/crm-react-ui-kit/<Name>';
```

<ThemeVisualization theme={<Name>PrimaryTheme} of={<Name>Stories.<Name>Primary} />

## <Name>SecondaryTheme

```jsx
import { <Name>SecondaryTheme } from '@kommo-crm/crm-react-ui-kit/<Name>';
```

<ThemeVisualization theme={<Name>SecondaryTheme} of={<Name>Stories.<Name>Secondary} />
````

For Typography components, use `<Meta title="Typography/Themes" of={...} />` (see `src/components/Text/__stories__/Themes.mdx`).

## Story design checklist

```
- [ ] Default story (minimal args, all controls visible)
- [ ] One demonstrative story per axis of variation:
       - Sizes / Variants — render all options side by side
       - Ellipsis / Loading / Disabled / Error states
       - Icons, "before"/"after" slots
       - Refs-driven behavior (Refs story pattern, see Button.stories)
- [ ] One !dev-tagged story per theme preset (consumed by Themes.mdx)
- [ ] argTypes: select+mapping for enum props, table.disable for refs
- [ ] All visible strings go through i18n.t(...)
- [ ] USAGE snippet matches the actual public API
```

## Reference Examples (FALLBACK ONLY)

The templates above cover Default + per-theme + Themes.mdx for every standard component. Open one of these files only if the user's component needs a specific story shape not covered above. Read exactly ONE file.

| Edge case                                                                | File to read (one only)                                    |
| ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Side-by-side Sizes story rendering all options                           | `src/components/Text/__stories__/Text.stories.tsx`         |
| Form-control controlled/uncontrolled split + Label                       | `src/components/Switcher/__stories__/Switcher.stories.tsx` |
| Ref-driven `Refs` story / icon slots / `argTypes` mapping for icon enums | `src/components/Button/__stories__/Button.stories.tsx`     |
| Minimal `data-testid` display story                                      | `src/components/Spinner/__stories__/Spinner.stories.tsx`   |

## Anti-Patterns

- Do NOT export the per-theme stories without `tags: ['!dev']` — the sidebar gets noisy.
- Do NOT pass theme objects directly into `args` of the `select` control without registering them in `argTypes.theme.mapping` — the picker will break.
- Do NOT hardcode strings; use `i18n.t(...)` so localization tooling picks them up.
- Do NOT define a `theme` `args` value as a string — it must be the actual theme object (mapping handles the picker).
- Do NOT omit the `USAGE` snippet — it powers the docs source code block.
- Do NOT add `Themes.mdx` references to stories that lack `tags: ['!dev']`; create the dedicated story.
- Do NOT add `import React from 'react'` to story files that don't use inline JSX in render functions — the modern JSX transform handles it.
