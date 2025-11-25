import { ReactNode, RefObject } from 'react';
import { PopoverProps } from 'react-tiny-popover';

import { ContentProps } from './components/Content/Content.props';
import { TriggerProps } from './components/Trigger/Trigger.props';
import { ArrowProps } from './components/Arrow/Arrow.props';

export type MouseHandlers = {
  /**
   * Колбэк на событие наведения курсора.
   */
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Колбэк на событие ухода курсора.
   */
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
};

type ControlledProps = {
  /**
   * Флаг, является ли компонент контроллируемым.
   */
  isControlled: true;
} & MouseHandlers;

type UncontrolledProps = {
  /**
   * Флаг, является ли компонент контроллируемым.
   */
  isControlled?: undefined;
} & {
  [K in keyof MouseHandlers]?: undefined;
};

type BaseTooltipProps = {
  /**
   * Флаг, можно ли навестить на контент тултипа.
   * По умолчанию, если убрать курсор с триггер элемента, то тултип закроется.
   */
  isHoverable?: boolean;
  /**
   * HTML елемент, являющийся контейнером,
   * за рамки которого не может выходить тултип.
   * По умолчанию равен `document.body`.
   */
  boundaryElement?: PopoverProps['boundaryElement'];
};

export type TooltipProps = (ControlledProps | UncontrolledProps) &
  BaseTooltipProps & {
    children: ReactNode;
  };

export type TooltipContextProps = BaseTooltipProps &
  MouseHandlers & {
    /**
     * Флаг, открыт ли тултип.
     */
    isOpen: PopoverProps['isOpen'];
    /**
     * Ref тултипа.
     */
    popoverRef: RefObject<HTMLDivElement> | null;
    /**
     * Флаг, является ли компонент контроллируемым.
     */
    isControlled?: true;
  };

export type TooltipType = React.ForwardRefExoticComponent<
  TooltipProps & React.RefAttributes<HTMLDivElement>
> & {
  /**
   * Content компонент.
   */
  Content: React.ForwardRefExoticComponent<ContentProps>;
  /**
   * Trigger компонент.
   */
  Trigger: React.ForwardRefExoticComponent<TriggerProps>;
  /**
   * Arrow компонент.
   */
  Arrow: React.ForwardRefExoticComponent<ArrowProps>;
  /**
   * Root компонент.
   */
  Root: React.ForwardRefExoticComponent<
    TooltipProps & React.RefAttributes<HTMLDivElement>
  >;
};
