import React, { useLayoutEffect } from 'react';
import { DocsContainer } from '@storybook/blocks';
import { I18nextProvider } from 'react-i18next';

import {
  getStorybookToolsContainer,
  getTheme,
  initialTheme,
} from '@storybook-utils/utils';
import { HIDDEN_SECTIONS } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { CustomDocsContainerProps } from './CustomDocsContainer.props';

/**
 * Custom docs container for hiding buttons in places where they are not needed
 * and providing custom theming
 */
export const CustomDocsContainer: React.FC<CustomDocsContainerProps> = ({
  context,
  children,
  ...props
}) => {
  const appearance =
    context?.channel?.data?.globalsUpdated[0]?.globals?.appearance ||
    initialTheme;

  const theme = getTheme(appearance);

  useLayoutEffect(() => {
    const toolsContainer = getStorybookToolsContainer();

    if (!toolsContainer) {
      return;
    }

    const pageId = context?.channel?.data?.docsPrepared?.[0]?.id || '';

    const hideAllButtonsExceptThemeToggle = (isHidden: boolean = true) => {
      const buttons = toolsContainer.children;

      const HIDDEN_BUTTONS_COUNT = 2;

      if (buttons && buttons.length >= HIDDEN_BUTTONS_COUNT) {
        for (let i = 0; i < HIDDEN_BUTTONS_COUNT; i++) {
          (buttons[i] as HTMLElement).style.display = isHidden ? 'none' : '';
        }
      }
    };

    if (HIDDEN_SECTIONS.some((prefix) => pageId.startsWith(prefix))) {
      hideAllButtonsExceptThemeToggle();
    } else {
      hideAllButtonsExceptThemeToggle(false);
    }

    return () => {
      hideAllButtonsExceptThemeToggle();
    };
  }, [context]);

  return (
    <DocsContainer context={context} {...props} theme={theme}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </DocsContainer>
  );
};
