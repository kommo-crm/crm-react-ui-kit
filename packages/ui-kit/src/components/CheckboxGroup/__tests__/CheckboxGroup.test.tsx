import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';

import { CheckboxLightTheme } from 'src/components/Checkbox/Checkbox.themes';

import {
  CheckboxGroup,
  CheckboxGroupItemRootTheme,
  CheckboxGroupTheme,
  type CheckboxGroupProps,
  type ItemRootProps,
} from '..';

import '@testing-library/jest-dom';

const defaultCheckboxGroupValues: ItemRootProps[] = [
  {
    theme: CheckboxGroupItemRootTheme,
    name: 'option1',
    value: 'option1',
  },
  {
    theme: CheckboxGroupItemRootTheme,
    name: 'option2',
    value: 'option2',
  },
];

const checkboxGroupOneCheckedValue: ItemRootProps[] = [
  {
    theme: CheckboxGroupItemRootTheme,
    name: 'option1',
    value: 'option1',
    isDefaultChecked: true,
  },
  {
    theme: CheckboxGroupItemRootTheme,
    name: 'option2',
    value: 'option2',
  },
];

const checkboxGroupOneDisabledValue: ItemRootProps[] = [
  {
    theme: CheckboxGroupItemRootTheme,
    name: 'option1',
    value: 'option1',
    isDisabled: true,
  },
  {
    theme: CheckboxGroupItemRootTheme,
    name: 'option2',
    value: 'option2',
  },
];

const renderCheckboxGroup = (
  checkboxGroupProps?: Partial<CheckboxGroupProps>,
  items: ItemRootProps[] = defaultCheckboxGroupValues
) => {
  const onChangeMock = jest.fn();

  const renderResult = render(
    <CheckboxGroup
      theme={CheckboxGroupTheme}
      onChange={onChangeMock}
      data-testid="checkbox-group"
      {...checkboxGroupProps}
    >
      <CheckboxGroup.ItemRootSelectAll theme={CheckboxGroupItemRootTheme}>
        <label data-testid="checkbox-select-all">
          <CheckboxGroup.CheckboxSelectAll
            data-testid="select-all"
            theme={CheckboxLightTheme}
          />
        </label>
      </CheckboxGroup.ItemRootSelectAll>

      {items.map((checkbox) => (
        <CheckboxGroup.ItemRoot key={checkbox.name as string} {...checkbox}>
          <label data-testid="checkbox-item">
            <CheckboxGroup.Checkbox
              data-testid={checkbox.name}
              theme={CheckboxLightTheme}
            />
          </label>
        </CheckboxGroup.ItemRoot>
      ))}
    </CheckboxGroup>
  );

  return [renderResult as RenderResult, onChangeMock];
};

describe('CheckboxGroup Component', () => {
  test('should renders CheckboxGroup with children', () => {
    renderCheckboxGroup();
    expect(screen.getByTestId('checkbox-group')).toBeInTheDocument();
    expect(screen.getAllByTestId('checkbox-item')).toHaveLength(
      defaultCheckboxGroupValues.length
    );
  });

  test('should call onChange on checkbox click', () => {
    const [, onChangeMock] = renderCheckboxGroup();

    const checkbox2 = screen.getByTestId('option2');

    fireEvent.click(checkbox2);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'option2', isChecked: true }),
      ]),
      expect.objectContaining({ name: 'option2', type: 'checkbox' })
    );
  });

  test('should call onChange when "select all" checkbox is clicked', () => {
    const [, onChangeMock] = renderCheckboxGroup();

    const checkbox1 = screen.getByTestId('option1');
    const checkbox2 = screen.getByTestId('option2');
    const selectAll = screen.getByTestId('select-all');

    fireEvent.click(selectAll);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'option1', isChecked: true }),
        expect.objectContaining({ name: 'option2', isChecked: true }),
      ]),
      expect.objectContaining({ type: 'selectAll' })
    );
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
  });

  test('should uncheck all checkboxes when one selected checkbox is clicked', () => {
    const [, onChangeMock] = renderCheckboxGroup(
      {},
      checkboxGroupOneCheckedValue
    );

    const checkbox1 = screen.getByTestId('option1');
    const checkbox2 = screen.getByTestId('option2');
    const selectAll = screen.getByTestId('select-all');

    fireEvent.click(selectAll);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'option1', isChecked: false }),
        expect.objectContaining({ name: 'option2', isChecked: false }),
      ]),
      expect.objectContaining({ type: 'selectAll' })
    );
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
  });

  test('should remains unchecked when disabled and Select All is clicked', () => {
    const [, onChangeMock] = renderCheckboxGroup(
      {},
      checkboxGroupOneDisabledValue
    );

    const checkbox1 = screen.getByTestId('option1');
    const checkbox2 = screen.getByTestId('option2');
    const selectAll = screen.getByTestId('select-all');

    fireEvent.click(selectAll);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'option1', isChecked: false }),
        expect.objectContaining({ name: 'option2', isChecked: true }),
      ]),
      expect.objectContaining({ type: 'selectAll' })
    );
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).toBeChecked();
  });

  test('should correctly marks selected checkbox', () => {
    renderCheckboxGroup({}, checkboxGroupOneCheckedValue);

    const checkbox1 = screen.getByTestId('option1');
    const checkbox2 = screen.getByTestId('option2');

    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
  });

  test('should apply global values to checkboxes', () => {
    renderCheckboxGroup({
      isDisabled: true,
    });

    const checkbox1 = screen.getByTestId('option1');
    const checkbox2 = screen.getByTestId('option2');
    const selectAll = screen.getByTestId('select-all');

    expect(checkbox1).toBeDisabled();
    expect(checkbox2).toBeDisabled();
    expect(selectAll).toBeDisabled();
  });

  test('should prevent checkbox clicks when globally disabled', () => {
    const [, onChangeMock] = renderCheckboxGroup({ isDisabled: true });

    const checkbox1 = screen.getByTestId('option1');
    const checkbox2 = screen.getByTestId('option2');
    const selectAll = screen.getByTestId('checkbox-select-all');

    fireEvent.click(selectAll);

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(checkbox1).not.toBeChecked();
    expect(checkbox2).not.toBeChecked();
    expect(selectAll).not.toBeChecked();
  });
});
