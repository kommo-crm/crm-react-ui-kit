import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Flex, type FlexProps } from '..';

import '@testing-library/jest-dom';

const DATA_COMPONENT_TEST_ID = 'Flex';
const DATA_CHILDREN_TEST_ID = 'FlexChildren';

const renderFlex = (props?: Partial<FlexProps>) =>
  render(
    <Flex data-testid={DATA_COMPONENT_TEST_ID} {...props}>
      <p data-testid={DATA_CHILDREN_TEST_ID}>Content</p>
    </Flex>
  );

const getGaps = (element: HTMLElement) => ({
  x: element.style.columnGap,
  y: element.style.rowGap,
});

describe('Flex', () => {
  it('should be defined', () => {
    expect(Flex).toBeDefined();
  });

  it('should pass className to the root element', () => {
    renderFlex({ className: 'my-class' });

    expect(screen.getByTestId(DATA_COMPONENT_TEST_ID)).toHaveClass('my-class');
  });

  it('should render children', () => {
    renderFlex();

    expect(screen.getByTestId(DATA_CHILDREN_TEST_ID)).toBeInTheDocument();
  });

  it('should render the tag passed in as', () => {
    renderFlex({ as: 'span' });

    expect(screen.getByTestId(DATA_COMPONENT_TEST_ID).tagName).toBe('SPAN');
  });

  it('should forward ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();

    render(<Flex ref={ref} data-testid={DATA_COMPONENT_TEST_ID} />);

    expect(ref.current).toBe(screen.getByTestId(DATA_COMPONENT_TEST_ID));
  });

  it('should not pass layout props to the DOM', () => {
    renderFlex({
      display: 'inline-flex',
      direction: 'column',
      align: 'center',
      justify: 'between',
      wrap: 'wrap',
      gap: '2',
      gapX: '1',
      gapY: '3',
    });

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    [
      'display',
      'direction',
      'align',
      'justify',
      'wrap',
      'gap',
      'gapX',
      'gapY',
    ].forEach((attr) => {
      expect(element).not.toHaveAttribute(attr);
    });
  });

  describe('gap', () => {
    it('should not set gaps when gap props are not passed', () => {
      renderFlex();

      expect(getGaps(screen.getByTestId(DATA_COMPONENT_TEST_ID))).toEqual({
        x: '',
        y: '',
      });
    });

    it('should set only the passed axis', () => {
      renderFlex({ gapX: '1' });

      expect(getGaps(screen.getByTestId(DATA_COMPONENT_TEST_ID))).toEqual({
        x: '4px',
        y: '',
      });
    });

    it('should set both gaps from gap', () => {
      renderFlex({ gap: '4' });

      expect(getGaps(screen.getByTestId(DATA_COMPONENT_TEST_ID))).toEqual({
        x: '16px',
        y: '16px',
      });
    });

    it('should override gap with gapX and gapY', () => {
      renderFlex({ gap: '2', gapX: '1', gapY: '6' });

      expect(getGaps(screen.getByTestId(DATA_COMPONENT_TEST_ID))).toEqual({
        x: '4px',
        y: '24px',
      });
    });
  });

  describe('asChild', () => {
    it('should render the child element instead of its own', () => {
      const { container } = render(
        <Flex asChild as="span" direction="column" gap="1">
          <ul data-testid={DATA_COMPONENT_TEST_ID} />
        </Flex>
      );

      const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

      expect(element.tagName).toBe('UL');
      expect(container.firstChild).toBe(element);
      expect(element.style.flexDirection).toBe('column');
      expect(getGaps(element).x).toBe('4px');
    });

    it('should merge className and style with the child ones', () => {
      render(
        <Flex
          asChild
          gap="2"
          className="flex-class"
          style={{ color: 'red', margin: 0 }}
        >
          <ul
            data-testid={DATA_COMPONENT_TEST_ID}
            className="child-class"
            style={{ color: 'blue' }}
          />
        </Flex>
      );

      const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

      expect(element).toHaveClass('flex-class', 'child-class');
      expect(getGaps(element).x).toBe('8px');
      expect(element.style.color).toBe('blue');
      expect(element.style.margin).toBe('0px');
    });

    it('should call both Flex and child handlers', async () => {
      const handleFlexClick = jest.fn();
      const handleChildClick = jest.fn();

      render(
        <Flex asChild onClick={handleFlexClick}>
          <ul data-testid={DATA_COMPONENT_TEST_ID} onClick={handleChildClick} />
        </Flex>
      );

      await userEvent.click(screen.getByTestId(DATA_COMPONENT_TEST_ID));

      expect(handleFlexClick).toHaveBeenCalledTimes(1);
      expect(handleChildClick).toHaveBeenCalledTimes(1);
    });

    it('should set both Flex and child refs', () => {
      const flexRef = createRef<HTMLDivElement>();
      const childRef = createRef<HTMLUListElement>();

      render(
        <Flex asChild ref={flexRef}>
          <ul data-testid={DATA_COMPONENT_TEST_ID} ref={childRef} />
        </Flex>
      );

      const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

      expect(flexRef.current).toBe(element);
      expect(childRef.current).toBe(element);
    });
  });
});
