type ItemRootKey = '--crm-ui-kit-filter-tabs-item-root-disabled-opacity';

export type ItemRootThemeType = {
  [K in ItemRootKey]: string;
};

export const FilterTabsItemRootTheme: ItemRootThemeType = {
  '--crm-ui-kit-filter-tabs-item-root-disabled-opacity':
    'var(--crm-ui-kit-disabled-opacity)',
};
