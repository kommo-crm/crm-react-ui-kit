import { I18nextProvider } from 'react-i18next';
import React from 'react';
import { type Decorator } from '@storybook/react';

import { i18n } from '@i18n';

export const WithI18next: Decorator = (Story) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  );
};
