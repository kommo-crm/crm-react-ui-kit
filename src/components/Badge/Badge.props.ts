import { BadgeThemeType } from './Badge.themes';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Object with CSS properties of the theme.
   */
  theme: BadgeThemeType;
  /**
   * Badge text.
   */
  title: string;
}
