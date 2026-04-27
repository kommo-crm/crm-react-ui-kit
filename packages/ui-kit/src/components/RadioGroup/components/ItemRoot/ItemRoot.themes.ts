type ItemRootKey = '--crm-ui-kit-radio-group-item-root-disabled-opacity';

export type ItemRootThemeType = {
  [K in ItemRootKey]: string;
};

export const RadioGroupItemRootTheme: ItemRootThemeType = {
  '--crm-ui-kit-radio-group-item-root-disabled-opacity':
    'var(--crm-ui-kit-disabled-opacity)',
};
