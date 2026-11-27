import type { DoesSplitFitParams } from './doesSplitFit.types';

/**
 * Checks whether the leading tabs fit into the panel together with the
 * overflow button of the same split.
 */
export const doesSplitFit = (params: DoesSplitFitParams): boolean => {
  const { measurements, visibleCount, overflowWidth } = params;
  const { tabWidths, panelWidth } = measurements;

  const usedWidth = tabWidths
    .slice(0, visibleCount)
    .reduce((sum, width) => sum + width, 0);

  return usedWidth + overflowWidth <= panelWidth;
};
