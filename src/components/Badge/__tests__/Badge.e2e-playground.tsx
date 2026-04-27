import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  Badge,
  BadgeNeutralTheme,
  BadgePromoTheme,
  BadgeInfoTheme,
  BadgeSafetyTheme,
  BadgeWarningTheme,
  BadgeDangerTheme,
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

export const BadgePromoPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgePromoTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgeInfoPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgeInfoTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgeSafetyPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgeSafetyTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgeWarningPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgeWarningTheme} title="Badge" />}
  </ComponentPlayground>
);

export const BadgeDangerPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => <Badge {...p} theme={BadgeDangerTheme} title="Badge" />}
  </ComponentPlayground>
);
