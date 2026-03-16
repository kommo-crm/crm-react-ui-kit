import { AccordionThemeType } from './Accordion.themes';
import {
  AccordionMultipleImplProps,
  AccordionMultipleContextProps,
} from './components/AccordionMultiple/AccordionMultiple.props';
import {
  AccordionSingleImplProps,
  AccordionSingleContextProps,
} from './components/AccordionSingle/AccordionSingle.props';
import { ItemProps } from './components/Item/Item.props';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface BaseAccordionProps extends Omit<DivProps, 'onChange'> {
  /**
   * Object with CSS theme properties.
   */
  theme: AccordionThemeType;
  /**
   * Items content.
   */
  children: React.ReactElement<ItemProps> | React.ReactElement<ItemProps>[];
}

export type AccordionProps =
  | AccordionSingleImplProps
  | AccordionMultipleImplProps;

export type AccordionType = React.ForwardRefExoticComponent<
  AccordionProps & React.RefAttributes<HTMLDivElement>
> & {
  /**
   * Item component.
   */
  Item: React.FC<ItemProps>;
};

export type AccordionContextProps =
  | AccordionMultipleContextProps
  | AccordionSingleContextProps;
