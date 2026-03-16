import React from 'react';
import { render, screen } from '@testing-library/react';

import { noop } from 'src/utils';

import '@testing-library/jest-dom';

import { createComponentContext, type ContextProps } from '..';

type ContextType = {
  name?: string;
};

const renderComponentWithProvider = (
  providerValue: ContextType,
  Provider: ContextProps<ContextType>,
  Component: React.FC
) => {
  render(
    <Provider {...providerValue}>
      <Component />
    </Provider>
  );
};

const DEFAULT_ROOT_COMPONENT_NAME = 'RootComponent';
const DEFAULT_CONSUMER_COMPONENT_NAME = 'ConsumerName';

describe('createComponentContext', () => {
  it('should return the default context value', () => {
    const defaultValue: ContextType = { name: 'Default' };
    const [, useContext] = createComponentContext<ContextType>(
      DEFAULT_ROOT_COMPONENT_NAME,
      defaultValue
    );

    const TestComponent: React.FC = () => {
      const context = useContext(DEFAULT_CONSUMER_COMPONENT_NAME);

      return <div>{context?.name}</div>;
    };

    render(<TestComponent />);

    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('should return the provided context value', () => {
    const [Provider, useContext] = createComponentContext<ContextType>(
      DEFAULT_ROOT_COMPONENT_NAME
    );

    const TestComponent: React.FC = () => {
      const context = useContext(DEFAULT_CONSUMER_COMPONENT_NAME);

      return <div>{context?.name}</div>;
    };

    renderComponentWithProvider({ name: 'Provided' }, Provider, TestComponent);

    expect(screen.getByText('Provided')).toBeInTheDocument();
  });

  it('should throw an error when context is not provided and no default is set', () => {
    const [, useContext] = createComponentContext<ContextType>(
      DEFAULT_ROOT_COMPONENT_NAME
    );

    const TestComponent: React.FC = () => {
      useContext(DEFAULT_CONSUMER_COMPONENT_NAME);

      return null;
    };

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(noop);

    expect(() => render(<TestComponent />)).toThrow(
      `\`${DEFAULT_CONSUMER_COMPONENT_NAME}\` must be used within \`${DEFAULT_ROOT_COMPONENT_NAME}\``
    );

    consoleErrorSpy.mockRestore();
  });

  it('should update context value when props change', () => {
    const [Provider, useContext] = createComponentContext<ContextType>(
      DEFAULT_ROOT_COMPONENT_NAME,
      {
        name: 'Initial',
      }
    );

    const TestComponent: React.FC = () => {
      const context = useContext(DEFAULT_CONSUMER_COMPONENT_NAME);

      return <div>{context?.name}</div>;
    };

    renderComponentWithProvider({ name: 'Initial' }, Provider, TestComponent);

    expect(screen.getByText('Initial')).toBeInTheDocument();

    renderComponentWithProvider({ name: 'Updated' }, Provider, TestComponent);

    expect(screen.getByText('Updated')).toBeInTheDocument();
  });
});
