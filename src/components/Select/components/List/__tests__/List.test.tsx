import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TextSecondaryDarkTheme } from 'src/components/Text';

import { List, type ListProps } from '..';

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
    expect(List.Item).toBeDefined();
  });

  it('should render as <ul> by default', () => {
    const { container } = renderList();

    expect(container.querySelector('ul')).toBeInTheDocument();
    expect(container.querySelector('ol')).not.toBeInTheDocument();
  });

  it('should render as <ol> when type is numbered', () => {
    const { container } = renderList({ type: 'numbered' });

    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container.querySelector('ul')).not.toBeInTheDocument();
  });

  it('should render all children', () => {
    renderList();

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should render the correct number of <li> elements', () => {
    renderList();

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('should apply custom className', () => {
    const customClass = 'my-list';

    const { container } = renderList({ className: customClass });

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('should pass HTML attributes to the root element', () => {
    const { container } = renderList({ 'aria-label': 'Plain list' });

    expect(container.firstChild).toHaveAttribute('aria-label', 'Plain list');
  });

  it('should apply a custom theme without crashing', () => {
    expect(() => renderList({ theme: TextSecondaryDarkTheme })).not.toThrow();
  });

  it('should support nested lists', () => {
    render(
      <List type="bulleted">
        <List.Item>Top level</List.Item>
        <List.Item>
          Has children
          <List type="numbered">
            <List.Item>Nested 1</List.Item>
            <List.Item>Nested 2</List.Item>
          </List>
        </List.Item>
      </List>
    );

    expect(screen.getByText('Top level')).toBeInTheDocument();
    expect(screen.getByText('Nested 1')).toBeInTheDocument();
    expect(screen.getByText('Nested 2')).toBeInTheDocument();
    expect(screen.getAllByRole('list')).toHaveLength(2);
  });

  describe('List.Item', () => {
    it('should render as <li>', () => {
      render(
        <List>
          <List.Item>Plain item</List.Item>
        </List>
      );

      const item = screen.getByRole('listitem');

      expect(item.tagName).toBe('LI');
    });

    it('should apply custom className to the item', () => {
      render(
        <List>
          <List.Item className="my-item">Plain item</List.Item>
        </List>
      );

      expect(screen.getByRole('listitem')).toHaveClass('my-item');
    });
  });
});
