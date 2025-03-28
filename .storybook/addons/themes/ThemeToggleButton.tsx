import React, { useEffect, useState } from 'react';
import { addons } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';
import { SunIcon, MoonIcon } from '@storybook/icons';

import { Appearance } from '../../../src';
import { getTheme, initialTheme } from '../../../storybook/utils';

export const ThemeToggleButton = () => {
  const [appearance, setAppearance] = useState<Appearance>(initialTheme);
  const channel = addons.getChannel();

  useEffect(() => {
    const updateTheme = ({
      globals,
    }: {
      globals: Record<string, Appearance>;
    }) => {
      const newAppearance = globals?.appearance;

      if (newAppearance) {
        setAppearance(newAppearance);
        addons.setConfig({ theme: getTheme(newAppearance) });
      }
    };

    channel.on('globalsUpdated', updateTheme);

    return () => channel.off('globalsUpdated', updateTheme);
  }, []);

  const nextThemeTitle = appearance === Appearance.DEFAULT ? 'Dark' : 'Light';
  const NextThemeIcon = appearance === Appearance.DEFAULT ? MoonIcon : SunIcon;

  const handleThemeToggle = () => {
    const nextAppearance =
      appearance === Appearance.DEFAULT
        ? Appearance.ALTERNATIVE
        : Appearance.DEFAULT;

    channel.emit('updateGlobals', {
      globals: { appearance: nextAppearance },
    });
  };

  return (
    <IconButton
      key="theme-toggle"
      title={`Switch to ${nextThemeTitle} mode`}
      onClick={handleThemeToggle}
    >
      <NextThemeIcon />
    </IconButton>
  );
};
