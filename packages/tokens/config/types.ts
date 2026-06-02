export interface ThemeConfig {
  /** CSS selector scoping the semantic tokens for this theme */
  selector: string;
  /** Path to the JSON token file for this theme */
  source: string;
}

export interface TokensConfig {
  /**
   * CSS variable and JS export prefix.
   * '' → no prefix: --color-blue-400
   * 'crm-ui-kit' → --crm-ui-kit-color-blue-400
   */
  prefix: string;
  /** Theme map. Key = theme name, used as the output filename in dist */
  themes: Record<string, ThemeConfig>;
}
