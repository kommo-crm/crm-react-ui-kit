import { SpinnerTheme } from './Spinner.themes';

type SpanProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export interface SpinnerProps extends SpanProps {
  /**
   * Specifies whether the object should be centered.
   */
  isCentered?: boolean;
  /**
   * Object with CSS properties of the theme.
   */
  theme: SpinnerTheme;
}
