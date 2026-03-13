import { Theme } from '@/types/common';

export const SCALES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;
export const THEMES = ['light', 'dark'] as const;
export const SEMANTIC_GROUPS = ['palette'] as const;

export type PrimitiveGroupConfig = {
  /** Key in the `primitives` object */
  key: string;
  /** CSS variable prefix, e.g. `color` → `--color-light-azure-50` */
  prefix: string;
  /**
   * Whether the primitive has per-theme sub-objects
   * (e.g. `primitives.color.light` / `primitives.color.dark`)
   */
  themeVariant: boolean;
  /**
   * Whether values inside families are indexed by numeric SCALES.
   * `true`  → `--{prefix}-{themeId}-{family}-{scale}: value`
   * `false` → flattened with flattenVars → `--{prefix}-{key}: value`
   */
  scaled: boolean;
};

export const PRIMITIVE_GROUPS: PrimitiveGroupConfig[] = [
  {
    key: 'color',
    prefix: 'color',
    themeVariant: true,
    scaled: true,
  },
];

export const themesConfig: Record<
  Theme,
  { name: string; conditions?: string[] }
> = {
  light: {
    name: 'light',
  },
  dark: {
    name: 'dark',
    conditions: [
      ":root[data-crm-ui-kit-theme='alternative']",
      ":root[data-color-scheme='dark']",
    ],
  },
};
