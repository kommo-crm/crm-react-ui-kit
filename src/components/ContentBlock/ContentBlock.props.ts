import { ContentBlockThemeType } from './ContentBlock.themes';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface ContentBlockProps extends DivProps {
  /**
   * Block content.
   */
  children: React.ReactNode;
  /**
   * Object with CSS theme properties.
   */
  theme: ContentBlockThemeType;
}
