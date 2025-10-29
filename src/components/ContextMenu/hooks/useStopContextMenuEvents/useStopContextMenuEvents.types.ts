import React from 'react';

export type Handlers<T extends HTMLElement> = {
  onClick?: React.MouseEventHandler<T>;
  onFocus?: React.FocusEventHandler<T>;
  onKeyDown?: React.KeyboardEventHandler<T>;
  onKeyUp?: React.KeyboardEventHandler<T>;
  onKeyPress?: React.KeyboardEventHandler<T>;
  onPointerDown?: React.PointerEventHandler<T>;
  onPointerUp?: React.PointerEventHandler<T>;
  onPointerEnter?: React.PointerEventHandler<T>;
  onPointerLeave?: React.PointerEventHandler<T>;
  onPointerMove?: React.PointerEventHandler<T>;
};
