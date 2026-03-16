import { type TabThemeType } from './Tab.themes';

export type Button = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'disabled' | 'readonly'
>;

export interface TabProps extends Button {
  /**
   * The `class` attribute for `Tab'.
   */
  className?: string;
  /**
   * Object with CSS theme properties.
   */
  theme: TabThemeType;
  /**
   * Child elements of the `Tab` component.
   */
  children: React.ReactNode;
}
