const MAX_COUNTER = 99;

/**
 * Text of a counter badge, `null` when there is no badge to show.
 */
export const formatCounter = (count: number | undefined): string | null => {
  if (!count || count <= 0) {
    return null;
  }

  return count > MAX_COUNTER ? `${MAX_COUNTER}+` : String(count);
};
