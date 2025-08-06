import React, { useState } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';

import {
  ContextMenu,
  ContextMenuRootTheme,
  ContextMenuTriggerTheme,
  ContextMenuArrowTheme,
  ContextMenuContentTheme,
} from 'src/components/ContextMenu';

import { ContextMenuSubSelectItemTheme } from '../components/Item';
import { ContextMenuSubSelectValueTheme } from '../components/Value';
import { ContextMenuSubSelectTriggerTheme } from '../components/Trigger';
import { ContextMenuSubSelectContentTheme } from '../components/Content';
import { SortDirection } from '../SubSelect.enums';
import { SubSelectOption } from '../SubSelect.types';
import { SubSelectProps } from '../SubSelect.props';

const DATA_ROOT_TEST_ID = 'ContextMenuSubSelectRoot';
const DATA_ITEM_TEST_ID = 'ContextMenuSubSelectItem';
const DATA_TRIGGER_TEST_ID = 'ContextMenuSubSelectTrigger';
const DATA_CONTENT_TEST_ID = 'ContextMenuSubSelectContent';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const subSelectOptions: SubSelectOption[] = [
  { option: 'Date', value: 'date', sortable: true },
  { option: 'Name', value: 'name' },
];

const renderContextMenuSubSelect = async (props?: Partial<SubSelectProps>) => {
  const ContextMenuSubSelectWrapped = () => {
    const [sortDir, setSortDir] = useState<SortDirection>();
    const [selected, setSelected] = useState<SubSelectOption>();

    return (
      <ContextMenu.Root theme={ContextMenuRootTheme} open>
        <ContextMenu.Trigger theme={ContextMenuTriggerTheme}>
          <ContextMenuTriggerIcon />
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content theme={ContextMenuContentTheme} sideOffset={5}>
            <ContextMenu.SubSelect.Root
              value={selected}
              sortDirection={sortDir}
              onChange={(value, dir) => {
                setSelected(value);
                setSortDir(dir);
              }}
              data-testid={DATA_ROOT_TEST_ID}
              {...props}
            >
              <ContextMenu.SubSelect.Trigger
                theme={ContextMenuSubSelectTriggerTheme}
                data-testid={DATA_TRIGGER_TEST_ID}
              >
                <ContextMenu.SubSelect.Value
                  theme={ContextMenuSubSelectValueTheme}
                  label="Sort by"
                  placeholder="Placeholder"
                />
              </ContextMenu.SubSelect.Trigger>

              <ContextMenu.SubSelect.Content
                theme={ContextMenuSubSelectContentTheme}
                data-testid={DATA_CONTENT_TEST_ID}
              >
                {subSelectOptions.map((option) => (
                  <ContextMenu.SubSelect.Item
                    theme={ContextMenuSubSelectItemTheme}
                    key={option.value}
                    item={option}
                    data-testid={DATA_ITEM_TEST_ID}
                  />
                ))}
              </ContextMenu.SubSelect.Content>
            </ContextMenu.SubSelect.Root>

            <ContextMenu.Arrow theme={ContextMenuArrowTheme} />
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    );
  };

  return render(<ContextMenuSubSelectWrapped />);
};

describe('ContextMenu.SubSelect', () => {
  it('should exist', () => {
    expect(ContextMenu.SubSelect).toBeDefined();
  });

  it('opens content when trigger is clicked', async () => {
    await renderContextMenuSubSelect();
    const trigger = screen.getByTestId(DATA_TRIGGER_TEST_ID);

    await userEvent.click(trigger);

    expect(screen.getByTestId(DATA_CONTENT_TEST_ID)).toBeVisible();
  });

  it('renders correct number of items', async () => {
    await renderContextMenuSubSelect();
    await userEvent.click(screen.getByTestId(DATA_TRIGGER_TEST_ID));

    const items = screen.getAllByTestId(DATA_ITEM_TEST_ID);

    expect(items).toHaveLength(subSelectOptions.length);
    expect(screen.getByText(subSelectOptions[0].option)).toBeInTheDocument();
    expect(screen.getByText(subSelectOptions[1].option)).toBeInTheDocument();
  });

  it('calls onChange with the selected option when an item is clicked', async () => {
    const onChangeMock = jest.fn();

    await renderContextMenuSubSelect({
      onChange: onChangeMock,
    } as Partial<SubSelectProps>);

    await userEvent.click(screen.getByTestId(DATA_TRIGGER_TEST_ID));

    const firstItem = screen.getAllByTestId(DATA_ITEM_TEST_ID)[0];

    await userEvent.click(firstItem);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled();
    });

    const calledWith = onChangeMock.mock.calls[0][0] as
      | SubSelectOption
      | undefined;

    expect(calledWith).toBeDefined();

    if (calledWith) {
      expect(calledWith.value).toBe(subSelectOptions[0].value);
      expect(calledWith.option).toBe(subSelectOptions[0].option);
    }
  });

  it('opens submenu on ArrowRight and allows navigation with ArrowUp/ArrowDown', async () => {
    await renderContextMenuSubSelect();

    const menusBefore = screen.queryAllByRole('menu');

    const trigger = screen.getByTestId(DATA_TRIGGER_TEST_ID);

    await userEvent.click(trigger);

    const items = screen.getAllByTestId(DATA_ITEM_TEST_ID);
    const firstItem = items[0];

    await userEvent.click(firstItem);
    expect(document.activeElement).toBe(firstItem);

    await userEvent.keyboard('{ArrowRight}');

    await waitFor(() => {
      const menusAfter = screen.queryAllByRole('menu');

      expect(menusAfter.length).toBeGreaterThan(menusBefore.length);
    });

    const menus = screen.queryAllByRole('menu');
    const submenu = menus[menus.length - 1];
    const submenuItems = within(submenu).getAllByRole('menuitem');

    expect(submenuItems.length).toBeGreaterThan(0);

    const firstSub = submenuItems[0];
    const secondSub = submenuItems[1];

    firstSub.focus();
    expect(document.activeElement).toBe(firstSub);

    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(
      submenuItems.length > 1 ? secondSub : firstSub
    );

    await userEvent.keyboard('{ArrowUp}');
    expect(document.activeElement).toBe(firstSub);
  });
});
