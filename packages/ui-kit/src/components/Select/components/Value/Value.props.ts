export interface ValueProps {
  /**
   * The placeholder that is displayed when there is no selected value.
   */
  placeholder?: string;
  /**
   * Child elements inside the component.
   */
  children?: React.ReactNode;
  /**
   * Custom class for a block with a value.
   */
  className?: string;
  /**
   * The 'name' attribute of the input.
   */
  name?: string;
}
