import React from 'react';
import { type Decorator } from '@storybook/react';

import { GridProvider } from '../../components';

/**
 * It is needed for binding the grid to Preview background into Docs.
 */
export const WithGridProvider: Decorator = (Component, context) => {
  const { backgrounds } = context.globals;

  return (
    <GridProvider backgrounds={backgrounds}>
      <Component />
    </GridProvider>
  );
};
