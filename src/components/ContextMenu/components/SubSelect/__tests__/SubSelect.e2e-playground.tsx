import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';

import { ContextMenu, ContextMenuMode } from 'src/components/ContextMenu';

import { SortDirection, SubSelectOption } from '..';

import { ContextMenuSubSelectRootProps } from '../SubSelect.props';

const subSelectOptions: SubSelectOption[] = [
  { option: 'Date', value: 'date', sortable: true },
  { option: 'Name', value: 'name' },
];

export const SubSelectPlayground = (
  props: ComponentPlaygroundProps<ContextMenuSubSelectRootProps>
) => {
  const children = [
    <>
      <ContextMenu.SubSelect.Trigger>
        <ContextMenu.SubSelect.Value
          label="Sort by"
          placeholder="Placeholder"
        />
      </ContextMenu.SubSelect.Trigger>

      <ContextMenu.SubSelect.Content>
        {subSelectOptions.map((option) => (
          <ContextMenu.SubSelect.Item key={option.value} item={option} />
        ))}
      </ContextMenu.SubSelect.Content>
    </>,
  ];

  return (
    <ComponentPlayground<ContextMenuSubSelectRootProps>
      {...props}
      propSets={[
        {
          children,
          open: [false],
          mode: [ContextMenuMode.CLICK],
        },
        {
          children,
          open: [true],
          mode: [ContextMenuMode.CLICK],
          value: [undefined, subSelectOptions[1]],
        },
        {
          children,
          open: [true],
          mode: [ContextMenuMode.CLICK],
          value: [subSelectOptions[0]],
          sortDirection: [SortDirection.ASC, SortDirection.DESC],
        },
      ]}
    >
      {(itemProps: ContextMenuSubSelectRootProps) => (
        <div
          style={{
            height: '120px',
            padding: '10px',
          }}
        >
          <ContextMenu.Root mode={ContextMenuMode.CLICK} open>
            <ContextMenu.Trigger>
              <ContextMenuTriggerIcon />
            </ContextMenu.Trigger>

            <ContextMenu.Portal>
              <ContextMenu.Content>
                <ContextMenu.SubSelect.Root {...itemProps} />

                <ContextMenu.Arrow />
              </ContextMenu.Content>
            </ContextMenu.Portal>
          </ContextMenu.Root>
        </div>
      )}
    </ComponentPlayground>
  );
};
