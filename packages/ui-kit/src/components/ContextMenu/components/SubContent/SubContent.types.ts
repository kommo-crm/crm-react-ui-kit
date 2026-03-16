import { SubContentProps } from './SubContent.props';

export type PointerDownOutsideEvent = Parameters<
  NonNullable<SubContentProps['onPointerDownOutside']>
>[0];
