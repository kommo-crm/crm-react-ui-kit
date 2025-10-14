export type MaybeAsChildProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Whether the children should be rendered as a child.
   */
  asChild?: boolean;
  /**
   * The children of the MaybeAsChild.
   */
  children: React.ReactNode;
};
