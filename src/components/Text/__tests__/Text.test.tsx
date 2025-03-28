import React from 'react';
import { render, screen } from '@testing-library/react';

import { Text, type TextProps, TextPrimaryTheme } from '..';

const renderText = (props: Partial<TextProps>) => {
  return render(
    <Text size={'l'} theme={TextPrimaryTheme} {...props}>
      {props.children}
    </Text>
  );
};

describe('Text', () => {
  it('should be defined', () => {
    expect(Text).toBeDefined();
  });

  it('should render text correctly', async () => {
    const text = 'Text';

    renderText({ children: text });

    const elements = screen.getAllByText(text);

    expect(elements).toHaveLength(1);
  });
});
