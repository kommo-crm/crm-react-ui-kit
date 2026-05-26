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
    {(p) => (
      <Badge {...p} theme={BadgeNeutralTheme}>
        Badge
      </Badge>
    )}
  </ComponentPlayground>
);

export const BadgePromoPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => (
      <Badge {...p} theme={BadgePromoTheme}>
        Badge
      </Badge>
    )}
  </ComponentPlayground>
);

export const BadgeInfoPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => (
      <Badge {...p} theme={BadgeInfoTheme}>
        Badge
      </Badge>
    )}
  </ComponentPlayground>
);

export const BadgeSafetyPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => (
      <Badge {...p} theme={BadgeSafetyTheme}>
        Badge
      </Badge>
    )}
  </ComponentPlayground>
);

export const BadgeWarningPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => (
      <Badge {...p} theme={BadgeWarningTheme}>
        Badge
      </Badge>
    )}
  </ComponentPlayground>
);

export const BadgeDangerPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<BadgeProps>) => (
  <ComponentPlayground<BadgeProps> appearance={appearance} props={props}>
    {(p) => (
      <Badge {...p} theme={BadgeDangerTheme}>
        Badge
      </Badge>
    )}
  </ComponentPlayground>
);
