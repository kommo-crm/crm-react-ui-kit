export type NonSelectableItemProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Whether the children should be rendered as a child.
   */
  asChild?: boolean;
  /**
   * The children of the NonSelectableItem.
   */
  children: React.ReactNode;
};
