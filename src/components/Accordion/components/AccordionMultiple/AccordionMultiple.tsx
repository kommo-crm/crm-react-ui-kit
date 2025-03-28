import React, { forwardRef, useState } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';
import { noop } from 'src/utils';

import { AccordionProvider } from '../../Accordion.context';
import { AccordionThemeType } from '../../Accordion.themes';

import { AccordionMultipleProps } from './AccordionMultiple.props';

import s from '../../Accordion.module.css';

type D = HTMLDivElement;

const DISPLAY_NAME = 'AccordionMultiple';

export const AccordionMultiple = forwardRef<D, AccordionMultipleProps>(
  (props, ref) => {
    const {
      className = '',
      theme,
      children,
      value: valueProp = [],
      defaultValue: defaultValueProp = [],
      onChange = noop,
      ...rest
    } = props;

    const themeClassName = useThemeClassName<AccordionThemeType>(theme);

    const [defaultValue, setDefaultValue] = useState(defaultValueProp);

    const isControlled = 'value' in props;
    const value = isControlled ? valueProp : defaultValue;

    const getCorrectValue = (newValue: string) => {
      if (value.includes(newValue)) {
        return value.filter((val) => val !== newValue);
      }

      return [...value, newValue];
    };

    const handleChange = (newValue: string) => {
      const correctValue = getCorrectValue(newValue);

      if (!isControlled) {
        setDefaultValue(correctValue);
      }

      onChange(correctValue);
    };

    return (
      <AccordionProvider
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        <div
          ref={ref}
          className={cx(s.wrapper, themeClassName, className)}
          {...rest}
        >
          {children}
        </div>
      </AccordionProvider>
    );
  }
);

AccordionMultiple.displayName = DISPLAY_NAME;
