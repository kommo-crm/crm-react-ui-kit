import { CSSProperties, ReactElement } from 'react';
import { PopoverPosition, Rect } from 'react-tiny-popover';

export interface ArrowPublicProps {
  /**
   * Контент тултипа. По архитектуре react-tiny-popover,
   * контент оборачивается в компонент Arrow.
   */
  children: ReactElement;
  /**
   * Кастомный CSS класс для контейнера.
   */
  className?: string;
  /**
   * Цвет стрелки.
   */
  arrowColor?: string;
  /**
   * Размер стрелки.
   */
  arrowSize?: number;
  /**
   * Кастомный CSS класс для стрелки.
   */
  arrowClassname?: string;
  /**
   * Inline-стили для стрелки.
   */
  arrowStyle?: CSSProperties;
}

export interface ArrowPrivateProps {
  /**
   * Позиция тултипа.
   */
  position: PopoverPosition;
  /**
   * DOMRect триггера (элемент, на который навешан тултип).
   */
  childRect: Rect;
  /**
   * DOMRect тултипа (Popover).
   */
  popoverRect: Rect;
}

export type BaseArrowProps = ArrowPublicProps & ArrowPrivateProps;
