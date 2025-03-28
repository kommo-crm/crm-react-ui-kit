export type NumericItemType = {
  /**
   * Theme token key.
   */
  key: string;
  /**
   * Value of the theme token key.
   */
  value: string;
};

export type ColorItemType = {
  /**
   * Theme token key.
   */
  key: string;
  value: {
    /**
     * Color of the token in the `default` theme.
     */
    defaultColor: string;
    /**
     * Color of the token in the `alternative` theme.
     */
    alternativeColor?: string;
    /**
     * Value of the variable being used.
     */
    variableName?: string;
  };
};
