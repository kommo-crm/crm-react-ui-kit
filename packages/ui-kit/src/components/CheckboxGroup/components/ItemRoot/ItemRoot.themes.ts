type ItemRootKey = '--crm-ui-kit-checkbox-group-item-root-disabled-opacity';

export type ItemRootThemeType = {
  [K in ItemRootKey]: string;
};

export const CheckboxGroupItemRootTheme: ItemRootThemeType = {
  '--crm-ui-kit-checkbox-group-item-root-disabled-opacity':
    'var(--crm-ui-kit-disabled-opacity)',
};
