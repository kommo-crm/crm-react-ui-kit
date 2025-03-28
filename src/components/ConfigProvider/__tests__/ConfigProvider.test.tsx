import React from 'react';
import { render } from '@testing-library/react';

import { Appearance, APPEARANCE_ATTRIBUTE_NAME } from 'src/lib/appearance';

import { ConfigProvider } from '../ConfigProvider';

interface ComponentProps {
  /**
   * Current appearance in a particular test
   */
  appearance?: Appearance;
}

const TestConfigProvider = ({
  appearance = Appearance.DEFAULT,
}: ComponentProps) => {
  return (
    <ConfigProvider appearance={appearance}>
      <div>Test Child</div>
    </ConfigProvider>
  );
};

describe('ConfigProvider', () => {
  afterEach(() => {
    document.documentElement.removeAttribute(APPEARANCE_ATTRIBUTE_NAME);
  });

  it('should be defined', () => {
    expect(ConfigProvider).toBeDefined();
  });

  it('should set the appearance attribute on the document element', () => {
    render(<TestConfigProvider />);

    expect(
      document.documentElement.getAttribute(APPEARANCE_ATTRIBUTE_NAME)
    ).toBe(Appearance.DEFAULT);
  });

  it('should update the appearance attribute when appearance prop changes', () => {
    const { rerender } = render(<TestConfigProvider />);

    expect(
      document.documentElement.getAttribute(APPEARANCE_ATTRIBUTE_NAME)
    ).toBe(Appearance.DEFAULT);

    rerender(<TestConfigProvider appearance={Appearance.ALTERNATIVE} />);

    expect(
      document.documentElement.getAttribute(APPEARANCE_ATTRIBUTE_NAME)
    ).toBe(Appearance.ALTERNATIVE);
  });

  it('should render children correctly', () => {
    const { getAllByText } = render(<TestConfigProvider />);

    expect(getAllByText('Test Child')).toHaveLength(1);
  });
});
