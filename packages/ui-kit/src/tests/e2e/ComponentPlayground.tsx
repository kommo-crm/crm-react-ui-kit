import React from 'react';

import { ConfigProvider } from 'src/components/ConfigProvider';
import { Appearance } from 'src/lib/appearance';

import { multiCartesian, prettyProps } from './utils';
import { TEST_CLASS_NAMES } from './constants';

export interface InternalComponentPlaygroundProps<Props> {
  /**
   * The color theme used in the current test
   */
  appearance: Appearance;
  /**
   * An object containing sets of values for different component props.
   */
  propSets?: Parameters<typeof multiCartesian<Props>>[0];
  /**
   * A function that takes props (generated from propSets) and returns a React element
   */
  children: (props: Props) => React.ReactNode;
}

export type ComponentPlaygroundProps<Props> = Omit<
  InternalComponentPlaygroundProps<Props>,
  'children'
>;

/**
 * Renders the component passed to `children` with different parameters (`propSets`).
 */

export const ComponentPlayground = <P extends object>({
  appearance,
  propSets = [{}],
  children,
  ...props
}: InternalComponentPlaygroundProps<P>) => {
  return (
    <ConfigProvider appearance={appearance}>
      <div
        style={{
          border: '8px solid var(--playwright-border)',
          background: 'var(--playwright-background)',
        }}
        {...props}
      >
        {multiCartesian(propSets).map((propSet, i) => {
          return (
            <React.Fragment key={i}>
              <div className={TEST_CLASS_NAMES.PARAMS_CONTENT}>
                {prettyProps(propSet)}
              </div>
              <div>{children(propSet)}</div>
            </React.Fragment>
          );
        })}
      </div>
    </ConfigProvider>
  );
};
