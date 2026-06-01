import { addons } from '@storybook/manager-api';

import { i18n } from './i18n';

addons.setConfig({
  sidebar: {
    renderLabel: ({ name }) => i18n.t(name),
  },
});
