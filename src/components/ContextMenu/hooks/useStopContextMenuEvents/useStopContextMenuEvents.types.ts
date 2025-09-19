import { ComponentProps } from 'react';

export type DivHandlers = Pick<
  ComponentProps<'div'>,
  | 'onClick'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onKeyPress'
  | 'onPointerDown'
  | 'onPointerUp'
  | 'onPointerEnter'
  | 'onPointerLeave'
  | 'onPointerMove'
>;
