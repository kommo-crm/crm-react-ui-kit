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
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Getting Started', 'How to use', 'Component theming'],
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
