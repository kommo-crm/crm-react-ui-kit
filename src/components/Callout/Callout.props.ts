import { CalloutThemeType } from './Callout.themes';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface CalloutProps extends DivProps {
  /**
   * Block content.
   */
  children: React.ReactNode;
  /**
   * Object with CSS theme properties
   */
  theme: CalloutThemeType;
  /**
   * Flag determining whether an icon should be present.
   */
  isIconAvailable?: boolean;
  /**
   * Close handler. When provided, a close button is rendered.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
