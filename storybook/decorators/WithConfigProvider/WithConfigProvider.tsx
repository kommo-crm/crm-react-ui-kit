import React from 'react';
import { type Decorator } from '@storybook/react';

import { ConfigProvider } from 'src/components/ConfigProvider';

const CenteredStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export const WithConfigProvider: Decorator = (Component, context) => {
  const { appearance } = context.globals;
  const { centered } = context.parameters;

  return (
    <ConfigProvider appearance={appearance}>
      <div style={centered ? CenteredStyle : {}}>
        <Component />
      </div>
    </ConfigProvider>
  );
};
