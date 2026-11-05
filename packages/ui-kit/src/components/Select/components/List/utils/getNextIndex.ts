/**
 * Returns the index of the next item in the given direction,
 * wrapping around the list.
 *
 * From `-1` (nothing is hovered) it starts at the first item going down
 * and at the last item going up.
 *
 * Returns `-1` when the list is empty.
 */
export const getNextIndex = (
  fromIndex: number,
  step: 1 | -1,
  count: number
): number => {
  if (count === 0) {
    return -1;
  }

  const startIndex = fromIndex < 0 && step < 0 ? count : fromIndex;

  return (((startIndex + step) % count) + count) % count;
};
