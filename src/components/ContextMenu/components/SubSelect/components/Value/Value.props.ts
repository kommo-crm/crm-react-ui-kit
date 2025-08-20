export interface SubSelectValueProps {
  /**
   * Additional сhild elements.
   */
  children?: React.ReactNode;
  /**
   * Custom class.
   */
  className?: string;
  /**
   * Label or key to display on the left side.
   */
  label: string;
  /**
   * Text shown when no value is selected.
   */
  placeholder?: string;
  /**
   * String used to separate the label and the value.
   * For example, in "Name: John", the separator is ": ".
   *
   * @default ":"
   */
  separator?: string;
}
