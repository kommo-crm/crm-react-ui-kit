import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Text, TextInheritColorTheme } from '@ui-kit/components/Text';

import { ContextMenuMode } from '../ContextMenu.enums';
import { ContextMenu } from '..';

/**
 * Controllers of the mocked `useIsAiming` instances that are currently
 * enabled. jsdom has no layout, so the real hook can never report aiming
 * and these scenarios are unreachable without the mock.
 */
const mockAimingControllers: Array<{ setAiming: (value: boolean) => void }> =
  [];

jest.mock('@kommo-crm/react-hooks', () => {
  const actual = jest.requireActual('@kommo-crm/react-hooks');
  const react = jest.requireActual<typeof import('react')>('react');

  return {
    ...actual,
    useIsAiming: ({
      isEnabled,
      onChange,
    }: {
      isEnabled?: boolean;
      onChange?: (aiming: boolean) => void;
    }) => {
      const ref = react.useRef(null);
      const isAimingRef = react.useRef(false);
      const onChangeRef = react.useRef(onChange);

      onChangeRef.current = onChange;

      react.useEffect(() => {
        if (!isEnabled) {
          return;
        }

        const controller = {
          setAiming: (value: boolean) => {
            if (isAimingRef.current === value) {
              return;
            }

            isAimingRef.current = value;
            onChangeRef.current?.(value);
          },
        };

        mockAimingControllers.push(controller);

        return () => {
          const index = mockAimingControllers.indexOf(controller);

          if (index !== -1) {
            mockAimingControllers.splice(index, 1);
          }

          isAimingRef.current = false;
        };
      }, [isEnabled]);

      return {
        isAiming: () => isAimingRef.current,
        ref,
      };
    },
  };
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const TRIGGER = 'ContextMenuTrigger';
const CONTENT = 'ContextMenuContent';
const SUB_TRIGGER = 'ContextMenuSubTrigger';
const SUB_CONTENT = 'ContextMenuSubContent';

const renderMenu = () =>
  render(
    <ContextMenu.Root mode={ContextMenuMode.CLICK}>
      <ContextMenu.Trigger data-testid={TRIGGER}>Menu</ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content disableAutoPositioning data-testid={CONTENT}>
          <ContextMenu.Sub mode={ContextMenuMode.HOVER}>
            <ContextMenu.SubTrigger data-testid={SUB_TRIGGER}>
              <Text theme={TextInheritColorTheme} size="l">
                SubTrigger
              </Text>
            </ContextMenu.SubTrigger>

            <ContextMenu.Portal>
              <ContextMenu.SubContent data-testid={SUB_CONTENT}>
                <ContextMenu.Item>
                  <Text theme={TextInheritColorTheme} size="l">
                    Item in Sub
                  </Text>
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );

/**
 * Makes `:hover` observable in jsdom: the document reports a hovered element,
 * while no menu element matches `:hover` - the cursor is outside of the menu.
 */
const mockCursorOutsideOfMenu = () => {
  const querySelector = document.querySelector.bind(document);

  return jest
    .spyOn(document, 'querySelector')
    .mockImplementation((selector: string) =>
      selector === ':hover' ? document.body : querySelector(selector)
    );
};

describe('ContextMenu aiming', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    mockAimingControllers.length = 0;
  });

  it('Closes hover Sub under a click Root when the cursor leaves during aiming', async () => {
    const user = userEvent.setup();
    const hoverSpy = mockCursorOutsideOfMenu();

    renderMenu();

    await user.click(screen.getByTestId(TRIGGER));

    await waitFor(() => {
      expect(screen.getByTestId(CONTENT)).toBeInTheDocument();
    });

    await user.hover(screen.getByTestId(SUB_TRIGGER));

    await waitFor(() => {
      expect(screen.getByTestId(SUB_CONTENT)).toBeInTheDocument();
    });

    /**
     * The cursor moves toward the submenu, so aiming starts. The parent menu
     * is notified about it and starts swallowing the leave events of its items.
     */
    expect(mockAimingControllers).toHaveLength(1);

    act(() => {
      mockAimingControllers[0].setAiming(true);
    });

    /**
     * The cursor leaves the trigger while aiming is still active - the leave
     * event never reaches the submenu.
     */
    await user.unhover(screen.getByTestId(SUB_TRIGGER));

    expect(screen.getByTestId(SUB_CONTENT)).toBeInTheDocument();

    /**
     * Aiming stops with the cursor outside of the submenu, so the missed leave
     * has to be replayed and the submenu has to close.
     */
    act(() => {
      mockAimingControllers[0].setAiming(false);
    });

    await waitFor(
      () => {
        expect(screen.queryByTestId(SUB_CONTENT)).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    hoverSpy.mockRestore();
  });

  it('Keeps hover Sub open when aiming stops with the cursor inside it', async () => {
    const user = userEvent.setup();

    renderMenu();

    await user.click(screen.getByTestId(TRIGGER));

    await waitFor(() => {
      expect(screen.getByTestId(CONTENT)).toBeInTheDocument();
    });

    await user.hover(screen.getByTestId(SUB_TRIGGER));

    await waitFor(() => {
      expect(screen.getByTestId(SUB_CONTENT)).toBeInTheDocument();
    });

    await user.hover(screen.getByTestId(SUB_CONTENT));

    act(() => {
      mockAimingControllers[0].setAiming(true);
    });

    act(() => {
      mockAimingControllers[0].setAiming(false);
    });

    expect(screen.getByTestId(SUB_CONTENT)).toBeInTheDocument();
  });
});
