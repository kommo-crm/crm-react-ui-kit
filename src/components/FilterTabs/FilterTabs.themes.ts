type KeyType<T extends string> = {
  [K in T]: string;
};

type FilterTabsThemeKey = '--crm-ui-kit-filter-tabs-spacing';

export type FilterTabsThemeType = KeyType<FilterTabsThemeKey>;

export const FilterTabsTheme: FilterTabsThemeType = {
  '--crm-ui-kit-filter-tabs-spacing': '8px',
};
