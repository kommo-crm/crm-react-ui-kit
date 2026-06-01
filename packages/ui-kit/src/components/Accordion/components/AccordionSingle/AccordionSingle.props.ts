import { BaseAccordionProps } from '../../Accordion.props';

export interface AccordionSingleProps extends BaseAccordionProps {
  /**
   * Flag determining whether the accordion can be fully closed.
   */
  isCollapsible?: boolean;
  /**
   * Opened item.
   */
  value?: string;
  /**
   * Default value.
   * Used for Uncontrolled Accordion.
   */
  defaultValue?: string;
  /**
   * Callback for changing the opened item.
   */
  onChange?: (value?: string) => void;
}

export interface AccordionSingleImplProps extends AccordionSingleProps {
  /**
   * Accordion type where only one item can be opened.
   */
  type: 'single';
}

export interface AccordionSingleContextProps
  extends Pick<AccordionSingleProps, 'value' | 'defaultValue'> {
  /**
   * Callback for changing the opened item.
   */
  onChange: (value: string) => void;
}
