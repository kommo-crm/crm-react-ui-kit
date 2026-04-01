import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  Text,
  TextSecondaryDarkTheme,
  TextPrimaryTheme,
  TextSecondaryLightTheme,
  TextErrorTheme,
  TextInheritTheme,
  type TextProps,
} from '..';

export const TextPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextProps>) => (
  <ComponentPlayground<TextProps> appearance={appearance} props={props}>
    {(p) => (
      <Text style={{ width: 100 }} {...p} theme={TextPrimaryTheme}>
        Long text that will be truncated.
      </Text>
    )}
  </ComponentPlayground>
);

export const TextPrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextProps>) => (
  <ComponentPlayground<TextProps> appearance={appearance} props={props}>
    {(p) => (
      <Text {...p} theme={TextPrimaryTheme}>
        Text
      </Text>
    )}
  </ComponentPlayground>
);

export const TextSecondaryLightPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextProps>) => (
  <ComponentPlayground<TextProps> appearance={appearance} props={props}>
    {(p) => (
      <Text {...p} theme={TextSecondaryLightTheme}>
        Text
      </Text>
    )}
  </ComponentPlayground>
);

export const TextSecondaryDarkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextProps>) => (
  <ComponentPlayground<TextProps> appearance={appearance} props={props}>
    {(p) => (
      <Text {...p} theme={TextSecondaryDarkTheme}>
        Text
      </Text>
    )}
  </ComponentPlayground>
);

export const TextErrorPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextProps>) => (
  <ComponentPlayground<TextProps> appearance={appearance} props={props}>
    {(p) => (
      <Text {...p} theme={TextErrorTheme}>
        Text
      </Text>
    )}
  </ComponentPlayground>
);

export const TextInheritPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TextProps>) => (
  <ComponentPlayground<TextProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={{ color: 'var(--crm-ui-kit-color-bright-blue)' }}>
        <Text {...p} theme={TextInheritTheme}>
          Text
        </Text>
      </div>
    )}
  </ComponentPlayground>
);
