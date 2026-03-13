import { Theme } from '@/types';

export const SCALES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;
export const THEMES = ['light', 'dark'] as const;
export const SEMANTIC_GROUPS = ['palette'] as const;

export const themesConfig: Record<
  Theme,
  { name: string; conditions: string[] }
> = {
  light: {
    name: 'light',
    conditions: [],
  },
  dark: {
    name: 'dark',
    conditions: [
      ":root[data-crm-ui-kit-theme='alternative']",
      ":root[data-color-scheme='dark']",
    ],
  },
};
