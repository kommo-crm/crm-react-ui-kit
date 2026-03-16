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
  type TextProps,
} from '..';

export const TextPlayground = (props: ComponentPlaygroundProps<TextProps>) => {
  return (
    <ComponentPlayground<TextProps>
      {...props}
      propSets={[
        {
          size: ['m'],
          isEllipsis: [true, false],
          maxRows: [undefined, 2],
        },
      ]}
    >
      {(itemProps: TextProps) => (
        <Text style={{ width: 100 }} {...itemProps} theme={TextPrimaryTheme}>
          Long text that will be truncated.
        </Text>
      )}
    </ComponentPlayground>
  );
};

export const TextPlaygroundPrimary = (
  props: ComponentPlaygroundProps<TextProps>
) => {
  return (
    <ComponentPlayground<TextProps>
      {...props}
      propSets={[{ size: ['s', 'm', 'ms', 'l', 'xl'] }]}
    >
      {(itemProps: TextProps) => (
        <Text {...itemProps} theme={TextPrimaryTheme}>
          Text
        </Text>
      )}
    </ComponentPlayground>
  );
};

export const TextPlaygroundSecondaryLight = (
  props: ComponentPlaygroundProps<TextProps>
) => {
  return (
    <ComponentPlayground<TextProps>
      {...props}
      propSets={[{ size: ['s', 'm', 'ms', 'l', 'xl'] }]}
    >
      {(itemProps: TextProps) => (
        <Text {...itemProps} theme={TextSecondaryLightTheme}>
          Text
        </Text>
      )}
    </ComponentPlayground>
  );
};

export const TextPlaygroundSecondaryDark = (
  props: ComponentPlaygroundProps<TextProps>
) => {
  return (
    <ComponentPlayground<TextProps>
      {...props}
      propSets={[{ size: ['s', 'm', 'ms', 'l', 'xl'] }]}
    >
      {(itemProps: TextProps) => (
        <Text {...itemProps} theme={TextSecondaryDarkTheme}>
          Text
        </Text>
      )}
    </ComponentPlayground>
  );
};

export const TextPlaygroundError = (
  props: ComponentPlaygroundProps<TextProps>
) => {
  return (
    <ComponentPlayground<TextProps>
      {...props}
      propSets={[{ size: ['s', 'm', 'ms', 'l', 'xl'] }]}
    >
      {(itemProps: TextProps) => (
        <Text {...itemProps} theme={TextErrorTheme}>
          Text
        </Text>
      )}
    </ComponentPlayground>
  );
};
