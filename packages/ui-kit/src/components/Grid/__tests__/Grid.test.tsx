import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Grid, type GridProps } from '..';

import '@testing-library/jest-dom';

const DATA_COMPONENT_TEST_ID = 'Grid';
const DATA_CHILDREN_TEST_ID = 'GridChildren';

const renderGrid = (props?: Partial<GridProps>) =>
  render(
    <Grid data-testid={DATA_COMPONENT_TEST_ID} {...props}>
      <p data-testid={DATA_CHILDREN_TEST_ID}>Content</p>
    </Grid>
  );

const getGaps = (element: HTMLElement) => ({
  x: element.style.columnGap,
  y: element.style.rowGap,
});

const getTemplates = (element: HTMLElement) => ({
  columns: element.style.gridTemplateColumns,
  rows: element.style.gridTemplateRows,
  areas: element.style.gridTemplateAreas,
});

describe('Grid', () => {
  it('should be defined', () => {
    expect(Grid).toBeDefined();
  });

  it('should pass className to the root element', () => {
    renderGrid({ className: 'my-class' });

    expect(screen.getByTestId(DATA_COMPONENT_TEST_ID)).toHaveClass('my-class');
  });

  it('should apply the default layout styles', () => {
    renderGrid();

    const { style } = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    expect(style.display).toBe('grid');
    expect(style.alignItems).toBe('stretch');
    expect(style.justifyContent).toBe('start');
  });

  it('should render children', () => {
    renderGrid();

    expect(screen.getByTestId(DATA_CHILDREN_TEST_ID)).toBeInTheDocument();
  });

  it('should render the tag passed in as', () => {
    renderGrid({ as: 'span' });

    expect(screen.getByTestId(DATA_COMPONENT_TEST_ID).tagName).toBe('SPAN');
  });

  it('should forward ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();

    render(<Grid ref={ref} data-testid={DATA_COMPONENT_TEST_ID} />);

    expect(ref.current).toBe(screen.getByTestId(DATA_COMPONENT_TEST_ID));
  });

  it('should not pass layout props to the DOM', () => {
    renderGrid({
      display: 'inline-grid',
      columns: '3',
      rows: '2',
      areas: '"a b"',
      flow: 'column',
      align: 'center',
      justify: 'between',
      alignContent: 'center',
      justifyItems: 'center',
      gap: '2',
      gapX: '1',
      gapY: '3',
    });

    const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

    [
      'display',
      'columns',
      'rows',
      'areas',
      'flow',
      'align',
      'justify',
      'alignContent',
      'justifyItems',
      'gap',
      'gapX',
      'gapY',
    ].forEach((attr) => {
      expect(element).not.toHaveAttribute(attr);
    });
  });

  describe('template', () => {
    it('should not set templates by default', () => {
      renderGrid();

      const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

      expect(getTemplates(element)).toEqual({
        columns: '',
        rows: '',
        areas: '',
      });
    });

    it('should create equal tracks from a number', () => {
      renderGrid({ columns: '3', rows: '12' });

      const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

      expect(getTemplates(element)).toEqual({
        columns: 'repeat(3, minmax(0, 1fr))',
        rows: 'repeat(12, minmax(0, 1fr))',
        areas: '',
      });
    });

    it('should pass any other template and areas as is', () => {
      renderGrid({
        columns: '200px 1fr',
        rows: 'auto 1fr',
        areas: '"header header" "sidebar main"',
      });

      expect(getTemplates(screen.getByTestId(DATA_COMPONENT_TEST_ID))).toEqual({
        columns: '200px 1fr',
        rows: 'auto 1fr',
        areas: '"header header" "sidebar main"',
      });
    });
  });

  describe('gap', () => {
    it('should not set gaps when gap props are not passed', () => {
      renderGrid();

      expect(getGaps(screen.getByTestId(DATA_COMPONENT_TEST_ID))).toEqual({
        x: '',
        y: '',
      });
    });

    it('should set only the passed axis', () => {
      renderGrid({ gapX: '1' });

      expect(getGaps(screen.getByTestId(DATA_COMPONENT_TEST_ID))).toEqual({
        x: '4px',
        y: '',
      });
    });

    it('should set both gaps from gap', () => {
      renderGrid({ gap: '4' });

      expect(getGaps(screen.getByTestId(DATA_COMPONENT_TEST_ID))).toEqual({
        x: '16px',
        y: '16px',
      });
    });

    it('should override gap with gapX and gapY', () => {
      renderGrid({ gap: '2', gapX: '1', gapY: '6' });

      expect(getGaps(screen.getByTestId(DATA_COMPONENT_TEST_ID))).toEqual({
        x: '4px',
        y: '24px',
      });
    });
  });

  describe('asChild', () => {
    it('should render the child element instead of its own', () => {
      const { container } = render(
        <Grid asChild as="span" columns="2" gap="1">
          <ul data-testid={DATA_COMPONENT_TEST_ID} />
        </Grid>
      );

      const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

      expect(element.tagName).toBe('UL');
      expect(container.firstChild).toBe(element);
      expect(element.style.display).toBe('grid');
      expect(element.style.gridTemplateColumns).toBe(
        'repeat(2, minmax(0, 1fr))'
      );
      expect(getGaps(element).x).toBe('4px');
    });

    it('should merge className and style with the child ones', () => {
      render(
        <Grid
          asChild
          gap="2"
          className="grid-class"
          style={{ color: 'red', margin: 0 }}
        >
          <ul
            data-testid={DATA_COMPONENT_TEST_ID}
            className="child-class"
            style={{ color: 'blue' }}
          />
        </Grid>
      );

      const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

      expect(element).toHaveClass('grid-class', 'child-class');
      expect(getGaps(element).x).toBe('8px');
      expect(element.style.color).toBe('blue');
      expect(element.style.margin).toBe('0px');
    });

    it('should call both Grid and child handlers', async () => {
      const handleGridClick = jest.fn();
      const handleChildClick = jest.fn();

      render(
        <Grid asChild onClick={handleGridClick}>
          <ul data-testid={DATA_COMPONENT_TEST_ID} onClick={handleChildClick} />
        </Grid>
      );

      await userEvent.click(screen.getByTestId(DATA_COMPONENT_TEST_ID));

      expect(handleGridClick).toHaveBeenCalledTimes(1);
      expect(handleChildClick).toHaveBeenCalledTimes(1);
    });

    it('should set both Grid and child refs', () => {
      const gridRef = createRef<HTMLDivElement>();
      const childRef = createRef<HTMLUListElement>();

      render(
        <Grid asChild ref={gridRef}>
          <ul data-testid={DATA_COMPONENT_TEST_ID} ref={childRef} />
        </Grid>
      );

      const element = screen.getByTestId(DATA_COMPONENT_TEST_ID);

      expect(gridRef.current).toBe(element);
      expect(childRef.current).toBe(element);
    });
  });
});
