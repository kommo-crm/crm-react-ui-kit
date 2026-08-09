export interface ThemeConfig {
  /** CSS selector scoping the semantic tokens for this theme */
  selector: string;
  /** Path to the JSON token file for this theme */
  source: string;
  /**
   * CSS variable and JS export prefix for this theme.
   * '' → no prefix: --color-blue-400
   * 'crm-ui-kit' → --crm-ui-kit-color-blue-400
   * @default ''
   */
  prefix?: string;
}

export interface TokensConfig {
  /** Theme map. Key = theme name, used as the output filename in dist */
  themes: Record<string, ThemeConfig>;
  /**
   * Exact set of CSS variable names allowed in the primitives build —
   * checked against dist/css/primitives.min.css after generation.
   * The check fails on both missing AND extra variables, so every new
   * primitive token must be added here or the build breaks.
   * Example: ["--color-light-blue-500", "--color-light-neutral-50"]
   */
  requiredTokens?: string[];
}
