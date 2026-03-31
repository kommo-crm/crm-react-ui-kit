import { PrimitivePath } from '@/design/primitives';

export type SemanticTokens = {
  background: {
    default: {
      $: PrimitivePath;
      disabled: PrimitivePath;
    };
    base: PrimitivePath;
    primary: {
      $: PrimitivePath;
      disabled: PrimitivePath;
    };
    secondary: {
      $: PrimitivePath;
      100: PrimitivePath;
      200: PrimitivePath;
      300: PrimitivePath;
      500: PrimitivePath;
      800: PrimitivePath;
      900: PrimitivePath;
    };
    tour: PrimitivePath;
    qualification: PrimitivePath;
    error: PrimitivePath;
  };
  foreground: {
    primary: PrimitivePath;
    inverted: PrimitivePath;
    secondary: PrimitivePath;
    tertiary: PrimitivePath;
    error: PrimitivePath;
    accent: PrimitivePath;
  };
  border: {
    default: PrimitivePath;
    primary: PrimitivePath;
    medium: PrimitivePath;
    strong: PrimitivePath;
    error: PrimitivePath;
  };
  hover: {
    'light-blue': PrimitivePath;
  };
  shadow: {
    default: PrimitivePath;
  };
  placeholder: {
    default: PrimitivePath;
    primary: PrimitivePath;
  };
  action: {
    droppable: PrimitivePath;
  };
  active: {
    element: {
      900: PrimitivePath;
      800: PrimitivePath;
      700: PrimitivePath;
    };
  };
  scrollbar: {
    track: {
      background: PrimitivePath;
    };
    thumb: {
      background: PrimitivePath;
    };
  };
  text: {
    primary: {
      $: PrimitivePath;
      inverse: PrimitivePath;
    };
    secondary: {
      light: PrimitivePath;
      dark: {
        $: PrimitivePath;
        green: PrimitivePath;
      };
      disabled: {
        light: PrimitivePath;
        dark: PrimitivePath;
      };
    };
    success: {
      primary: PrimitivePath;
    };
    error: {
      primary: PrimitivePath;
    };
  };
  link: {
    primary: PrimitivePath;
  };
};
