import { CounterBadgeTheme } from './CounterBadge.themes';

export interface CounterBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Object with CSS properties of the theme.
   */
  theme: CounterBadgeTheme;
  /**
   * Badge content.
   */
  children: number | string;
}
