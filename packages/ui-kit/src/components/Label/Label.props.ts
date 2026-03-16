import React from 'react';

import { LabelGroupThemeType, LabelThemeType } from './Label.theme';

export type LabelPlacementType = 'left' | 'right' | 'top';

type Label = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export interface LabelProps extends Label {
  /**
   * Child element.
   */
  children: React.ReactNode;
  /**
   * Object with CSS theme properties.
   */
  theme: LabelThemeType;
  /**
   * Child text element.
   *
   * Use the Text component.
   */
  text?: React.ReactNode;
  /**
   * Child element description.
   *
   * Use the Text component.
   */
  description?: React.ReactNode;
  /**
   * Text alignment relative to the child element.
   *
   * @default 'top'.
   */
  textPlacement?: LabelPlacementType;
  /**
   * Align the control with the text in the center.
   */
  isCentered?: boolean;
}

export interface LabelGroupProps {
  /**
   * Child element.
   */
  children: React.ReactNode;
  /**
   * Object with CSS theme properties.
   */
  theme: LabelGroupThemeType;
}

export type LabelGroupType = React.ForwardRefExoticComponent<
  LabelProps & React.RefAttributes<HTMLLabelElement>
> & {
  /**
   * Component of the group.
   */
  Group: React.ForwardRefExoticComponent<
    LabelGroupProps & React.RefAttributes<HTMLDivElement>
  >;
};
