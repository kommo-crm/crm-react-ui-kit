import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';

import {
  RadioGroup,
  RadioPrimaryTheme,
  RadioGroupTheme,
  RadioGroupItemRootTheme,
  type RadioGroupProps,
  type ItemRootProps,
} from '..';

import '@testing-library/jest-dom';

const defaultRadioValues: ItemRootProps[] = [
  { theme: RadioGroupItemRootTheme, value: 'option1' },
  { theme: RadioGroupItemRootTheme, value: 'option2' },
];

const defaultValue = defaultRadioValues[0].value as string;

const renderRadioGroup = (
  radioGroupProps?: Partial<RadioGroupProps>,
  items: ItemRootProps[] = defaultRadioValues
) => {
  const onChangeMock = jest.fn();

  const renderResult = render(
    <RadioGroup
      theme={RadioGroupTheme}
      onChange={onChangeMock}
      name="radioGroup"
      {...radioGroupProps}
    >
      {items.map((button) => (
        <RadioGroup.ItemRoot key={button.value as string} {...button}>
          <label>
            <RadioGroup.Radio theme={RadioPrimaryTheme} />
          </label>
        </RadioGroup.ItemRoot>
      ))}
    </RadioGroup>
  );

  return [renderResult as RenderResult, onChangeMock];
};

describe('RadioGroup Component', () => {
  test('should renders RadioGroup with children', () => {
    renderRadioGroup({ value: defaultValue });

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(
      defaultRadioValues.length
    );
  });

  test('should call onChange on radio button click', () => {
    const [, onChangeMock] = renderRadioGroup({ value: defaultValue });

    const radio2 = screen.getByDisplayValue('option2');

    fireEvent.click(radio2);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('option2');
  });

  test('should correctly marks  selected radio button', () => {
    renderRadioGroup({ value: defaultValue });

    const radio1 = screen.getByDisplayValue('option1');
    const radio2 = screen.getByDisplayValue('option2');

    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
  });

  test('should correctly marks defaultValue', () => {
    renderRadioGroup({ defaultValue: defaultRadioValues[1].value as string });

    const radio1 = screen.getByDisplayValue('option1');
    const radio2 = screen.getByDisplayValue('option2');

    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
  });

  test('should apply global values to radio-buttons', () => {
    renderRadioGroup({ value: defaultValue, name: 'test', isDisabled: true });

    const radio1 = screen.getByDisplayValue('option1');
    const radio2 = screen.getByDisplayValue('option2');

    expect(radio1).toBeDisabled();
    expect(radio2).toHaveAttribute('name', 'test');

    expect(radio2).toBeDisabled();
    expect(radio2).toHaveAttribute('name', 'test');
  });

  test('should applies horizontal orientation class', () => {
    renderRadioGroup(
      {
        orientation: 'horizontal',
      },
      defaultRadioValues
    );

    const element = screen.getByRole('radiogroup');

    expect(element).toHaveClass('horizontal');
  });
});
