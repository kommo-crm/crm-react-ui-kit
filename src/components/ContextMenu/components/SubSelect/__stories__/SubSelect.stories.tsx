import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  ContextMenuSubSelectContentTheme,
  ContextMenuSubSelectItemTheme,
  ContextMenuSubSelectTriggerTheme,
  ContextMenuSubSelectValueTheme,
  SortDirection,
  SubSelectOption,
} from 'src/components/ContextMenu/components/SubSelect';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';

import {
  ContextMenu,
  ContextMenuRootTheme,
  ContextMenuTriggerTheme,
  ContextMenuArrowTheme,
  ContextMenuContentTheme,
} from 'src/components/ContextMenu';

import { i18n } from '@i18n';

import { CanvasCentered } from '@storybook-utils/constants';

const USAGE = `
import { useState } from "react";

import {
  ContextMenuSubSelectContentTheme,
  ContextMenuSubSelectItemTheme,
  ContextMenuSubSelectTriggerTheme,
  ContextMenuSubSelectValueTheme,
  SortDirection,
  SubSelectOption,
} from "@kommo-crm/crm-react-ui-kit/ContextMenu/components/SubSelect";

import ContextMenuTriggerIcon from "./trigger.svg";

import {
  ContextMenu,
  ContextMenuRootTheme,
  ContextMenuTriggerTheme,
  ContextMenuArrowTheme,
  ContextMenuContentTheme,
} from "@kommo-crm/crm-react-ui-kit/ContextMenu";

const subSelectOptions: SubSelectOption[] = [
  { option: '${i18n.t('Date')}', value: 'date', sortable: true },
  { option: '${i18n.t('Name')}', value: 'name' },
];

function App() {
  const [sortDir, setSortDir] = useState<SortDirection>();
  const [selected, setSelected] = useState<SubSelectOption>();

  return (
    <ContextMenu.Root theme={ContextMenuRootTheme}>
      <ContextMenu.Trigger theme={ContextMenuTriggerTheme}>
        <ContextMenuTriggerIcon />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content theme={ContextMenuContentTheme} sideOffset={5}>
          <ContextMenu.SubSelect.Root
            value={selected}
            sortDirection={sortDir}
            onChange={(value, dir) => {
              setSelected(value);
              setSortDir(dir);
            }}
          >
            <ContextMenu.SubSelect.Trigger
              theme={ContextMenuSubSelectTriggerTheme}
            >
              <ContextMenu.SubSelect.Value
                theme={ContextMenuSubSelectValueTheme}
                label="${i18n.t('Sort by')}"
                placeholder="Placeholder"
              />
            </ContextMenu.SubSelect.Trigger>

            <ContextMenu.SubSelect.Content
              theme={ContextMenuSubSelectContentTheme}
            >
              {subSelectOptions.map((option) => (
                <ContextMenu.SubSelect.Item
                  theme={ContextMenuSubSelectItemTheme}
                  key={option.value}
                  item={option}
                />
              ))}
            </ContextMenu.SubSelect.Content>
          </ContextMenu.SubSelect.Root>

          <ContextMenu.Arrow theme={ContextMenuArrowTheme} />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
`;

const subSelectOptions: SubSelectOption[] = [
  { option: i18n.t('Date'), value: 'date', sortable: true },
  { option: i18n.t('Name'), value: 'name' },
];

const meta = {
  title: 'Components/ContextMenu/SubSelect',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          marginBottom: '100px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  component: ContextMenu.SubSelect.Root,
  args: {
    onChange: action('onChange'),
  },
  render: () => {
    const [sortDir, setSortDir] = useState<SortDirection>();
    const [selected, setSelected] = useState<SubSelectOption>();

    return (
      <ContextMenu.Root theme={ContextMenuRootTheme}>
        <ContextMenu.Trigger theme={ContextMenuTriggerTheme}>
          <ContextMenuTriggerIcon />
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content theme={ContextMenuContentTheme} sideOffset={5}>
            <ContextMenu.SubSelect.Root
              value={selected}
              sortDirection={sortDir}
              onChange={(value, dir) => {
                setSelected(value);
                setSortDir(dir);
              }}
            >
              <ContextMenu.SubSelect.Trigger
                theme={ContextMenuSubSelectTriggerTheme}
              >
                <ContextMenu.SubSelect.Value
                  theme={ContextMenuSubSelectValueTheme}
                  label={i18n.t('Sort by')}
                  placeholder="Placeholder"
                />
              </ContextMenu.SubSelect.Trigger>

              <ContextMenu.SubSelect.Content
                theme={ContextMenuSubSelectContentTheme}
              >
                {subSelectOptions.map((option) => (
                  <ContextMenu.SubSelect.Item
                    theme={ContextMenuSubSelectItemTheme}
                    key={option.value}
                    item={option}
                  />
                ))}
              </ContextMenu.SubSelect.Content>
            </ContextMenu.SubSelect.Root>

            <ContextMenu.Arrow theme={ContextMenuArrowTheme} />
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    );
  },
} satisfies Meta<typeof ContextMenu.SubSelect.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
