import { MenuAimDirection } from '../../hooks/useMenuAim/useMenuAim.types';

import { Direction } from './Content.enums';

export const directionToSide: Record<Direction, MenuAimDirection> = {
  [Direction.UP_LEFT]: MenuAimDirection.TOP,
  [Direction.UP_RIGHT]: MenuAimDirection.TOP,
  [Direction.DOWN_LEFT]: MenuAimDirection.BOTTOM,
  [Direction.DOWN_RIGHT]: MenuAimDirection.BOTTOM,
  [Direction.LEFT_UP]: MenuAimDirection.LEFT,
  [Direction.LEFT_DOWN]: MenuAimDirection.LEFT,
  [Direction.RIGHT_UP]: MenuAimDirection.RIGHT,
  [Direction.RIGHT_DOWN]: MenuAimDirection.RIGHT,
};
