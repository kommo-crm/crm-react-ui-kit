import React from 'react';

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import {
  Label,
  LabelGroupTheme,
  LabelTheme,
  type LabelProps,
  type LabelGroupProps,
} from '..';

const DEFAULT_TEXT = 'Test Label';
const DEFAULT_CHILD_TEXT = 'Test Child';
const MOCK_CLASS_NAME = 'themeClassName';
const GROUP_MOCK_CLASS_NAME = 'groupThemeClassName';

const renderLabel = (props: Partial<LabelProps>) => {
  return render(
    <Label theme={LabelTheme} text={DEFAULT_TEXT} {...props}>
      {props.children || DEFAULT_CHILD_TEXT}
    </Label>
  );
};

const renderLabelGroup = (props: Partial<LabelGroupProps>) => {
  return render(
    <Label.Group theme={LabelGroupTheme} {...props}>
      <Label theme={LabelTheme} text={DEFAULT_TEXT}>
        {props.children || DEFAULT_CHILD_TEXT}
      </Label>
      <Label theme={LabelTheme} text={DEFAULT_TEXT}>
        {props.children || DEFAULT_CHILD_TEXT}
      </Label>
    </Label.Group>
  );
};

jest.mock('src/hooks/useThemeClassName');

describe('Label', () => {
  beforeEach(() => {
    (useThemeClassName as jest.Mock).mockReturnValue('themeClassName');
  });

  it('should be defined', async () => {
    expect(Label).toBeDefined();
  });

  test('should renders label with text', async () => {
    renderLabel({});

    const element = screen.getByText(DEFAULT_TEXT);

    expect(element).toBeInTheDocument();
  });

  test('should renders children content', async () => {
    renderLabel({});

    expect(screen.getByText(DEFAULT_CHILD_TEXT)).toBeInTheDocument();
  });

  test('should applies theme class name', async () => {
    const { container } = renderLabel({});

    const labelElement = container.children.item(0);

    expect(labelElement).toHaveClass(MOCK_CLASS_NAME);
  });
});

describe('Label.Group Component', () => {
  beforeEach(() => {
    (useThemeClassName as jest.Mock).mockReturnValue(GROUP_MOCK_CLASS_NAME);
  });

  it('should be defined', async () => {
    expect(Label.Group).toBeDefined();
  });

  it('should renders children in group', async () => {
    renderLabelGroup({});

    expect(screen.getAllByText(DEFAULT_TEXT)).toHaveLength(2);
    expect(screen.getAllByText(DEFAULT_CHILD_TEXT)).toHaveLength(2);
  });
});
