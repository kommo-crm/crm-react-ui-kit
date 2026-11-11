import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import {
  Tooltip,
  TooltipPrimaryTheme,
  type TooltipRootProps,
  type TooltipThemeType,
} from '..';

const THEME_CLASS_NAME_PREFIX = 'crm-ui-kit-theme-';

const CUSTOM_THEME: TooltipThemeType = {
  ...TooltipPrimaryTheme,
  '--crm-ui-kit-tooltip-max-width': '120px',
};

const getThemeClassName = (element: HTMLElement) =>
  Array.from(element.classList).find((className) =>
    className.startsWith(THEME_CLASS_NAME_PREFIX)
  );

const getInjectedStyles = (className: string) =>
  Array.from(document.head.querySelectorAll('style'))
    .map((style) => style.textContent ?? '')
    .find((content) => content.includes(`.${className}`)) ?? '';

const getVisibleContent = () =>
  document.querySelector<HTMLElement>(
    '[data-radix-popper-content-wrapper] > *'
  );

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

type RenderOptions = {
  rootProps?: Partial<TooltipRootProps>;
  contentClassName?: string;
};

const renderTooltip = ({ rootProps, contentClassName }: RenderOptions = {}) => {
  const user = userEvent.setup();

  const renderTree = (props?: Partial<TooltipRootProps>) => (
    <Tooltip.Root theme={TooltipPrimaryTheme} {...props}>
      <Tooltip.Trigger>Trigger</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className={contentClassName}>
          Hint
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );

  const result = render(renderTree(rootProps));

  return {
    ...result,
    user,
    trigger: screen.getByRole('button', { name: 'Trigger' }),
    rerenderWith: (props: Partial<TooltipRootProps>) =>
      result.rerender(renderTree(props)),
  };
};

/**
 * Radix opens and closes on timers, so negative assertions need them flushed.
 */
const flushTimers = () =>
  act(() => new Promise((resolve) => setTimeout(resolve, 10)));

/**
 * Radix starts tracking the grace area only after `pointerleave`, so the close
 * needs one more pointer move outside of it. jsdom has no PointerEvent, and
 * user-event does not re-dispatch a move over the same target.
 */
const moveAway = async () => {
  await flushTimers();
  fireEvent(
    document.body,
    new MouseEvent('pointermove', { bubbles: true, clientX: 500, clientY: 500 })
  );
};

const expectClosed = () =>
  waitFor(() => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

describe('Tooltip', () => {
  it('opens on hover and closes on unhover', async () => {
    const { user, trigger } = renderTooltip();

    await user.hover(trigger);

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Hint');

    await user.unhover(trigger);
    await moveAway();

    await expectClosed();
  });

  it('renders content in a portal', async () => {
    const { user, trigger, container } = renderTooltip();

    await user.hover(trigger);

    const tooltip = await screen.findByRole('tooltip');

    expect(document.body.contains(tooltip)).toBe(true);
    expect(container.contains(tooltip)).toBe(false);
  });

  it('opens with no delay by default', async () => {
    const { user, trigger } = renderTooltip();

    await user.hover(trigger);

    /**
     * Far below the Radix default delay of 700ms.
     */
    expect(
      await screen.findByRole('tooltip', {}, { timeout: 300 })
    ).toBeInTheDocument();
  });

  it('links trigger and tooltip via aria-describedby', async () => {
    const { user, trigger } = renderTooltip();

    await user.hover(trigger);

    const tooltip = await screen.findByRole('tooltip');

    expect(tooltip.id).not.toBe('');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('controlled: isOpen keeps it open and unhover only calls onOpenChange(false)', async () => {
    const onOpenChange = jest.fn();
    const { user, trigger } = renderTooltip({
      rootProps: { isOpen: true, onOpenChange },
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await user.hover(trigger);
    await user.unhover(trigger);
    await moveAway();

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
    expect(onOpenChange).not.toHaveBeenCalledWith(true);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('controlled: switching to uncontrolled does not reopen from a request made while controlled', async () => {
    const onOpenChange = jest.fn();
    const { user, trigger, rerenderWith } = renderTooltip({
      rootProps: { isOpen: false, onOpenChange },
    });

    await user.hover(trigger);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    rerenderWith({});
    await flushTimers();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('isDefaultOpen renders open initially', () => {
    renderTooltip({ rootProps: { isDefaultOpen: true } });

    expect(screen.getByRole('tooltip')).toHaveTextContent('Hint');
  });

  it('disabled: hover does not open', async () => {
    const onOpenChange = jest.fn();
    const { user, trigger } = renderTooltip({
      rootProps: { isDisabled: true, onOpenChange },
    });

    await user.hover(trigger);
    await flushTimers();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('disabled: switching isDisabled to true closes an open tooltip', async () => {
    const { user, trigger, rerenderWith } = renderTooltip();

    await user.hover(trigger);
    await screen.findByRole('tooltip');

    rerenderWith({ isDisabled: true });

    await expectClosed();
  });

  it('disabled: does not block a controlled isOpen', () => {
    renderTooltip({ rootProps: { isOpen: true, isDisabled: true } });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('disabled: re-enabling does not reopen by itself', async () => {
    const { user, trigger, rerenderWith } = renderTooltip();

    await user.hover(trigger);
    await screen.findByRole('tooltip');

    rerenderWith({ isDisabled: true });
    await expectClosed();

    rerenderWith({ isDisabled: false });
    await flushTimers();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('trigger does not submit a surrounding form', async () => {
    const onSubmit = jest.fn((event: React.FormEvent) =>
      event.preventDefault()
    );
    const user = userEvent.setup();

    render(
      <form onSubmit={onSubmit}>
        <Tooltip.Root theme={TooltipPrimaryTheme}>
          <Tooltip.Trigger>Trigger</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content>Hint</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </form>
    );

    const trigger = screen.getByRole('button', { name: 'Trigger' });

    expect(trigger).toHaveAttribute('type', 'button');

    await user.click(trigger);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('trigger keeps a caller-provided type', () => {
    render(
      <Tooltip.Root theme={TooltipPrimaryTheme}>
        <Tooltip.Trigger type="submit">Trigger</Tooltip.Trigger>
      </Tooltip.Root>
    );

    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute(
      'type',
      'submit'
    );
  });

  it('trigger with asChild does not inject type', () => {
    render(
      <Tooltip.Root theme={TooltipPrimaryTheme}>
        <Tooltip.Trigger asChild>
          <span>Trigger</span>
        </Tooltip.Trigger>
      </Tooltip.Root>
    );

    expect(screen.getByText('Trigger')).not.toHaveAttribute('type');
  });

  it('applies default side/align', () => {
    renderTooltip({ rootProps: { isOpen: true } });

    const content = getVisibleContent();

    expect(content).toHaveAttribute('data-side', 'top');
    expect(content).toHaveAttribute('data-align', 'center');
  });

  it('applies theme class to content', () => {
    renderTooltip({ rootProps: { isOpen: true } });

    const themeClassName = getThemeClassName(getVisibleContent()!);

    expect(themeClassName).toBeDefined();
    expect(getInjectedStyles(themeClassName as string)).toContain(
      '--crm-ui-kit-tooltip-max-width: 240px;'
    );
  });

  it('custom theme overrides variables', () => {
    renderTooltip({ rootProps: { isOpen: true, theme: CUSTOM_THEME } });

    const themeClassName = getThemeClassName(getVisibleContent()!);

    expect(themeClassName).toBeDefined();
    expect(getInjectedStyles(themeClassName as string)).toContain(
      '--crm-ui-kit-tooltip-max-width: 120px;'
    );
  });

  it('passes className to content', () => {
    renderTooltip({
      rootProps: { isOpen: true },
      contentClassName: 'custom-content',
    });

    expect(getVisibleContent()).toHaveClass('custom-content');
  });

  it('passes style and aria-label to content', () => {
    render(
      <Tooltip.Root theme={TooltipPrimaryTheme} isOpen>
        <Tooltip.Trigger>Trigger</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            style={{ color: 'red' }}
            aria-label="Accessible hint"
          >
            Hint
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    );

    expect(getVisibleContent()).toHaveStyle({ color: 'red' });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Accessible hint');
  });

  it('portal mounts content into a custom container', () => {
    const container = document.createElement('div');

    document.body.appendChild(container);

    render(
      <Tooltip.Root theme={TooltipPrimaryTheme} isOpen>
        <Tooltip.Trigger>Trigger</Tooltip.Trigger>
        <Tooltip.Portal container={container}>
          <Tooltip.Content>Hint</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    );

    expect(container).toContainElement(screen.getByRole('tooltip'));

    container.remove();
  });

  it('marks the content as an inverse surface', () => {
    renderTooltip({ rootProps: { isOpen: true } });

    expect(getVisibleContent()).toHaveAttribute(
      'data-crm-ui-kit-surface',
      'inverse'
    );
  });

  it('hoverable content stays open while pointer is inside', async () => {
    const { user, trigger } = renderTooltip();

    await user.hover(trigger);
    await screen.findByRole('tooltip');

    await user.hover(getVisibleContent()!);
    await flushTimers();

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await user.unhover(getVisibleContent()!);
    await moveAway();

    await expectClosed();
  });
});

describe('Tooltip on touch', () => {
  const renderTouchTooltip = (rootProps?: Partial<TooltipRootProps>) => {
    const onClick = jest.fn();

    render(
      <Tooltip.Root theme={TooltipPrimaryTheme} {...rootProps}>
        <Tooltip.Trigger onClick={onClick}>Trigger</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>Hint</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    );

    return {
      onClick,
      trigger: screen.getByRole('button', { name: 'Trigger' }),
    };
  };

  /**
   * jsdom has no PointerEvent, so `pointerType` is set on a plain MouseEvent.
   */
  const firePointer = (
    element: HTMLElement,
    type: 'pointerdown' | 'pointerup' | 'pointercancel',
    pointerType: string
  ) => {
    const event = new MouseEvent(type, { bubbles: true, cancelable: true });

    Object.defineProperty(event, 'pointerType', { value: pointerType });
    fireEvent(element, event);
  };

  const tap = (element: HTMLElement) => {
    firePointer(element, 'pointerdown', 'touch');
    firePointer(element, 'pointerup', 'touch');
    fireEvent.click(element);
  };

  it('first tap opens the tooltip without activating the trigger', async () => {
    const { onClick, trigger } = renderTouchTooltip();

    tap(trigger);

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Hint');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('first tap does not run the default action of the trigger', () => {
    const onSubmit = jest.fn((event: React.FormEvent) =>
      event.preventDefault()
    );

    render(
      <form onSubmit={onSubmit}>
        <Tooltip.Root theme={TooltipPrimaryTheme}>
          <Tooltip.Trigger type="submit">Trigger</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content>Hint</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </form>
    );

    tap(screen.getByRole('button', { name: 'Trigger' }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('second tap activates the trigger and closes the tooltip', async () => {
    const { onClick, trigger } = renderTouchTooltip();

    tap(trigger);
    await screen.findByRole('tooltip');

    tap(trigger);

    expect(onClick).toHaveBeenCalledTimes(1);
    await expectClosed();
  });

  it('tap on the content keeps the tooltip open', async () => {
    const { trigger } = renderTouchTooltip();

    tap(trigger);
    trigger.focus();
    await screen.findByRole('tooltip');

    const content = getVisibleContent()!;

    firePointer(content, 'pointerdown', 'touch');
    trigger.blur();
    await flushTimers();

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('trigger blur without a tap on the content closes the tooltip', async () => {
    const { trigger } = renderTouchTooltip();

    tap(trigger);
    trigger.focus();
    await screen.findByRole('tooltip');

    trigger.blur();

    await expectClosed();
  });

  it('tap on a disabled tooltip activates the trigger', async () => {
    const { onClick, trigger } = renderTouchTooltip({ isDisabled: true });

    tap(trigger);
    await flushTimers();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('tap that focuses the trigger opens the tooltip once', async () => {
    const onOpenChange = jest.fn();
    const { trigger } = renderTouchTooltip({ onOpenChange });

    firePointer(trigger, 'pointerdown', 'touch');
    firePointer(trigger, 'pointerup', 'touch');
    act(() => {
      trigger.focus();
    });
    fireEvent.click(trigger);

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    expect(onOpenChange.mock.calls).toEqual([[true]]);
  });

  it('tap on another trigger closes the open tooltip', async () => {
    render(
      <>
        {['A', 'B'].map((name) => (
          <Tooltip.Root theme={TooltipPrimaryTheme} key={name}>
            <Tooltip.Trigger>{name}</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content>{`Hint ${name}`}</Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </>
    );

    tap(screen.getByRole('button', { name: 'A' }));
    expect(
      await screen.findByRole('tooltip', { name: 'Hint A' })
    ).toBeInTheDocument();

    tap(screen.getByRole('button', { name: 'B' }));
    expect(
      await screen.findByRole('tooltip', { name: 'Hint B' })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByRole('tooltip', { name: 'Hint A' })
      ).not.toBeInTheDocument();
    });
  });

  it('tap on a controlled tooltip activates the trigger', async () => {
    const onOpenChange = jest.fn();
    const { onClick, trigger } = renderTouchTooltip({
      isOpen: false,
      onOpenChange,
    });

    tap(trigger);
    await flushTimers();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onOpenChange).not.toHaveBeenCalledWith(true);
  });

  it('mouse click activates the trigger', async () => {
    const { onClick, trigger } = renderTouchTooltip();

    firePointer(trigger, 'pointerdown', 'mouse');
    fireEvent.click(trigger);
    await flushTimers();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('click after a cancelled touch activates the trigger', async () => {
    const { onClick, trigger } = renderTouchTooltip();

    firePointer(trigger, 'pointerdown', 'touch');
    firePointer(trigger, 'pointercancel', 'touch');
    fireEvent.click(trigger);
    await flushTimers();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
