import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';

import {
  FilterTabs,
  TabPrimaryTheme,
  FilterTabsTheme,
  FilterTabsItemRootTheme,
  type FilterTabsProps,
} from '..';

import '@testing-library/jest-dom';

const defaultFilterTabsValues = [
  {
    theme: FilterTabsItemRootTheme,
    name: 'option1',
  },
  {
    theme: FilterTabsItemRootTheme,
    name: 'option2',
  },
];

const oneSelectedFilterTabsValues = [
  {
    theme: FilterTabsItemRootTheme,
    name: 'option1',
    isDefaultActive: true,
  },
  {
    theme: FilterTabsItemRootTheme,
    name: 'option2',
  },
];

const renderFilterTabs = (
  filterTabsProps?: Partial<FilterTabsProps>,
  items = defaultFilterTabsValues
) => {
  const onClickMock = jest.fn();

  const renderResult = render(
    <FilterTabs
      theme={FilterTabsTheme}
      onChange={onClickMock}
      data-testid="filter-tabs"
      {...filterTabsProps}
    >
      <FilterTabs.ItemRootReset theme={FilterTabsItemRootTheme}>
        <FilterTabs.TabReset theme={TabPrimaryTheme}>
          Select All
        </FilterTabs.TabReset>
      </FilterTabs.ItemRootReset>

      {items.map((tab) => (
        <FilterTabs.ItemRoot key={tab.name as string} {...tab}>
          <FilterTabs.Tab theme={TabPrimaryTheme}>{tab.name}</FilterTabs.Tab>
        </FilterTabs.ItemRoot>
      ))}
    </FilterTabs>
  );

  return [renderResult as RenderResult, onClickMock];
};

describe('FilterTabs Component', () => {
  test('should renders FilterTabs with children', () => {
    renderFilterTabs();
    expect(screen.getByTestId('filter-tabs')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  test('should call onChange on tab click', () => {
    const [, onClickMock] = renderFilterTabs();

    const tab2 = screen.getByText('option2');

    fireEvent.click(tab2);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(
      expect.arrayContaining(['option2']),
      'option2'
    );
  });

  test('should apply selected class on tab click', () => {
    const [, onClickMock] = renderFilterTabs();

    const tab1 = screen.getByText('option1');

    fireEvent.click(tab1);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(tab1).toHaveClass('selected');
  });

  test('should allow multi-select functionality', () => {
    const [, onClickMock] = renderFilterTabs({ isMultiSelect: true });

    const tab1 = screen.getByText('option1');
    const tab2 = screen.getByText('option2');

    fireEvent.click(tab1);
    fireEvent.click(tab2);

    expect(onClickMock).toHaveBeenCalledTimes(2);
    expect(tab1).toHaveClass('selected');
    expect(tab2).toHaveClass('selected');
    expect(onClickMock).toHaveBeenCalledWith(
      expect.arrayContaining(['option1', 'option2']),
      'option2'
    );
  });

  test('should disable multi-select functionality', () => {
    const [, onClickMock] = renderFilterTabs({}, oneSelectedFilterTabsValues);

    const tab2 = screen.getByText('option2');

    fireEvent.click(tab2);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(tab2).toHaveClass('selected');
    expect(onClickMock).toHaveBeenCalledWith(
      expect.arrayContaining(['option2']),
      'option2'
    );
  });

  test('should apply global disabled state to all tabs', () => {
    const [, onClickMock] = renderFilterTabs({
      isDisabled: true,
    });

    const tab1 = screen.getByText('option1');
    const tab2 = screen.getByText('option2');
    const selectAll = screen.getByText('Select All');

    fireEvent.click(tab1);

    expect(onClickMock).toHaveBeenCalledTimes(0);
    expect(tab1).toBeDisabled();
    expect(tab2).toBeDisabled();
    expect(selectAll).toBeDisabled();
  });
});
