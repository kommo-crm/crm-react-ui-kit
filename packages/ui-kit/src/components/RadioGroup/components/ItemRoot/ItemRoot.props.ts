import { VisuallyHiddenInputProps } from 'src/components/VisuallyHiddenInput';

import { type RadioProps } from '../../';

import { ItemRootThemeType } from './ItemRoot.themes';

export type ItemRootProps = Omit<
  VisuallyHiddenInputProps<RadioProps>,
  'theme' | 'isDefaultChecked' | 'isChecked' | 'name' | 'onChange'
> & {
  /**
   * Object with CSS theme properties.
   */
  theme: ItemRootThemeType;
};

export type RadioItemContextProps = Omit<ItemRootProps, 'theme'>;
