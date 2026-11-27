import type { GetStaleVisibleCountParams } from './getStaleVisibleCount.types';

/**
 * Until the new tabs are measured, the tabs visible in the split stay
 * visible: by the old indexes, a tab inserted before a visible one would be
 * hidden for a commit, and Chrome drops focus from a hidden tab to body.
 * While the split had a menu and some tab is not among its visible ones, the
 * last tab stays in the menu, so the overflow button does not unmount and
 * take its focus away.
 */
export const getStaleVisibleCount = (
  params: GetStaleVisibleCountParams
): number => {
  const { split, tabValues } = params;

  const splitValues = split.tabsKey.split('\n');
  const visibleValues = new Set(splitValues.slice(0, split.visibleCount));

  const count = tabValues.reduce(
    (result, value, index) => (visibleValues.has(value) ? index + 1 : result),
    0
  );

  const hadMenu = split.visibleCount < splitValues.length;
  const hasMenuCandidate = tabValues.some((value) => !visibleValues.has(value));

  return hadMenu && hasMenuCandidate
    ? Math.min(count, tabValues.length - 1)
    : count;
};
