import { create } from '@storybook/theming';

import { Appearance } from '../../../src';

const { window: globalWindow } = global;

const fontProps = {
  fontBase: 'PT Sans, Nunito Sans, sans-serif',
  fontCode: 'monospace',
};

const brandingProps = {
  brandTitle: 'Kommo Storybook',
  brandUrl: 'https://developers.kommo.com/docs/kommo-for-developers',
  brandTarget: '_blank',
};

const darkTheme = create({
  base: 'dark',
  ...fontProps,
  ...brandingProps,
  brandImage: '/img/logoLight.svg',
});

const lightTheme = create({
  base: 'light',
  ...fontProps,
  ...brandingProps,
  brandImage: '/img/logoDark.svg',
});

const getPreferredColorScheme = () => {
  if (!globalWindow || !globalWindow.matchMedia) {
    return Appearance.DEFAULT;
  }

  const isDarkThemePreferred = globalWindow.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return isDarkThemePreferred ? Appearance.ALTERNATIVE : Appearance.DEFAULT;
};

export const getTheme = (appearence: Appearance) => {
  return appearence === Appearance.DEFAULT ? lightTheme : darkTheme;
};

export const initialTheme = getPreferredColorScheme();
export const initialThemeItem = getTheme(initialTheme);
