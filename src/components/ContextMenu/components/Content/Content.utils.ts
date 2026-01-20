import { MenuAimDirection } from '@kommo-crm/react-hooks';

import { Direction } from './Content.enums';

export const directionToSide: Record<Direction, MenuAimDirection> = {
  [Direction.UP_LEFT]: 'top' as MenuAimDirection,
  [Direction.UP_RIGHT]: 'top' as MenuAimDirection,
  [Direction.DOWN_LEFT]: 'bottom' as MenuAimDirection,
  [Direction.DOWN_RIGHT]: 'bottom' as MenuAimDirection,
  [Direction.LEFT_UP]: 'left' as MenuAimDirection,
  [Direction.LEFT_DOWN]: 'left' as MenuAimDirection,
  [Direction.RIGHT_UP]: 'right' as MenuAimDirection,
  [Direction.RIGHT_DOWN]: 'right' as MenuAimDirection,
};
