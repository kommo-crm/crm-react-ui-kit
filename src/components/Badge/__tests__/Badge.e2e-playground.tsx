import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  Badge,
  BadgeNeutralTheme,
  BadgePurpleTheme,
  BadgeBlueTheme,
  BadgePinkTheme,
  BadgeGreenTheme,
  BadgeOrangeTheme,
  BadgeRedTheme,
  type BadgeProps,
} from '..';

export const BadgeNeutralPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgeNeutralTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgePurplePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgePurpleTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgeBluePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgeBlueTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgePinkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgePinkTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgeGreenPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgeGreenTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgeOrangePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgeOrangeTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgeRedPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgeRedTheme} title="Badge" />}
  </ComponentPlayground>
);
