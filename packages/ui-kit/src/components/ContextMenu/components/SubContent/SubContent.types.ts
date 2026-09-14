import { SubContentProps } from './SubContent.props';

export type PointerDownOutsideEvent = Parameters<
  NonNullable<SubContentProps['onPointerDownOutside']>
>[0];

export type FocusOutsideEvent = Parameters<
  NonNullable<SubContentProps['onFocusOutside']>
>[0];
