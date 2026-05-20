import React from 'react';
import { render, screen } from '@testing-library/react';

import { List, type ListProps } from '..';

import '@testing-library/jest-dom';

const renderList = (props: Partial<ListProps> = {}) => {
  return render(
    <List {...props}>
      <List.Item>Item 1</List.Item>
      <List.Item>Item 2</List.Item>
      <List.Item>Item 3</List.Item>
    </List>
  );
};

describe('List', () => {
  it('should be defined', () => {
    expect(List).toBeDefined();
  });

  it('should render List.Item', () => {
    expect(List.Item).toBeDefined();
  });

  it('should render as ul when type is bulleted', () => {
    renderList({ type: 'bulleted' });

    expect(screen.getByRole('list').tagName).toBe('UL');
  });

  it('should render as ol when type is numbered', () => {
    renderList({ type: 'numbered' });

    expect(screen.getByRole('list').tagName).toBe('OL');
  });

  it('should default to bulleted type', () => {
    renderList();

    expect(screen.getByRole('list').tagName).toBe('UL');
  });

  it('should render children', () => {
    renderList();

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    renderList({ className: 'custom-class' });

    expect(screen.getByRole('list')).toHaveClass('custom-class');
  });

  it('should forward ref for bulleted list', () => {
    const ref = React.createRef<HTMLUListElement>();

    render(
      <List type="bulleted" ref={ref}>
        <List.Item>Item</List.Item>
      </List>
    );

    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });

  it('should forward ref for numbered list', () => {
    const ref = React.createRef<HTMLUListElement>();

    render(
      <List type="numbered" ref={ref}>
        <List.Item>Item</List.Item>
      </List>
    );

    expect(ref.current).toBeInstanceOf(HTMLOListElement);
  });

  it('should render nested lists', () => {
    render(
      <List type="bulleted">
        <List.Item>
          Parent
          <List type="bulleted">
            <List.Item>Nested</List.Item>
          </List>
        </List.Item>
      </List>
    );

    expect(screen.getByText('Parent')).toBeInTheDocument();
    expect(screen.getByText('Nested')).toBeInTheDocument();
  });
});
