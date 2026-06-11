import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { SelectButtonLightTheme } from '@ui-kit/components/SelectButton';

import { DropdownListTheme as ListTheme } from '@ui-kit/components/DropdownList';

import { Select, SelectArrowTheme, SelectItemTheme, SelectRootTheme } from '..';
import { SelectItem } from '../Select.types';

const textItems: SelectItem[] = [
  { value: 'option1', option: 'Option 1' },
  { value: 'option2', option: 'Option 2' },
  { value: 'option3', option: 'Option 3' },
];

const jsxItems: SelectItem[] = [
  {
    value: 'option1',
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
  {
    value: 'option2',
    option: (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        Option 2
        <span
          style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#34c759',
          }}
        />
      </div>
    ),
    title: 'Option 2',
  },
  {
    value: 'option3',
    option: (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        Option 3
        <span
          style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#007aff',
          }}
        />
      </div>
    ),
    title: 'Option 3',
  },
];

export interface SelectTestProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isDefaultOpen?: boolean;
  defaultValue?: SelectItem;
  useHeightWrapper?: boolean;
  isPinnedToBottom?: boolean;
}

const SelectContent = ({ items }: { items: SelectItem[] }) => (
  <>
    <Select.Button theme={SelectButtonLightTheme} key="button">
      <Select.Value placeholder="Select option" />
      <Select.Arrow theme={SelectArrowTheme} />
    </Select.Button>
    <Select.List key="list" theme={ListTheme}>
      {items.map((item, index) => (
        <Select.Item
          theme={SelectItemTheme}
          key={item.value}
          item={item}
          index={index}
        />
      ))}
    </Select.List>
  </>
);

const SelectPlayground = ({
  appearance,
  props,
  items,
}: ComponentPlaygroundProps<SelectTestProps> & { items: SelectItem[] }) => (
  <ComponentPlayground<SelectTestProps> appearance={appearance} props={props}>
    {({ useHeightWrapper, isPinnedToBottom, ...selectProps }) => {
      const makeSelectContent = () => {
        const content = <SelectContent items={items} />;

        return useHeightWrapper ? (
          <div style={{ height: '110px' }}>{content}</div>
        ) : (
          content
        );
      };

      if (isPinnedToBottom) {
        return (
          <div style={{ display: 'flex' }}>
            {([false, true] as const).map((isOpen) => (
              <div
                key={String(isOpen)}
                style={{ position: 'relative', flex: 1, height: 150 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 24,
                    right: 24,
                    bottom: 24,
                  }}
                >
                  <Select
                    {...selectProps}
                    isDefaultOpen={isOpen}
                    theme={SelectRootTheme}
                  >
                    {makeSelectContent()}
                  </Select>
                </div>
              </div>
            ))}
          </div>
        );
      }

      return (
        <div style={{ margin: '0 20px' }}>
          <Select {...selectProps} theme={SelectRootTheme}>
            {makeSelectContent()}
          </Select>
        </div>
      );
    }}
  </ComponentPlayground>
);

export const SelectPlaygroundItem = (
  props: ComponentPlaygroundProps<SelectTestProps>
) => <SelectPlayground {...props} items={textItems} />;

export const SelectPlaygroundItemWithJsxOptions = (
  props: ComponentPlaygroundProps<SelectTestProps>
) => <SelectPlayground {...props} items={jsxItems} />;
