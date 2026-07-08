import { ReactNode } from 'react';

import { RibbonTheme } from './Ribbon.themes';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface RibbonProps extends DivProps {
  /**
   * Content to wrap with the ribbon.
   *
   * **With children** - Ribbon renders a `position: relative` container
   * around the children and positions itself inside it. No extra CSS needed
   * on the parent.
   *
   * ```tsx
   * <Ribbon label="Pro" theme={RibbonPrimaryTheme}>
   *   <Card>
   *     {content}
   *   </Card>
   * </Ribbon>
   * ```
   *
   * **Without children** - only the ribbon element is rendered. It
   * has `position: absolute` and is positioned to the top-right corner via
   * `top` and `right`. Place it inside a parent with non-static position so
   * it can be anchored correctly.
   *
   * ```tsx
   * <Card style={{ position: 'relative' }}>
   *   <Ribbon label="Pro" theme={RibbonPrimaryTheme} />
   *   {content}
   * </Card>
   * ```
   */
  children?: ReactNode;
  /**
   * Ribbon label.
   */
  label?: ReactNode;
  /**
   * Ribbon tips offset from the top-right corner.
   */
  offset?: number;
  /**
   * Object with CSS theme properties.
   */
  theme: RibbonTheme;
}
