import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SelectButtonTheme } from '@ui-kit/components/SelectButton';

import { noop } from '@ui-kit/utils';

import { Select, SelectArrowTheme, SelectItemTheme, SelectListTheme } from '..';

import { SelectItem } from '../Select.types';
import { SelectRootTheme } from '../Select.theme';

/**
 * jsdom has no ResizeObserver, Radix ScrollArea inside the list needs one.
 */
class ResizeObserverMock {
  observe = noop;

  unobserve = noop;

  disconnect = noop;
}

beforeAll(() => {
  Object.defineProperty(window, 'ResizeObserver', {
    configurable: true,
    value: ResizeObserverMock,
  });
});

const defaultItems: SelectItem[] = [
  {
    value: 'Option 1',
    option: (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        Option 1
        <span
          style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#ff3b30',
          }}
        />
      </div>
    ),
    title: 'Option 1',
  },
  { value: 'Option 2', option: 'Option 2' },
  { value: 'Option 3', option: 'Option 3' },
];

type RenderSelectOptions = {
  items?: SelectItem[];
  listProps?: Partial<React.ComponentProps<typeof Select.List>>;
  interactiveValues?: SelectItem['value'][];
};

const renderSelect = (
  props: Partial<React.ComponentProps<typeof Select>> = {},
  options: RenderSelectOptions = {}
) => {
  const {
    items = defaultItems,
    listProps = {},
    interactiveValues = [],
  } = options;

  const onChangeMock = jest.fn();

  const renderResult = render(
    <Select.Root theme={SelectRootTheme} onChange={onChangeMock} {...props}>
      <Select.Button role="button" theme={SelectButtonTheme}>
        <Select.Value placeholder={'placeholder'} />

        <Select.Arrow theme={SelectArrowTheme} />
      </Select.Button>
      <Select.List theme={SelectListTheme} {...listProps}>
        {items.map((item, index) => {
          const isInteractive = interactiveValues.includes(item.value);

          return (
            <Select.Item
              theme={SelectItemTheme}
              role="option"
              key={item.value}
              item={item}
              index={index}
              isInteractive={isInteractive}
            >
              {isInteractive ? (
                <>
                  <span>{item.option}</span>
                  <div data-testid="custom-field">
                    <input aria-label="Custom value" />
                    <span>unit</span>
                  </div>
                </>
              ) : undefined}
            </Select.Item>
          );
        })}
      </Select.List>
    </Select.Root>
  );

  return { ...renderResult, onChangeMock };
};

/**
 * The outside click handler is registered on the next tick after opening.
 */
const waitForOutsideClickHandler = () =>
  act(() => new Promise((resolve) => setTimeout(resolve)));

describe('Select', () => {
  it('should be defined', () => {
    expect(renderSelect).toBeDefined();
  });

  it('should renders the Select component', () => {
    renderSelect();

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getAllByRole('option')).toHaveLength(defaultItems.length);
  });

  it('should open and close the dropdown list', () => {
    renderSelect();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should selects an item from the dropdown list', () => {
    const { onChangeMock } = renderSelect({ defaultValue: defaultItems[0] });
    const button = screen.getByRole('button');

    fireEvent.click(button);
    const option = screen.getAllByRole('option');

    fireEvent.click(option[1]);

    expect(button).toHaveTextContent(option[1].textContent!);

    expect(onChangeMock).toHaveBeenCalledWith({
      value: 'Option 2',
      option: 'Option 2',
    });
  });

  it('should does not open the dropdown list when disabled', () => {
    renderSelect({ isDisabled: true });

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('should renders defaultValue correctly', () => {
    renderSelect({ defaultValue: defaultItems[1] });

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should focus the list when opened', () => {
    renderSelect();

    fireEvent.click(screen.getByRole('button'));

    expect(document.activeElement).toBe(screen.getByRole('list'));
  });

  it('should not scroll the page when focusing the list', () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

    renderSelect();

    fireEvent.click(screen.getByRole('button'));

    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });

    focusSpy.mockRestore();
  });

  it('should open the default opened list from the button', () => {
    renderSelect({ isDefaultOpen: true });

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  describe('keyboard navigation', () => {
    it('should select the hovered item with Enter', () => {
      const { onChangeMock } = renderSelect();

      fireEvent.click(screen.getByRole('button'));

      const list = screen.getByRole('list');

      fireEvent.keyDown(list, { key: 'ArrowDown' });
      fireEvent.keyDown(list, { key: 'ArrowDown' });
      fireEvent.keyDown(list, { key: 'Enter' });

      expect(onChangeMock).toHaveBeenCalledWith(defaultItems[1]);
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should wrap around from the first item to the last one', () => {
      const { onChangeMock } = renderSelect({ defaultValue: defaultItems[0] });

      fireEvent.click(screen.getByRole('button'));

      const list = screen.getByRole('list');

      fireEvent.keyDown(list, { key: 'ArrowUp' });
      fireEvent.keyDown(list, { key: ' ' });

      expect(onChangeMock).toHaveBeenCalledWith(defaultItems[2]);
    });

    it('should reach and select interactive items', () => {
      const { onChangeMock } = renderSelect(
        { defaultValue: defaultItems[0] },
        { interactiveValues: ['Option 2'] }
      );

      fireEvent.click(screen.getByRole('button'));

      const list = screen.getByRole('list');

      fireEvent.keyDown(list, { key: 'ArrowDown' });
      fireEvent.keyDown(list, { key: 'Enter' });

      expect(onChangeMock).toHaveBeenCalledWith(defaultItems[1]);
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should close the list with Escape', () => {
      renderSelect();

      fireEvent.click(screen.getByRole('button'));
      fireEvent.keyDown(screen.getByRole('list'), { key: 'Escape' });

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('interactive item', () => {
    it('should neither select the item nor close the list on a click on its controls', () => {
      const { onChangeMock } = renderSelect(
        {},
        { interactiveValues: ['Option 2'] }
      );

      fireEvent.click(screen.getByRole('button'));
      fireEvent.click(screen.getByLabelText('Custom value'));
      fireEvent.click(screen.getByText('unit'));
      fireEvent.click(screen.getByTestId('custom-field'));

      expect(onChangeMock).not.toHaveBeenCalled();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should select the item and close the list on a click on its row', () => {
      const { onChangeMock } = renderSelect(
        {},
        { interactiveValues: ['Option 2'] }
      );

      fireEvent.click(screen.getByRole('button'));
      fireEvent.click(screen.getByText('Option 2'));

      expect(onChangeMock).toHaveBeenCalledWith(defaultItems[1]);
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should leave the keys typed into its input to the input', () => {
      const { onChangeMock } = renderSelect(
        { defaultValue: defaultItems[0] },
        { interactiveValues: ['Option 2'] }
      );

      fireEvent.click(screen.getByRole('button'));

      const input = screen.getByLabelText('Custom value');

      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onChangeMock).not.toHaveBeenCalled();
      expect(screen.getByRole('list')).toBeInTheDocument();

      fireEvent.keyDown(input, { key: 'Escape' });

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should be shown as selected when it holds the value', () => {
      renderSelect(
        { defaultValue: defaultItems[1] },
        { interactiveValues: ['Option 2'] }
      );

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getAllByRole('option')[1].className).toMatch(/selected/);
    });

    it('should not be selected by its row or Enter when onSelect prevents it', () => {
      const onChange = jest.fn();

      render(
        <Select.Root theme={SelectRootTheme} onChange={onChange} isDefaultOpen>
          <Select.List theme={SelectListTheme}>
            <Select.Item
              theme={SelectItemTheme}
              item={defaultItems[1]}
              index={0}
              isInteractive
              onSelect={(e) => e.preventDefault()}
            />
          </Select.List>
        </Select.Root>
      );

      const list = screen.getByRole('list');

      fireEvent.click(screen.getByText('Option 2'));
      fireEvent.keyDown(list, { key: 'ArrowDown' });
      fireEvent.keyDown(list, { key: 'Enter' });

      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should call the consumer onClick on a click on its controls', () => {
      const onItemClick = jest.fn();

      render(
        <Select.Root theme={SelectRootTheme} isDefaultOpen>
          <Select.List theme={SelectListTheme}>
            <Select.Item
              theme={SelectItemTheme}
              item={defaultItems[1]}
              index={0}
              isInteractive
              onClick={onItemClick}
            >
              <input aria-label="Custom value" />
            </Select.Item>
          </Select.List>
        </Select.Root>
      );

      fireEvent.click(screen.getByLabelText('Custom value'));

      expect(onItemClick).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('controlled isOpen', () => {
    it('should call onOpenChange when the button is clicked', () => {
      const onOpenChange = jest.fn();

      renderSelect({ isOpen: false, onOpenChange });

      fireEvent.click(screen.getByRole('button'));

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should call onOpenChange once on an outside click', async () => {
      const onOpenChange = jest.fn();

      renderSelect({ isOpen: true, onOpenChange });

      await waitForOutsideClickHandler();

      fireEvent.click(document.body);

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('should call onOpenChange once when the button closes the list', async () => {
      const onOpenChange = jest.fn();

      renderSelect({ isOpen: true, onOpenChange });

      await waitForOutsideClickHandler();

      fireEvent.click(screen.getByRole('button'));

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('should call onOpenChange when an item is selected', () => {
      const onOpenChange = jest.fn();

      renderSelect({ isOpen: true, onOpenChange });

      fireEvent.click(screen.getAllByRole('option')[1]);

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('loading', () => {
    it('should call onScrollEnd when the end of the list is visible', () => {
      const onScrollEnd = jest.fn();

      renderSelect({}, { listProps: { onScrollEnd } });

      fireEvent.click(screen.getByRole('button'));

      expect(onScrollEnd).toHaveBeenCalledTimes(1);
    });

    it('should not call onScrollEnd while loading', () => {
      const onScrollEnd = jest.fn();

      renderSelect({}, { listProps: { onScrollEnd, isLoading: true } });

      fireEvent.click(screen.getByRole('button'));

      expect(onScrollEnd).not.toHaveBeenCalled();
    });

    it('should show a spinner after the items while loading', () => {
      renderSelect({}, { listProps: { isLoading: true } });

      fireEvent.click(screen.getByRole('button'));

      const list = screen.getByRole('list');
      const spinner = list.nextElementSibling;

      expect(spinner).toBeInTheDocument();
      expect(spinner?.querySelector('span')).toBeInTheDocument();
    });
  });

  it('should render only a part of a long list', () => {
    const items = Array.from({ length: 1000 }, (_, index) => ({
      value: `Option ${index}`,
      option: `Option ${index}`,
    }));

    renderSelect({}, { items });

    fireEvent.click(screen.getByRole('button'));

    const renderedCount = screen.getAllByRole('option').length;

    expect(renderedCount).toBeGreaterThan(0);
    expect(renderedCount).toBeLessThan(items.length);
  });

  describe('invalid description', () => {
    it('should show the error text when invalid', () => {
      renderSelect({ isInvalid: true, invalidDescription: 'Required field' });

      expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    it('should hide the error text when valid', () => {
      renderSelect({ invalidDescription: 'Required field' });

      expect(screen.queryByText('Required field')).not.toBeInTheDocument();
    });
  });

  it('should render the label before the value', () => {
    render(
      <Select.Root theme={SelectRootTheme} defaultValue={defaultItems[1]}>
        <Select.Button theme={SelectButtonTheme}>
          <Select.Value>
            <Select.Label>Label:</Select.Label>
            <Select.Option>Option 2</Select.Option>
          </Select.Value>
        </Select.Button>
      </Select.Root>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Label:Option 2');
  });

  it('should name the parts by their components', () => {
    expect(Select.Option.displayName).toBe('Select.Option');
    expect(Select.Label.displayName).toBe('Select.Label');
  });
});
