import { LinkTheme } from './Link.themes';

export type Anchor = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export interface LinkProps extends Anchor {
  /**
   * Object with CSS properties of the theme
   */
  theme: LinkTheme;
}
