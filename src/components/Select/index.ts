export { Select } from './Select';
export { type SelectProps } from './Select.props';
export { type SelectItem } from './Select.types';
export { SelectRootTheme, type SelectRootThemeType } from './Select.theme';

export { SelectItemTheme, type SelectItemThemeType } from './components/Item';
export {
  SelectArrowTheme,
  type SelectArrowThemeType,
} from './components/Arrow';
export { SelectIconTheme, type SelectIconThemeType } from './components/Icon';

export {
  // @ts-expect-error will be removed
  ListTheme as SelectListTheme,

  // @ts-expect-error will be removed
  type ListThemeType as SelectListThemeType,
} from '../List';
export {
  SelectButtonLightTheme,
  SelectButtonDarkTheme,
  type SelectButtonThemeType,
} from '../SelectButton';
