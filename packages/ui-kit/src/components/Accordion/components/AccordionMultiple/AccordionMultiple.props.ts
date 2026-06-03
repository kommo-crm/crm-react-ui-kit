import { BaseAccordionProps } from '../../Accordion.props';

export interface AccordionMultipleProps extends BaseAccordionProps {
  /**
   * Opened item.
   */
  value?: string[];
  /**
   * Default value.
   * Used for Uncontrolled Accordion.
   */
  defaultValue?: string[];
  /**
   * Callback for changing the opened item.
   */
  onChange?: (value: string[]) => void;
}

export interface AccordionMultipleImplProps extends AccordionMultipleProps {
  /**
   * The type of accordion in which there may be several opened items.
   */
  type: 'multiple';
}

export interface AccordionMultipleContextProps
  extends Pick<AccordionMultipleProps, 'value' | 'defaultValue'> {
  /**
   * Callback for changing the opened item.
   */
  onChange: (value: string) => void;
}
