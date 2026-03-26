export const COLOR_SCALES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

export const THEMES = ['light', 'dark'] as const;
export const SEMANTIC_GROUPS = ['palette'] as const;
export const PRIMITIVE_KEYS = ['color'] as const;

export type ColorScale = (typeof COLOR_SCALES)[number];
export type Theme = (typeof THEMES)[number];
export type Primitive = (typeof PRIMITIVE_KEYS)[number];

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
