import React from 'react';
import { render, screen } from '@testing-library/react';

import { type ContentBlockProps, ContentBlock, ContentBlockTheme } from '..';

import '@testing-library/jest-dom';

const DATA_COMPONENT_TEST_ID = 'ContentBlock';
const DATA_CHILDREN_TEST_ID = 'ContentBlockChildren';

const renderContentBlock = (props?: Partial<ContentBlockProps>) => {
  return render(
    <ContentBlock
      theme={ContentBlockTheme}
      data-testid={DATA_COMPONENT_TEST_ID}
      {...props}
    >
      <p data-testid={DATA_CHILDREN_TEST_ID}>Content</p>
    </ContentBlock>
  );
};

describe('ContentBlock', () => {
  it('should be defined', () => {
    expect(ContentBlock).toBeDefined();
  });

  it('should apply custom css properties', async () => {
    const className = 'my-class';

    renderContentBlock({ className });

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(element).toHaveClass(className);
    /**
     * 1. Modular className
     * 2. Theme className
     * 3. Additional class `my-class`
     */
    expect(element.classList).toHaveLength(3);
  });

  it('should children be defined', async () => {
    renderContentBlock();

    const children = screen.getByTestId(DATA_CHILDREN_TEST_ID);

    expect(children).toBeInTheDocument();
  });
});
