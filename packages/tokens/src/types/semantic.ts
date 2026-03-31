import { ColorTokenValue } from '@/types/common';

export type SemanticTokens = {
  palette: {
    'background': {
      default: {
        $: ColorTokenValue;
        disabled: ColorTokenValue;
      };
      base: ColorTokenValue;
      primary: {
        $: ColorTokenValue;
        disabled: ColorTokenValue;
      };
      secondary: {
        $: ColorTokenValue;
        100: ColorTokenValue;
        200: ColorTokenValue;
        300: ColorTokenValue;
        500: ColorTokenValue;
        800: ColorTokenValue;
        900: ColorTokenValue;
      };
      tour: ColorTokenValue;
      qualification: ColorTokenValue;
      error: ColorTokenValue;
    };
    'foreground': {
      primary: ColorTokenValue;
      inverted: ColorTokenValue;
      secondary: ColorTokenValue;
      tertiary: ColorTokenValue;
      error: ColorTokenValue;
      accent: ColorTokenValue;
    };
    'border': {
      default: ColorTokenValue;
      primary: ColorTokenValue;
      medium: ColorTokenValue;
      strong: ColorTokenValue;
      error: ColorTokenValue;
    };
    'hover': {
      'light-blue': ColorTokenValue;
    };
    'box-shadow': {
      default: ColorTokenValue;
    };
    'placeholder': {
      default: ColorTokenValue;
      primary: ColorTokenValue;
    };
    'action': {
      droppable: ColorTokenValue;
    };
    'active': {
      element: {
        900: ColorTokenValue;
        800: ColorTokenValue;
        700: ColorTokenValue;
      };
    };
    'scrollbar': {
      track: {
        background: ColorTokenValue;
      };
      thumb: {
        background: ColorTokenValue;
      };
    };
    'text': {
      primary: {
        $: ColorTokenValue;
        inverse: ColorTokenValue;
      };
      secondary: {
        light: ColorTokenValue;
        dark: {
          $: ColorTokenValue;
          green: ColorTokenValue;
        };
        disabled: {
          light: ColorTokenValue;
          dark: ColorTokenValue;
        };
      };
      success: {
        primary: ColorTokenValue;
      };
      error: {
        primary: ColorTokenValue;
      };
    };
    'link': {
      primary: ColorTokenValue;
    };
  };
};
