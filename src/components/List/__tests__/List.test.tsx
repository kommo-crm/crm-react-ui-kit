import React, { useRef } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { List, ListTheme, ListProps } from '..';

const ListWithRef = (props: ListProps) => {
  const listRef = useRef<HTMLUListElement>(null);

  return <List {...props} ref={listRef} />;
};

const renderList = (props: Partial<ListProps>) => {
  return render(
    <ListWithRef role="list" theme={ListTheme} isOpened {...props}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ListWithRef>
  );
};

describe('List', () => {
  it('should be defined', () => {
    expect(List).toBeDefined();
  });

  it('should render as a list element', () => {
    renderList({});

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    renderList({});

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'my-custom-class';

    renderList({ className: customClass });

    const element = screen.getByRole('list');

    expect(element).toHaveClass(customClass);
  });

  it('should call onScroll callback when scrolled', () => {
    const onScroll = jest.fn();

    renderList({ onScroll });

    const element = screen.getByRole('list');

    fireEvent.scroll(element);

    expect(onScroll).toHaveBeenCalled();
  });

  it('should handle keyboard navigation', () => {
    const onSelect = jest.fn();
    const onToggle = jest.fn();

    renderList({ onSelect, onToggle });

    const element = screen.getByRole('list');

    element.focus();

    fireEvent.keyDown(element, { code: 'Enter' });

    expect(onSelect).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(element, { code: 'Escape' });

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should call onHoveredIndexChange when hoveredIndex changes', () => {
    const onHoveredIndexChange = jest.fn();

    renderList({ onHoveredIndexChange });

    const element = screen.getByRole('list');

    element.focus();

    act(() => {
      fireEvent.keyDown(element, { code: 'ArrowDown' });
    });

    expect(onHoveredIndexChange).toHaveBeenCalledWith(1);

    act(() => {
      fireEvent.keyDown(element, { code: 'ArrowUp' });
    });

    expect(onHoveredIndexChange).toHaveBeenCalledWith(1);
  });

  it('should call onSelect with the correct index', () => {
    const onSelect = jest.fn();

    renderList({ onSelect });

    const element = screen.getByRole('list');

    element.focus();

    fireEvent.keyDown(element, { code: 'ArrowDown' });
    fireEvent.keyDown(element, { code: 'ArrowDown' });
    fireEvent.keyDown(element, { code: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith(2);

    fireEvent.keyDown(element, { code: 'ArrowUp' });
    fireEvent.keyDown(element, { code: 'ArrowUp' });
    fireEvent.keyDown(element, { code: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it('should not apply the opened styles when isOpened is false', () => {
    const onSelect = jest.fn();
    const onHoveredIndexChange = jest.fn();

    renderList({ isOpened: false, onSelect, onHoveredIndexChange });

    const element = screen.queryByRole('list');

    expect(element).not.toBeInTheDocument();
  });
});
