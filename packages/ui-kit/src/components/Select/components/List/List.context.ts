import { createContext, useContext } from 'react';

import { noop } from '@ui-kit/utils';

type ListContextValue = {
  /**
   * Measures the rendered item, so the virtualized list knows its real height.
   */
  measureItem: (element: HTMLElement | null) => void;
};

const ListContext = createContext<ListContextValue>({
  measureItem: noop,
});

const ListProvider = ListContext.Provider;

const useListContext = () => useContext(ListContext);

export { ListProvider, useListContext };
