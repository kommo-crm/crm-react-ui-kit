import { addons, types } from '@storybook/manager-api';

import { ThemeToggleButton } from './ThemeToggleButton';

addons.register('theme-toggle', () => {
  addons.add('theme-toggle', {
    title: 'Theme Toggle',
    type: types.TOOL,
    match: ({ viewMode }) => {
      return Boolean(viewMode?.match(/^(story|docs)$/));
    },
    render: ThemeToggleButton,
  });
});
