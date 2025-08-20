import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  SortDirection,
  SubSelectOption,
} from 'src/components/ContextMenu/components/SubSelect';

import ContextMenuTriggerIcon from 'src/icons/trigger.svg';

import { ContextMenu, ContextMenuMode } from 'src/components/ContextMenu';

import { i18n } from '@i18n';

import { CanvasCentered } from '@storybook-utils/constants';

const USAGE = `
import { useState } from "react";

import {
  ContextMenu,
  ContextMenuMode,
} from '@kommo-crm/crm-react-ui-kit/ContextMenu';

import {
  SortDirection,
  SubSelectOption,
} from "@kommo-crm/crm-react-ui-kit/ContextMenu/components/SubSelect";

import ContextMenuTriggerIcon from "public/icons/trigger.svg";

const subSelectOptions: SubSelectOption[] = [
  { option: '${i18n.t('Date')}', value: 'date', sortable: true },
  { option: '${i18n.t('Name')}', value: 'name' },
];

function App() {
  const [sortDir, setSortDir] = useState<SortDirection>();
  const [selected, setSelected] = useState<SubSelectOption>();

  return (
    <ContextMenu.Root mode={ContextMenuMode.CLICK}>
      <ContextMenu.Trigger>
        <ContextMenuTriggerIcon />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content>
          <ContextMenu.SubSelect.Root
            value={selected}
            sortDirection={sortDir}
            onChange={(value, dir) => {
              setSelected(value);
              setSortDir(dir);
            }}
          >
            <ContextMenu.SubSelect.Trigger>
              <ContextMenu.SubSelect.Value
                label="${i18n.t('Sort by')}"
                placeholder="Placeholder"
              />
            </ContextMenu.SubSelect.Trigger>

            <ContextMenu.SubSelect.Content>
              {subSelectOptions.map((option) => (
                <ContextMenu.SubSelect.Item key={option.value} item={option} />
              ))}
            </ContextMenu.SubSelect.Content>
          </ContextMenu.SubSelect.Root>

          <ContextMenu.Arrow />
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

const renderMenu = (mode = ContextMenuMode.CLICK) => {
  const [sortDir, setSortDir] = useState<SortDirection>();
  const [selected, setSelected] = useState<SubSelectOption>();

  return (
    <ContextMenu.Root mode={mode}>
      <ContextMenu.Trigger>
        <ContextMenuTriggerIcon />
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          collisionBoundary={
            document.querySelector('.docs-story') as HTMLElement
          }
        >
          <ContextMenu.SubSelect.Root
            value={selected}
            sortDirection={sortDir}
            onChange={(value, dir) => {
              setSelected(value);
              setSortDir(dir);
            }}
          >
            <ContextMenu.SubSelect.Trigger>
              <ContextMenu.SubSelect.Value
                label={i18n.t('Sort by')}
                placeholder="Placeholder"
              />
            </ContextMenu.SubSelect.Trigger>

            <ContextMenu.SubSelect.Content>
              {subSelectOptions.map((option) => (
                <ContextMenu.SubSelect.Item key={option.value} item={option} />
              ))}
            </ContextMenu.SubSelect.Content>
          </ContextMenu.SubSelect.Root>

          <ContextMenu.Arrow />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

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
  render: () => renderMenu(),
} satisfies Meta<typeof ContextMenu.SubSelect.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HoverMode: Story = {
  render: () => renderMenu(ContextMenuMode.HOVER),
};
