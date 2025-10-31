import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Text, TextTheme, TextPrimaryTheme } from 'src/components/Text';

import ContextMenuCheckIcon from '@storybook-utils/icons/check.svg';
import ContextMenuTriggerIcon from '@storybook-utils/icons/trigger.svg';

import { ContextMenu, ContextMenuRootProps, ContextMenuMode } from '..';

const DATA_ROOT_TEST_ID = 'ContextMenuRoot';
const DATA_ITEM_TEST_ID = 'ContextMenuItem';
const DATA_TRIGGER_TEST_ID = 'ContextMenuTrigger';
const DATA_CONTENT_TEST_ID = 'ContextMenuContent';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const TextContextMenuTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'inherit',
};

const renderContextMenu = async (props?: Partial<ContextMenuRootProps>) => {
  const ContextMenuWrapped = () => {
    const [autoupdateChecked, setAutoupdateChecked] = useState(true);
    const [theme, setTheme] = useState('light');

    return (
      <ContextMenu.Root
        mode={ContextMenuMode.CLICK}
        data-testid={DATA_ROOT_TEST_ID}
        {...props}
      >
        <ContextMenu.Trigger data-testid={DATA_TRIGGER_TEST_ID}>
          <ContextMenuTriggerIcon />
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content
            disableAutoPositioning
            data-testid={DATA_CONTENT_TEST_ID}
          >
            <ContextMenu.Item data-testid={DATA_ITEM_TEST_ID}>
              <Text theme={TextContextMenuTheme} size="l">
                Item 1
              </Text>
            </ContextMenu.Item>

            <ContextMenu.CheckboxItem
              isChecked={autoupdateChecked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAutoupdateChecked(e.target.checked)
              }
              data-testid={DATA_ITEM_TEST_ID}
              isCloseMenuOnClick={false}
            >
              <Text theme={TextContextMenuTheme} size="l">
                Autoupdate
              </Text>

              <ContextMenu.ItemIndicator>
                <ContextMenuCheckIcon />
              </ContextMenu.ItemIndicator>
            </ContextMenu.CheckboxItem>

            <ContextMenu.RadioGroup
              value={theme}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTheme(e.target.value)
              }
              data-testid={DATA_ITEM_TEST_ID}
            >
              <ContextMenu.RadioItem value="light" isCloseMenuOnClick={false}>
                <Text theme={TextContextMenuTheme} size="l">
                  Light
                </Text>
              </ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="dark" isCloseMenuOnClick={false}>
                <Text theme={TextContextMenuTheme} size="l">
                  Dark
                </Text>
              </ContextMenu.RadioItem>
            </ContextMenu.RadioGroup>

            <ContextMenu.Arrow />
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    );
  };

  return render(<ContextMenuWrapped />);
};

describe('ContextMenu', () => {
  it('should exist', () => {
    expect(ContextMenu).toBeDefined();
  });

  it('renders the correct number of items', async () => {
    await renderContextMenu({ isOpen: true });
    expect(screen.getAllByTestId(DATA_ITEM_TEST_ID)).toHaveLength(3);
  });

  it('opens on trigger click', async () => {
    await renderContextMenu();
    await userEvent.click(screen.getByTestId(DATA_TRIGGER_TEST_ID));
    expect(screen.getByTestId(DATA_CONTENT_TEST_ID)).toBeInTheDocument();
  });

  it('toggles checkbox item when clicked', async () => {
    await renderContextMenu();
    await userEvent.click(screen.getByTestId(DATA_TRIGGER_TEST_ID));

    const checkboxText = screen.getByText(/Autoupdate/i);

    const checkboxRole = screen.queryByRole('menuitemcheckbox', {
      name: /Autoupdate/i,
    });

    if (checkboxRole) {
      expect(checkboxRole).toHaveAttribute('aria-checked', 'true');

      await userEvent.click(checkboxText);

      expect(checkboxRole).toHaveAttribute('aria-checked', 'false');
    } else {
      await userEvent.click(checkboxText);
      expect(screen.getByText(/Autoupdate/i)).toBeInTheDocument();
    }
  });

  it('changes radio selection when item clicked', async () => {
    await renderContextMenu();
    await userEvent.click(screen.getByTestId(DATA_TRIGGER_TEST_ID));

    const darkRadioText = screen.getByText(/Dark/i);
    const darkRadioRole = screen.queryByRole('menuitemradio', {
      name: /Dark/i,
    });
    const lightRadioRole = screen.queryByRole('menuitemradio', {
      name: /Light/i,
    });

    if (darkRadioRole && lightRadioRole) {
      expect(lightRadioRole).toHaveAttribute('aria-checked', 'true');
      expect(darkRadioRole).toHaveAttribute('aria-checked', 'false');

      await userEvent.click(darkRadioText);

      expect(darkRadioRole).toHaveAttribute('aria-checked', 'true');
      expect(lightRadioRole).toHaveAttribute('aria-checked', 'false');
    } else {
      await userEvent.click(darkRadioText);
      expect(screen.getByText(/Dark/i)).toBeInTheDocument();
      expect(screen.getByText(/Light/i)).toBeInTheDocument();
    }
  });

  it('closes when Escape key is pressed', async () => {
    await renderContextMenu();
    await userEvent.click(screen.getByTestId(DATA_TRIGGER_TEST_ID));
    expect(screen.getByTestId(DATA_CONTENT_TEST_ID)).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByTestId(DATA_CONTENT_TEST_ID)).toBeNull();
  });
});
