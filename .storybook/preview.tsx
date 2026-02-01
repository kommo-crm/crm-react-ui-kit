import type { Preview } from '@storybook/react';

import { initialTheme } from '@storybook-utils/utils';
import { CustomDocsContainer } from '@storybook-utils/components';
import {
  WithConfigProvider,
  WithGridProvider,
} from '@storybook-utils/decorators';

import 'src/stylesheets/theme.css';
import 'src/stylesheets/icons.css';
import 'src/stylesheets/index.css';
import '../public/fonts/ptsans.css';

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
