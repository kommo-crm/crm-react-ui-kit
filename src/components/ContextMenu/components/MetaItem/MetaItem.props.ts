export interface MetaItemProps {
  /**
   * Additional сhild elements.
   */
  children?: React.ReactNode;
  /**
   * Custom class.
   */
  className?: string;
  /**
   * Icon to the left of the label.
   */
  icon?: React.ReactElement;
  /**
   * Icon displayed next to the value for triggering copy-to-clipboard behavior.
   */
  copyIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  /**
   * Label or key to display on the left side.
   */
  label: string;
  /**
   * Value to display on the right side.
   */
  value: string;
  /**
   * String used to separate the label and the value.
   * For example, in "Name: John", the separator is ": ".
   *
   * @default ":"
   */
  separator?: string;
  /**
   * Whether the value of MetaItem is copyable.
   */
  isCopyable?: boolean;
  /**
   * Optional custom copy handler.
   * Overrides default copyToClipboard behavior.
   */
  onCopy?: (value: string) => void;
}
