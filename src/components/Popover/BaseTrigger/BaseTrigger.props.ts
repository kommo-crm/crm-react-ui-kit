import { ReactNode } from 'react';

export interface BaseTriggerProps {
  /**
   * Триггер элемент.
   */
  children: ReactNode;
  /**
   * Кастомный CSS класс.
   */
  className?: string;
  /**
   * Колбэк на клик.
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Колбэк на событие наведения курсора.
   */
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Колбэк на событие ухода курсора.
   */
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}
