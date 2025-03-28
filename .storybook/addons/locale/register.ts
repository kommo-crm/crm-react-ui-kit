import { addons, types } from '@storybook/manager-api';

import { LangSelect } from './LangSelect';

addons.register('lang-select', () => {
  addons.add('lang-select', {
    title: 'Locale',
    type: types.TOOL,
    match: ({ viewMode }) => Boolean(viewMode?.match(/^(story|docs)$/)),
    render: LangSelect,
  });
});
