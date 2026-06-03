import React from 'react';
import { render } from '@testing-library/react';

import { Portal } from '..';

import '@testing-library/jest-dom';

describe('Portal', () => {
  it('should be defined', () => {
    expect(Portal).toBeDefined();
  });

  it('should render portal in document.body by default', () => {
    const { container } = render(
      <Portal className="portal">Test Content</Portal>
    );

    const { lastChild } = document.body;

    /**
     * render function wraps our component in a div, so the output will be like this html.
     * https://testing-library.com/docs/react-testing-library/api/#container
     * body
     *  <div /> - render() container
     *  <div class="portal">Test Content</div> - Portal content
     */
    expect(container).toBeEmptyDOMElement();
    expect(lastChild).toHaveTextContent('Test Content');
    expect(lastChild).toHaveClass('portal');
  });

  it('should render portal in specified container', () => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    const { container } = render(
      <Portal className="portal" container={div}>
        Test Content
      </Portal>
    );

    const { firstChild } = div;

    expect(container).toBeEmptyDOMElement();
    expect(firstChild).toHaveTextContent('Test Content');
    expect(firstChild).toHaveClass('portal');

    document.body.removeChild(div);
  });
});
