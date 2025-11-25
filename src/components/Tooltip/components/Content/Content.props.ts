import { ReactNode } from 'react';

export interface ContentProps {
  /**
   * По архитектуре react-tiny-popover в children
   * передается триггер-компонент тултипа.
   */
  children: ReactNode;
}
