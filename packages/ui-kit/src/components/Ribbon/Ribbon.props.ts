import { ReactNode } from 'react';

import { RibbonTheme } from './Ribbon.themes';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface RibbonProps extends DivProps {
  /**
   * Optional ribbon child element.
   *
   * When set, Ribbon renders an internal container with `position: relative`
   * and anchors the ribbon to its top-right corner. The parent does not
   * need its own positioning context.
   *
   * When omitted, only the ribbon is rendered (standalone mode). Must be placed
   * inside a parent with a non-static position.
   */
  children?: ReactNode;
  /**
   * Ribbon text.
   */
  text?: string;
  /**
   * Ribbon tips offset from the top-right corner.
   */
  offset?: number;
  /**
   * Object with CSS theme properties.
   */
  theme: RibbonTheme;
}
