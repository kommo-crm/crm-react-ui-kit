import React from 'react';

import { type ContextProps } from './createComponentContext.props';

export const createComponentContext = <T extends object | null>(
  rootComponentName: string,
  defaultContext?: T
) => {
  const Context = React.createContext<T | undefined>(defaultContext);

  const Provider: ContextProps<T> = (props) => {
    const { children, ...context } = props;

    const value = React.useMemo(() => context, Object.values(context)) as T;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContext = (consumerName: string) => {
    const context = React.useContext(Context);

    if (context) {
      return context;
    }

    throw new Error(
      `\`${consumerName}\` must be used within \`${rootComponentName}\``
    );
  };

  return [Provider, useContext] as const;
};
