import React, { useLayoutEffect } from 'react';

import { type GridProviderProps } from './GridProvider.props';

export const GridProvider = ({
  backgrounds,
  children,
}: GridProviderProps): React.ReactNode => {
  const grid = backgrounds?.grid || false;

  /**
   * It is needed for binding the grid to Preview background into Docs.
   */
  useLayoutEffect(() => {
    const docsPreviewElements = document.getElementsByClassName('docs-story');

    Array.from(docsPreviewElements).forEach((element) => {
      element.classList.toggle('docs-story-with-grid', grid);
    });
  }, [grid]);

  return children;
};
