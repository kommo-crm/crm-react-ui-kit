import { Declaration, type Rule } from 'css';

import { type CrmUiKitCSSProperties } from 'src/lib/theme';

import { type ColorItemType, type NumericItemType } from '../types/Items';

const isCssVariable = (str: string) => str.startsWith('var');

const isColor = (color: string) => {
  const s = new Option().style;

  s.color = color;

  return s.color !== '';
};

const getTokenFromCssVariable = (token: string) =>
  token
    .replaceAll(/\n/g, '')
    .replaceAll(/\s+/g, '')
    .replace(/var\((--[^)]+)\)/g, '$1');

const getVariableValues = (
  rules: Rule[],
  key: string,
  variableName: string
): ColorItemType | NumericItemType => {
  const baseVariables: Record<string, string> = {};

  const [defaultRule, alternativeRule] = rules;

  if (!defaultRule.declarations || !alternativeRule.declarations) {
    throw new Error('Failed to find style declarations');
  }

  for (const declaration of defaultRule.declarations) {
    if (declaration.type !== 'declaration') {
      continue;
    }

    if (declaration.value && !isCssVariable(declaration.value)) {
      if (declaration.property) {
        baseVariables[declaration.property] = declaration.value;
      }
    }
  }

  const formattedVariableName = getTokenFromCssVariable(variableName);

  /**
   * If our variable is a base token that is not exactly redefined
   * We are returning it
   */
  if (baseVariables[formattedVariableName]) {
    if (isColor(baseVariables[formattedVariableName])) {
      return {
        key,
        value: {
          defaultColor: baseVariables[formattedVariableName],
          alternativeColor: undefined,
        },
      };
    }

    return {
      key,
      value: baseVariables[formattedVariableName],
    };
  }

  const defaultDeclaration = (defaultRule.declarations as Declaration[]).find(
    (declaration) =>
      declaration.type === 'declaration' &&
      declaration !== undefined &&
      getTokenFromCssVariable(declaration.property as string) ===
        formattedVariableName
  );

  const alternativeDeclaration = (
    alternativeRule.declarations as Declaration[]
  ).find(
    (declaration) =>
      declaration.type === 'declaration' &&
      declaration !== undefined &&
      getTokenFromCssVariable(declaration.property as string) ===
        formattedVariableName
  );

  /**
   * If the expression is not found in the default declaration.
   * And it is not a base variable.
   *
   * We return the content of the variable theme.
   */
  if (!defaultDeclaration) {
    return {
      key,
      value: variableName,
    };
  }

  const defaultDeclarationVariableValue =
    baseVariables[getTokenFromCssVariable(defaultDeclaration.value as string)];

  const alternativeDeclarationVariableValue =
    alternativeDeclaration?.value &&
    baseVariables[getTokenFromCssVariable(alternativeDeclaration?.value)];

  if (isColor(defaultDeclarationVariableValue)) {
    return {
      key,
      value: {
        defaultColor: defaultDeclarationVariableValue,
        alternativeColor: alternativeDeclarationVariableValue,
        variableName: formattedVariableName,
      },
    };
  }

  return {
    key,
    value: defaultDeclarationVariableValue,
  };
};

type GetThemeParamsResponseType = {
  colorValues: ColorItemType[];
  numericValues: NumericItemType[];
};

export const getThemeValues = (
  cssRules: Rule[],
  theme: CrmUiKitCSSProperties
): GetThemeParamsResponseType => {
  const colorValues: ColorItemType[] = [];
  const numericValues: NumericItemType[] = [];

  for (const key of Object.keys(theme)) {
    const valueOrVariableName = theme[key as keyof CrmUiKitCSSProperties];
    const valueIsVariable = isCssVariable(valueOrVariableName);

    if (valueOrVariableName && valueIsVariable) {
      const variableValue = getVariableValues(
        cssRules,
        key,
        valueOrVariableName
      );

      if (typeof variableValue.value === 'object') {
        colorValues.push(variableValue as ColorItemType);
      } else {
        numericValues.push(variableValue as NumericItemType);
      }

      continue;
    }

    const value = valueOrVariableName;

    numericValues.push({ key, value });
  }

  return { colorValues, numericValues };
};
