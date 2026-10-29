type ScrollAreaThemeKey =
  | '--crm-ui-kit-scroll-area-scrollbar-size'
  | '--crm-ui-kit-scroll-area-thumb-offset'
  | '--crm-ui-kit-scroll-area-track-background'
  | '--crm-ui-kit-scroll-area-track-border-radius'
  | '--crm-ui-kit-scroll-area-thumb-background'
  | '--crm-ui-kit-scroll-area-thumb-border-radius'
  | '--crm-ui-kit-scroll-area-fade-height'
  | '--crm-ui-kit-scroll-area-fade-top-background'
  | '--crm-ui-kit-scroll-area-fade-bottom-background';

export type ScrollAreaThemeType = {
  [K in ScrollAreaThemeKey]: string;
};

const ScrollAreaBaseThemeValues: Omit<
  ScrollAreaThemeType,
  | '--crm-ui-kit-scroll-area-scrollbar-size'
  | '--crm-ui-kit-scroll-area-thumb-offset'
  | '--crm-ui-kit-scroll-area-track-background'
> = {
  '--crm-ui-kit-scroll-area-track-border-radius':
    'var(--crm-ui-kit-palette-scrollbar-track-border-radius)',
  '--crm-ui-kit-scroll-area-thumb-background':
    'var(--crm-ui-kit-palette-scrollbar-thumb-background)',
  '--crm-ui-kit-scroll-area-thumb-border-radius':
    'var(--crm-ui-kit-palette-scrollbar-thumb-border-radius)',
  '--crm-ui-kit-scroll-area-fade-height': '10px',
  '--crm-ui-kit-scroll-area-fade-top-background':
    'var(--crm-ui-kit-palette-scrollbar-fade-top-background)',
  '--crm-ui-kit-scroll-area-fade-bottom-background':
    'var(--crm-ui-kit-palette-scrollbar-fade-bottom-background)',
};

export const ScrollAreaSurfaceTheme: ScrollAreaThemeType = {
  ...ScrollAreaBaseThemeValues,
  '--crm-ui-kit-scroll-area-scrollbar-size': '8px',
  '--crm-ui-kit-scroll-area-thumb-offset': '0px',
  '--crm-ui-kit-scroll-area-track-background':
    'var(--crm-ui-kit-palette-scroll-area-track-background)',
};

export const ScrollAreaCompactTheme: ScrollAreaThemeType = {
  ...ScrollAreaBaseThemeValues,
  '--crm-ui-kit-scroll-area-scrollbar-size': '6px',
  '--crm-ui-kit-scroll-area-thumb-offset': '1px',
  '--crm-ui-kit-scroll-area-track-background': 'transparent',
};
