import { Direction } from './Content.enums';

export const directionToSide: Record<
  Direction,
  'top' | 'bottom' | 'left' | 'right'
> = {
  [Direction.UP_LEFT]: 'top',
  [Direction.UP_RIGHT]: 'top',
  [Direction.DOWN_LEFT]: 'bottom',
  [Direction.DOWN_RIGHT]: 'bottom',
  [Direction.LEFT_UP]: 'left',
  [Direction.LEFT_DOWN]: 'left',
  [Direction.RIGHT_UP]: 'right',
  [Direction.RIGHT_DOWN]: 'right',
};
