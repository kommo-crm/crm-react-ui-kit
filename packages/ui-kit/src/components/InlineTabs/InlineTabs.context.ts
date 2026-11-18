import { createContext } from 'react';

export interface InlineTabsContextValue {
  /**
   * Class name with the theme variables, needed by parts rendered outside the
   * root DOM tree (the overflow menu).
   */
  themeClassName: string;
  /**
   * Selected value in both controlled and uncontrolled modes.
   */
  value: string | undefined;
  /**
   * Selects a tab the same way as a click on its trigger.
   */
  select: (value: string) => void;
}

export const InlineTabsContext = createContext<InlineTabsContextValue>({
  themeClassName: '',
  value: undefined,
  select: () => undefined,
});
