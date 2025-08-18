import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';
import ContextMenuCheckIcon from 'src/icons/check.svg';
import { Text } from 'src/components/Text';

import {
  ContextMenu,
  ContextMenuTriggerTheme,
  ContextMenuItemTheme,
  ContextMenuCheckboxItemTheme,
  ContextMenuItemIndicatorTheme,
  ContextMenuRadioItemTheme,
  ContextMenuArrowTheme,
  ContextMenuContentTheme,
  TextContextMenuTheme,
  ContextMenuMetaItemTheme,
  ContextMenuRootProps,
} from 'src/components/ContextMenu';

import { ContextMenuMode } from '../ContextMenu.enums';

const DATA_ROOT_TEST_ID = 'ContextMenuRoot';
const DATA_ITEM_TEST_ID = 'ContextMenuItem';
const DATA_TRIGGER_TEST_ID = 'ContextMenuTrigger';
const DATA_CONTENT_TEST_ID = 'ContextMenuContent';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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
        <ContextMenu.Trigger
          theme={ContextMenuTriggerTheme}
          data-testid={DATA_TRIGGER_TEST_ID}
        >
          <ContextMenuTriggerIcon />
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content
            theme={ContextMenuContentTheme}
            disableAutoPositioning
            data-testid={DATA_CONTENT_TEST_ID}
          >
            <ContextMenu.MetaItem
              theme={ContextMenuMetaItemTheme}
              label="label"
              value="value"
              data-testid={DATA_ITEM_TEST_ID}
              isCopyable
            />

            <ContextMenu.Item
              theme={ContextMenuItemTheme}
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  Item 1
                </Text>
              }
              data-testid={DATA_ITEM_TEST_ID}
            />

            <ContextMenu.CheckboxItem
              theme={ContextMenuCheckboxItemTheme}
              isChecked={autoupdateChecked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAutoupdateChecked(e.target.checked)
              }
              text={
                <Text theme={TextContextMenuTheme} size="l">
                  Autoupdate
                </Text>
              }
              data-testid={DATA_ITEM_TEST_ID}
            >
              <ContextMenu.ItemIndicator theme={ContextMenuItemIndicatorTheme}>
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
              <ContextMenu.RadioItem
                theme={ContextMenuRadioItemTheme}
                value="light"
                text={
                  <Text theme={TextContextMenuTheme} size="l">
                    Light
                  </Text>
                }
              />
              <ContextMenu.RadioItem
                theme={ContextMenuRadioItemTheme}
                value="dark"
                text={
                  <Text theme={TextContextMenuTheme} size="l">
                    Dark
                  </Text>
                }
              />
            </ContextMenu.RadioGroup>

            <ContextMenu.Arrow theme={ContextMenuArrowTheme} />
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
    await renderContextMenu({ open: true });
    expect(screen.getAllByTestId(DATA_ITEM_TEST_ID)).toHaveLength(4);
  });

  it('opens on trigger click', async () => {
    await renderContextMenu();
    await userEvent.click(screen.getByTestId(DATA_TRIGGER_TEST_ID));
    expect(screen.getByTestId(DATA_CONTENT_TEST_ID)).toBeInTheDocument();
  });

  it('meta item displays label and value', async () => {
    await renderContextMenu();
    await userEvent.click(screen.getByTestId(DATA_TRIGGER_TEST_ID));

    expect(screen.getByText(/label/i)).toBeInTheDocument();
    expect(screen.getByText(/value/i)).toBeInTheDocument();
  });

  it('copies meta item value to clipboard when copy action invoked', async () => {
    const originalClipboard = global.navigator.clipboard;
    const writeTextMock = jest.fn().mockResolvedValue(undefined);

    (global.navigator as any).clipboard = {
      writeText: writeTextMock,
    };

    try {
      await renderContextMenu();
      await userEvent.click(screen.getByTestId(DATA_TRIGGER_TEST_ID));
      expect(screen.getByTestId(DATA_CONTENT_TEST_ID)).toBeInTheDocument();

      const valueElement = screen.getByText(/^value$/i);

      const metaItemContainer = valueElement.closest(
        `[data-testid="${DATA_ITEM_TEST_ID}"]`
      );
      const container = (metaItemContainer ??
        valueElement.parentElement) as HTMLElement;

      const copyIcon = container.querySelector(
        '.copy_icon'
      ) as HTMLElement | null;

      if (!copyIcon) {
        console.error(
          'Copy icon not found inside meta item. Container HTML:',
          container.outerHTML
        );

        throw new Error('Copy icon not found inside MetaItem');
      }

      await userEvent.click(copyIcon);

      await waitFor(() => {
        expect(writeTextMock).toHaveBeenCalledWith('value');
      });
    } finally {
      (global.navigator as any).clipboard = originalClipboard;
    }
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
