import { ContextMenuItemRightSlotThemeType } from './ItemRightSlot.theme';

export interface ItemRightSlotProps {
  /**
   * Child elements.
   */
  children: React.ReactNode;
  /**
   * Custom class on Wrapper.
   */
  className?: string;
  /**
   * Theme.
   */
  theme: ContextMenuItemRightSlotThemeType;
}
