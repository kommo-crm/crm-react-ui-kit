export type ThemeConfig = {
  primitives: Record<string, unknown>;
  semantic: Record<string, unknown>;
  conditions?: string[];
};

export type Theme = 'light' | 'dark';
