import React from 'react';

import { ConfigProvider } from 'src/components/ConfigProvider';
import { Appearance } from 'src/lib/appearance';

import { prettyProps } from './utils';
import { TEST_CLASS_NAMES } from './constants';

export interface InternalComponentPlaygroundProps<Props> {
  /**
   * The color theme used in the current test
   */
  appearance: Appearance;
  /**
   * Props for the single component variation to render
   */
  props: Props;
  /**
   * A function that takes props and returns a React element
   */
  children: (props: Props) => React.ReactNode;
}

export type ComponentPlaygroundProps<Props> = Omit<
  InternalComponentPlaygroundProps<Props>,
  'children'
>;

/**
 * Renders a single variation of the component with the given props.
 * Use this when you want to define combinations outside the component.
 */
export const ComponentPlayground = <P extends object>({
  appearance,
  props: itemProps,
  children,
}: InternalComponentPlaygroundProps<P>) => {
  return (
    <ConfigProvider appearance={appearance}>
      <div
        style={{
          border: '8px solid var(--playwright-border)',
          background: 'var(--playwright-background)',
        }}
      >
        <div className={TEST_CLASS_NAMES.PARAMS_CONTENT}>
          {prettyProps(itemProps)}
        </div>

        <div>{children(itemProps)}</div>
      </div>
    </ConfigProvider>
  );
};
