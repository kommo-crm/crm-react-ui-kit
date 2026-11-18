import type { Measurements } from '../measurements.types';

/**
 * The most leading tabs that fit into the whole panel. The overflow button
 * is not reserved: its width is known only once it is rendered, so the split
 * search checks the real button and drops tabs until it fits.
 */
export const getFirstCandidate = (measurements: Measurements): number => {
  const { tabWidths, panelWidth } = measurements;

  let visibleCount = 0;
  let usedWidth = 0;

  while (visibleCount < tabWidths.length) {
    usedWidth += tabWidths[visibleCount];

    if (usedWidth > panelWidth) {
      break;
    }

    visibleCount += 1;
  }

  return visibleCount;
};
