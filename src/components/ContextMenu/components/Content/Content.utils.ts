import { Direction, Side } from './Content.enums';
import { SideType } from './Content.types';

export const directionToSide: Record<Direction, SideType> = {
  [Direction.UP_LEFT]: Side.TOP,
  [Direction.UP_RIGHT]: Side.TOP,
  [Direction.DOWN_LEFT]: Side.BOTTOM,
  [Direction.DOWN_RIGHT]: Side.BOTTOM,
  [Direction.LEFT_UP]: Side.LEFT,
  [Direction.LEFT_DOWN]: Side.LEFT,
  [Direction.RIGHT_UP]: Side.RIGHT,
  [Direction.RIGHT_DOWN]: Side.RIGHT,
};
