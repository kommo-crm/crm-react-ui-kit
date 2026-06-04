import React, { useEffect, useState } from 'react';
import { addons } from '@storybook/manager-api';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from '@storybook/components';

import { i18n } from '../../i18n';

import {
  getLocale,
  INITIAL_LANGUAGE,
  LOCALE_LIST,
  Langs,
} from '../../../storybook/utils';

export const LangSelect = () => {
  const [locale, setLocale] = useState(INITIAL_LANGUAGE);

  const channel = addons.getChannel();

  useEffect(() => {
    const updateLocale = ({ globals }: { globals: Record<string, Langs> }) => {
      const newLocale = globals.locale || INITIAL_LANGUAGE;

      setLocale(newLocale);
      i18n.changeLanguage(newLocale);
    };

    channel.on('globalsUpdated', updateLocale);

    return () => {
      channel.off('globalsUpdated', updateLocale);
    };
  }, []);

  const links = LOCALE_LIST.map(({ value, title }) => ({
    id: value,
    title: title,
    onClick: () => {
      if (value !== locale) {
        channel.emit('updateGlobals', { globals: { locale: value } });

        window.location.reload();
      }
    },
  }));

  const currentLocaleItem = getLocale(locale);

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      tooltip={<TooltipLinkList links={links} />}
    >
      <IconButton title={`Locale: ${currentLocaleItem.title}`}>
        {currentLocaleItem.title}
      </IconButton>
    </WithTooltip>
  );
};
