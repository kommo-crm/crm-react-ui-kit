import { renderHook } from '@testing-library/react';

import { CrmUiKitCSSProperties } from 'src/lib/theme';
import { SwitcherPrimaryTheme } from 'src/components/Switcher';

import { useThemeClassName } from '..';

interface GetHookParams<T extends CrmUiKitCSSProperties> {
  /**
   * Object with CSS properties of the theme
   */
  theme?: T;
}

const getHook = <T extends Record<string, string>>(
  params: Partial<GetHookParams<T>> | undefined
) => {
  return renderHook(
    ({ theme = SwitcherPrimaryTheme }) => useThemeClassName(theme),
    {
      initialProps: {
        theme: params?.theme,
      },
    }
  );
};

jest.mock('nanoid', () => ({
  ...(jest.requireActual('nanoid') as object),
  nanoid: jest.fn().mockImplementationOnce(() => 'example'),
}));

describe('useThemeClassName', () => {
  afterAll(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(useThemeClassName).toBeDefined();
  });

  it('should return correct values', () => {
    const { result } = getHook({});

    expect(result.current).toBe('crm-ui-kit-theme-example');
  });

  it('should create a style element with correct styles', () => {
    getHook({});

    const styleElement = document.head.querySelector('style');

    expect(styleElement).not.toBeNull();

    if (!styleElement) {
      throw new Error('<style> element is not found');
    }

    const styleContent = styleElement.textContent || '';

    const styleRules = styleContent.match(/{([^}]+)}/)?.[1] || '';

    /**
     * Break the rules down into separate properties
     */
    const styleProperties = styleRules
      .split(';')
      .map((prop) => prop.trim())
      .filter((prop) => prop !== '');

    /**
     * Check that the number of properties is the same
     */
    expect(styleProperties.length).toBe(
      Object.keys(SwitcherPrimaryTheme).length
    );

    /**
     * Check that all properties from `defaultTheme` are present in the created styles
     */
    Object.entries(SwitcherPrimaryTheme).forEach(([key, value]) => {
      const expectedProperty = `${key}: ${value}`;

      expect(styleProperties).toContainEqual(expectedProperty);
    });
  });

  it('should reuse existing className for the same theme object', () => {
    const result = getHook({});
    const result2 = getHook({});

    const styleElements = document.head.querySelectorAll('style');

    expect(styleElements.length).toEqual(1);
    expect(result.result).toEqual(result2.result);
  });

  it('should create a new className for a different theme object', () => {
    const anotherTheme = {
      '--crm-ui-kit-switcher-active-element': 'yellow',
      '--crm-ui-kit-switcher-background': 'black',
    };

    const result = getHook({});
    const result2 = getHook({ theme: anotherTheme });

    const styleElements = document.head.querySelectorAll('style');

    expect(styleElements.length).toEqual(2);

    expect(result.result.current).not.toEqual(result2.result.current);
  });
});
