import { renderHook, act } from '@testing-library/react';

import { type RegisterHandlerResult } from '../CheckboxGroup.props';

import { useCheckboxGroupState } from './useCheckboxGroupState';

const SELECT_ALL = 'selectAll';

describe('useCheckboxGroupState', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with an empty state', () => {
    const { result } = renderHook(() =>
      useCheckboxGroupState({ onChange: mockOnChange })
    );

    expect(result.current.state.size).toBe(0);
  });

  it('should register a new checkbox', () => {
    const { result, rerender } = renderHook(() =>
      useCheckboxGroupState({ onChange: mockOnChange })
    );

    act(() => {
      result.current.register('checkbox1', { isDefaultChecked: true });
    });

    rerender();

    expect(result.current.state.size).toBe(1);
    const checkbox = result.current.state.get('checkbox1');

    expect(checkbox).toEqual({
      name: 'checkbox1',
      isChecked: true,
      isDisabled: false,
    });
  });

  it('should update state when a checkbox is toggled', () => {
    const { result, rerender } = renderHook(() =>
      useCheckboxGroupState({ onChange: mockOnChange })
    );

    let trigger: RegisterHandlerResult;

    act(() => {
      trigger = result.current.register('checkbox1', {
        isDefaultChecked: false,
      });
      result.current.register('checkbox2', { isDefaultChecked: true });
    });

    rerender();

    act(() => {
      trigger.onChange({
        type: 'checkbox',
        name: 'checkbox1',
      });
    });

    rerender();

    const checkbox1 = result.current.state.get('checkbox1');
    const checkbox2 = result.current.state.get('checkbox2');

    expect(checkbox1?.isChecked).toBe(true);
    expect(checkbox2?.isChecked).toBe(true);
    expect(mockOnChange).toHaveBeenCalledWith(
      [
        { name: 'checkbox1', isChecked: true, isDisabled: false },
        { name: 'checkbox2', isChecked: true, isDisabled: false },
      ],
      { type: 'checkbox', name: 'checkbox1' }
    );
  });

  it('should handle "selectAll" event to check all checkboxes', () => {
    const { result, rerender } = renderHook(() =>
      useCheckboxGroupState({ onChange: mockOnChange })
    );

    let trigger: RegisterHandlerResult;

    act(() => {
      trigger = result.current.register('selectAll');

      result.current.register('checkbox1', { isDefaultChecked: false });
      result.current.register('checkbox2', { isDefaultChecked: false });
    });

    rerender();

    act(() => {
      trigger.onChange({
        type: 'selectAll',
        name: 'selectAll',
      });
    });

    rerender();

    const checkbox1 = result.current.state.get('checkbox1');
    const checkbox2 = result.current.state.get('checkbox2');

    expect(checkbox1?.isChecked).toBe(true);
    expect(checkbox2?.isChecked).toBe(true);
    expect(mockOnChange).toHaveBeenCalledWith(
      [
        { name: 'checkbox1', isChecked: true, isDisabled: false },
        { name: 'checkbox2', isChecked: true, isDisabled: false },
      ],
      { type: SELECT_ALL, name: SELECT_ALL }
    );
  });

  it('should handle "selectAll" event to uncheck all checkboxes', () => {
    const { result, rerender } = renderHook(() =>
      useCheckboxGroupState({ onChange: mockOnChange })
    );

    let trigger: RegisterHandlerResult;

    act(() => {
      trigger = result.current.register(SELECT_ALL);
      result.current.register('checkbox1', { isDefaultChecked: true });
      result.current.register('checkbox2', { isDefaultChecked: true });
    });

    rerender();

    act(() => {
      trigger.onChange({
        type: SELECT_ALL,
        name: SELECT_ALL,
      });
    });

    rerender();

    const checkbox1 = result.current.state.get('checkbox1');
    const checkbox2 = result.current.state.get('checkbox2');

    expect(checkbox1?.isChecked).toBe(false);
    expect(checkbox2?.isChecked).toBe(false);
    expect(mockOnChange).toHaveBeenCalledWith(
      [
        { name: 'checkbox1', isChecked: false, isDisabled: false },
        { name: 'checkbox2', isChecked: false, isDisabled: false },
      ],
      { type: SELECT_ALL, name: SELECT_ALL }
    );
  });

  it('should not toggle a disabled checkbox', () => {
    const { result, rerender } = renderHook(() =>
      useCheckboxGroupState({ onChange: mockOnChange })
    );

    let toggle: RegisterHandlerResult;

    act(() => {
      toggle = result.current.register('checkbox1', {
        isDefaultChecked: false,
        isDisabled: true,
      });
    });

    rerender();

    act(() => {
      toggle.onChange({
        type: 'checkbox',
        name: 'checkbox1',
      });
    });

    rerender();

    const checkbox1 = result.current.state.get('checkbox1');

    expect(checkbox1?.isChecked).toBe(false);
  });
});
