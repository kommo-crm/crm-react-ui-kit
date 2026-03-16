import { SelectArrowThemeType } from './Arrow.theme';

export interface ArrowProps {
  /**
   * Child elements (icon).
   */
  children?: React.ReactNode;
  /**
   * Custom class on Wrapper.
   */
  className?: string;
  /**
   * Theme.
   */
  theme: SelectArrowThemeType;
}
