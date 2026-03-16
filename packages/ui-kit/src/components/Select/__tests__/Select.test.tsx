import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SelectButtonLightTheme } from 'src/components/SelectButton';

import { Select, SelectArrowTheme, SelectItemTheme, SelectListTheme } from '..';

import { SelectItem } from '../Select.types';
import { SelectRootTheme } from '../Select.theme';

const defaultItems: SelectItem[] = [
  { value: 'Option 1', option: 'Option 1' },
  { value: 'Option 2', option: 'Option 2' },
  { value: 'Option 3', option: 'Option 3' },
];

const renderSelect = (
  props: Partial<React.ComponentProps<typeof Select>> = {},
  items: SelectItem[] = defaultItems
) => {
  const onChangeMock = jest.fn();

  const renderResult = render(
    <Select.Root theme={SelectRootTheme} onChange={onChangeMock} {...props}>
      <Select.Button role="button" theme={SelectButtonLightTheme}>
        <Select.Value placeholder={'placeholder'} />

        <Select.Arrow theme={SelectArrowTheme} />
      </Select.Button>
      <Select.List theme={SelectListTheme} role="list">
        {items.map((item, index) => (
          <Select.Item
            theme={SelectItemTheme}
            role="option"
            key={item.value}
            item={item}
            index={index}
          />
        ))}
      </Select.List>
    </Select.Root>
  );

  return { ...renderResult, onChangeMock };
};

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

    expect(screen.queryByText('list')).not.toBeInTheDocument();
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
});
