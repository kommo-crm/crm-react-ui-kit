import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs, TabsPrimaryTheme, type TabsProps } from '..';

import '@testing-library/jest-dom';

const renderTabs = (props: Partial<TabsProps>) => {
  const handleMockFn = jest.fn();

  render(
    <Tabs theme={TabsPrimaryTheme} onChange={handleMockFn} {...props}>
      <Tabs.List>
        <Tabs.Trigger value="general">General</Tabs.Trigger>
        <Tabs.Trigger value="team">Team</Tabs.Trigger>
        <Tabs.Trigger value="automation">Automation</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="general">General settings</Tabs.Content>
      <Tabs.Content value="team">Team settings</Tabs.Content>
      <Tabs.Content value="automation">Automation settings</Tabs.Content>
    </Tabs>
  );

  return handleMockFn;
};

const getTab = (name: string) => screen.getByRole('tab', { name });

describe('Tabs', () => {
  it('should be defined', () => {
    expect(Tabs).toBeDefined();
    expect(Tabs.List).toBeDefined();
    expect(Tabs.Trigger).toBeDefined();
    expect(Tabs.Content).toBeDefined();
  });

  it('should call onChange with the tab value on click', async () => {
    const mockFn = renderTabs({ defaultValue: 'general' });

    await userEvent.click(getTab('Team'));

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('team');
  });

  it('should not call onChange on click on the active tab', async () => {
    const mockFn = renderTabs({ defaultValue: 'general' });

    await userEvent.click(getTab('General'));

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should not change the active tab in controlled mode without a new value', async () => {
    const mockFn = renderTabs({ value: 'general' });

    await userEvent.click(getTab('Team'));

    expect(mockFn).toHaveBeenCalledWith('team');
    expect(getTab('General')).toHaveAttribute('aria-selected', 'true');
    expect(getTab('Team')).toHaveAttribute('aria-selected', 'false');
  });

  it('should set the active tab by defaultValue and change it on click in uncontrolled mode', async () => {
    renderTabs({ defaultValue: 'team' });

    expect(getTab('Team')).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(getTab('Automation'));

    expect(getTab('Automation')).toHaveAttribute('aria-selected', 'true');
    expect(getTab('Team')).toHaveAttribute('aria-selected', 'false');
  });

  it('should focus the active tab on Tab and the panel on the next Tab', async () => {
    renderTabs({ defaultValue: 'team' });

    await userEvent.tab();

    expect(getTab('Team')).toHaveFocus();

    await userEvent.tab();

    expect(screen.getByRole('tabpanel')).toHaveFocus();
  });

  it('should move focus with arrow keys in a loop and with Home / End', async () => {
    renderTabs({ defaultValue: 'general', activationMode: 'manual' });

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(getTab('Team')).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}{ArrowRight}');

    expect(getTab('General')).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');

    expect(getTab('Automation')).toHaveFocus();

    await userEvent.keyboard('{Home}');

    expect(getTab('General')).toHaveFocus();

    await userEvent.keyboard('{End}');

    expect(getTab('Automation')).toHaveFocus();
  });

  it('should select a tab on focus with automatic activation', async () => {
    const mockFn = renderTabs({ defaultValue: 'general' });

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(mockFn).toHaveBeenCalledWith('team');
    expect(getTab('Team')).toHaveAttribute('aria-selected', 'true');
  });

  it('should select a tab only by Enter / Space with manual activation', async () => {
    const mockFn = renderTabs({
      defaultValue: 'general',
      activationMode: 'manual',
    });

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(mockFn).not.toHaveBeenCalled();
    expect(getTab('General')).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{Enter}');

    expect(mockFn).toHaveBeenLastCalledWith('team');
    expect(getTab('Team')).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard(' ');

    expect(mockFn).toHaveBeenLastCalledWith('automation');
    expect(getTab('Automation')).toHaveAttribute('aria-selected', 'true');
  });

  it('should render only the active panel content', async () => {
    renderTabs({ defaultValue: 'general' });

    expect(screen.getByRole('tabpanel')).toHaveTextContent('General settings');
    expect(screen.queryByText('Team settings')).not.toBeInTheDocument();

    await userEvent.click(getTab('Team'));

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Team settings');
    expect(screen.queryByText('General settings')).not.toBeInTheDocument();
  });

  it('should set roles and link the tab with its panel', () => {
    renderTabs({ defaultValue: 'general' });

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);

    const tab = getTab('General');
    const panel = screen.getByRole('tabpanel');

    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });

  it('should pass data attributes to the tab button', () => {
    render(
      <Tabs theme={TabsPrimaryTheme} defaultValue="general">
        <Tabs.List>
          <Tabs.Trigger value="general" data-amp-key="general-tab">
            General
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    );

    const tab = getTab('General');

    expect(tab.tagName).toBe('BUTTON');
    expect(tab).toHaveAttribute('data-amp-key', 'general-tab');
  });

  it('should not submit a form on tab click', async () => {
    const handleSubmit = jest.fn((e: React.FormEvent) => e.preventDefault());

    render(
      <form onSubmit={handleSubmit}>
        <Tabs theme={TabsPrimaryTheme} defaultValue="general">
          <Tabs.List>
            <Tabs.Trigger value="general">General</Tabs.Trigger>
            <Tabs.Trigger value="team">Team</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </form>
    );

    expect(getTab('Team')).toHaveAttribute('type', 'button');

    await userEvent.click(getTab('Team'));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should ignore disabled passed past the types', async () => {
    const forbiddenProps = { disabled: true } as object;
    const handleChange = jest.fn();

    render(
      <Tabs
        theme={TabsPrimaryTheme}
        defaultValue="general"
        onChange={handleChange}
      >
        <Tabs.List>
          <Tabs.Trigger value="general">General</Tabs.Trigger>
          <Tabs.Trigger value="team" {...forbiddenProps}>
            Team
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    );

    const team = getTab('Team');

    expect(team).toBeEnabled();

    await userEvent.click(team);

    expect(handleChange).toHaveBeenCalledWith('team');
  });

  it('should ignore orientation passed past the types', async () => {
    const forbiddenProps = { orientation: 'vertical' } as object;

    renderTabs({ defaultValue: 'general', ...forbiddenProps });

    expect(screen.getByRole('tablist')).toHaveAttribute(
      'aria-orientation',
      'horizontal'
    );

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(getTab('Team')).toHaveFocus();
  });
});
