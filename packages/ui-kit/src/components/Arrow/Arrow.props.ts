import type {
  ComponentPropsWithoutRef,
  ComponentType,
  RefAttributes,
} from 'react';

type ArrowPrimitiveProps = ComponentPropsWithoutRef<'svg'> & {
  /**
   * Render the arrow as its child element instead of an svg.
   */
  asChild?: boolean;
};

export type ArrowProps = ComponentPropsWithoutRef<'svg'> & {
  /**
   * Radix arrow primitive of the owning family (e.g. `Tooltip.Arrow`).
   */
  as: ComponentType<ArrowPrimitiveProps & RefAttributes<SVGSVGElement>>;
  /**
   * Custom class on Border Arrow.
   */
  borderClassName?: string;
};
