import type { Preview } from '@storybook/react';

import { initialTheme } from '@kommo-crm/storybook/utils';
import { CustomDocsContainer } from '@kommo-crm/storybook/components';
import {
  WithConfigProvider,
  WithGridProvider,
} from '@kommo-crm/storybook/decorators';

import '@ui-kit/stylesheets/theme.css';
import '@ui-kit/stylesheets/icons.css';
import '@ui-kit/stylesheets/index.css';
// eslint-disable-next-line import/no-unresolved
import '@ui-kit/public/fonts/ptsans.css';

const preview: Preview = {
  tags: [],
  parameters: {
    docs: {
      container: CustomDocsContainer,
      canvas: {
        // This will remove the "Show code" button from Canvas
        sourceState: 'none',
      },
      source: {
        /**
         * It is necessary that during development it is clear that this section
         * must be explicitly specified, otherwise the automatically generated
         * source code appears.
         *
         * More info provided in this comment:
         * https://github.com/kommo-crm/crm-react-ui-kit/pull/11#discussion_r2315256940
         */
        code: '@todo',
      },
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Getting Started', 'Component theming'],
          'Color',
          'Typography',
          'Components',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    appearance: {
      description: 'Global theme',
    },
    locale: {
      description: 'Global localization',
    },
  },
  initialGlobals: {
    appearance: initialTheme,
  },
  decorators: [WithConfigProvider, WithGridProvider],
};

export default preview;
