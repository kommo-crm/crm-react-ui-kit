import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';

import {
  ContextMenu,
  ContextMenuArrowTheme,
  ContextMenuContentTheme,
  ContextMenuMode,
  ContextMenuTriggerTheme,
} from 'src/components/ContextMenu';

import {
  ContextMenuSubSelectContentTheme,
  ContextMenuSubSelectItemTheme,
  ContextMenuSubSelectTriggerTheme,
  ContextMenuSubSelectValueTheme,
  SortDirection,
  SubSelectOption,
} from '..';

import { SubSelectProps } from '../SubSelect.props';

const subSelectOptions: SubSelectOption[] = [
  { option: 'Date', value: 'date', sortable: true },
  { option: 'Name', value: 'name' },
];

export const SubSelectPlayground = (
  props: ComponentPlaygroundProps<SubSelectProps>
) => {
  const children = [
    <>
      <ContextMenu.SubSelect.Trigger theme={ContextMenuSubSelectTriggerTheme}>
        <ContextMenu.SubSelect.Value
          theme={ContextMenuSubSelectValueTheme}
          label="Sort by"
          placeholder="Placeholder"
        />
      </ContextMenu.SubSelect.Trigger>

      <ContextMenu.SubSelect.Content theme={ContextMenuSubSelectContentTheme}>
        {subSelectOptions.map((option) => (
          <ContextMenu.SubSelect.Item
            theme={ContextMenuSubSelectItemTheme}
            key={option.value}
            item={option}
          />
        ))}
      </ContextMenu.SubSelect.Content>
    </>,
  ];

  return (
    <ComponentPlayground<SubSelectProps>
      {...props}
      propSets={[
        {
          children,
          open: [false],
        },
        {
          children,
          open: [true],
          value: [undefined, subSelectOptions[1]],
        },
        {
          children,
          open: [true],
          value: [subSelectOptions[0]],
          sortDirection: [SortDirection.ASC, SortDirection.DESC],
        },
      ]}
    >
      {(itemProps: SubSelectProps) => (
        <div
          style={{
            height: '120px',
            padding: '10px',
          }}
        >
          <ContextMenu.Root mode={ContextMenuMode.CLICK} open>
            <ContextMenu.Trigger theme={ContextMenuTriggerTheme}>
              <ContextMenuTriggerIcon />
            </ContextMenu.Trigger>

            <ContextMenu.Portal>
              <ContextMenu.Content
                theme={ContextMenuContentTheme}
                sideOffset={5}
              >
                <ContextMenu.SubSelect.Root {...itemProps} />

                <ContextMenu.Arrow theme={ContextMenuArrowTheme} />
              </ContextMenu.Content>
            </ContextMenu.Portal>
          </ContextMenu.Root>
        </div>
      )}
    </ComponentPlayground>
  );
};
