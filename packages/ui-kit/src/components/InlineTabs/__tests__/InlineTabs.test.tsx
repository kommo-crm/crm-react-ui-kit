import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  InlineTabs,
  InlineTabsPrimaryTheme,
  InlineTabsSecondaryTheme,
  type InlineTabsProps,
} from '..';

import {
  useTabsLayout,
  type UseTabsLayoutResult,
} from '../components/List/hooks/useTabsLayout';

import '@testing-library/jest-dom';

jest.mock('../components/List/hooks/useTabsLayout', () => ({
  useTabsLayout: jest.fn(),
}));

const mockLayout = (layout: Partial<UseTabsLayoutResult>) => {
  (useTabsLayout as jest.Mock).mockReturnValue({
    visibleCount: Infinity,
    tabWidths: [],
    isSettled: true,
    ...layout,
  });
};

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const renderInlineTabs = (props: Partial<InlineTabsProps> = {}) => {
  const handleChange = jest.fn();

  render(
    <InlineTabs
      theme={InlineTabsPrimaryTheme}
      defaultValue="main"
      onChange={handleChange}
      {...props}
    >
      <InlineTabs.List>
        <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
        <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
        <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
      </InlineTabs.List>

      <InlineTabs.Content value="main">Main panel</InlineTabs.Content>
      <InlineTabs.Content value="media">Media panel</InlineTabs.Content>
      <InlineTabs.Content value="setup">Setup panel</InlineTabs.Content>
    </InlineTabs>
  );

  return handleChange;
};

const getTab = (name: string) => screen.getByRole('tab', { name });

const getTabContent = (element: HTMLElement) => element.firstElementChild;

interface MountProbeProps {
  /**
   * The value of the tab the probe is rendered in.
   */
  value: string;
}

const renderOverflowTabs = (props: Partial<InlineTabsProps> = {}) =>
  render(
    <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main" {...props}>
      <InlineTabs.List>
        <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
        <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
        <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
      </InlineTabs.List>
    </InlineTabs>
  );

describe('InlineTabs', () => {
  beforeEach(() => {
    mockLayout({});
  });

  it('should be defined', () => {
    expect(InlineTabs).toBeDefined();
    expect(InlineTabs.Root).toBe(InlineTabs);
    expect(InlineTabs.List).toBeDefined();
    expect(InlineTabs.Content).toBeDefined();
    expect(InlineTabsSecondaryTheme).toBeDefined();
  });

  it('should select a tab on click and call onChange once', async () => {
    const onChange = renderInlineTabs();

    await userEvent.click(getTab('Media'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('media');
    expect(getTab('Media')).toHaveAttribute('aria-selected', 'true');
  });

  it('should not call onChange for the selected tab', async () => {
    const onChange = renderInlineTabs();

    await userEvent.click(getTab('Main'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should keep the selection in controlled mode when value does not change', async () => {
    const onChange = renderInlineTabs({
      value: 'main',
      defaultValue: undefined,
    });

    await userEvent.click(getTab('Setup'));

    expect(onChange).toHaveBeenCalledWith('setup');
    expect(getTab('Main')).toHaveAttribute('aria-selected', 'true');
    expect(getTab('Setup')).toHaveAttribute('aria-selected', 'false');
  });

  it('should not select a tab on focus', async () => {
    const onChange = renderInlineTabs();

    act(() => getTab('Main').focus());
    await userEvent.keyboard('{ArrowRight}');

    expect(getTab('Media')).toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render the counter but not TabMenuIcon in the panel', () => {
    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>
          <InlineTabs.Tab value="a" counter={5}>
            <InlineTabs.TabMenuIcon>
              <svg data-testid="icon" />
            </InlineTabs.TabMenuIcon>
            <InlineTabs.TabLabel>A</InlineTabs.TabLabel>
          </InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    expect(within(screen.getByRole('tab')).getByText('5')).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('should show 99+ above 99 and no counter at zero or without it', () => {
    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>
          <InlineTabs.Tab value="a" counter={150}>
            A
          </InlineTabs.Tab>
          <InlineTabs.Tab value="b" counter={0}>
            B
          </InlineTabs.Tab>
          <InlineTabs.Tab value="c">C</InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    expect(screen.getAllByRole('tab').map((tab) => tab.textContent)).toEqual([
      'A99+',
      'B',
      'C',
    ]);
  });

  it('should forward span props to TabLabel and TabMenuIcon', async () => {
    mockLayout({ visibleCount: 0 });

    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>
          <InlineTabs.Tab value="a">
            <InlineTabs.TabMenuIcon className="icon" data-testid="icon">
              <svg />
            </InlineTabs.TabMenuIcon>
            <InlineTabs.TabLabel className="label" data-testid="label">
              A
            </InlineTabs.TabLabel>
          </InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    await userEvent.click(screen.getByRole('button'));

    const item = screen.getByRole('menuitem');

    expect(within(item).getByTestId('icon')).toHaveClass('icon');
    expect(within(item).getByTestId('label')).toHaveClass('label');
  });

  it('should forward className, style and ref to the root', () => {
    const ref = React.createRef<HTMLDivElement>();

    const { container } = render(
      <InlineTabs
        ref={ref}
        theme={InlineTabsPrimaryTheme}
        className="custom"
        style={{ marginTop: 3 }}
        defaultValue="a"
      >
        <InlineTabs.List>
          <InlineTabs.Tab value="a">A</InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    const root = container.firstElementChild as HTMLElement;

    expect(ref.current).toBe(root);
    expect(root).toHaveClass('custom');
    expect(root).toHaveStyle({ marginTop: '3px' });
  });

  it('should render Content of the selected tab only', async () => {
    renderInlineTabs();

    expect(screen.getByText('Main panel')).toBeInTheDocument();
    expect(screen.queryByText('Media panel')).not.toBeInTheDocument();

    await userEvent.click(getTab('Media'));

    expect(screen.getByText('Media panel')).toBeInTheDocument();
    expect(screen.queryByText('Main panel')).not.toBeInTheDocument();
  });
  it('should render hidden tabs in the menu and show the overflow button', async () => {
    mockLayout({ visibleCount: 1 });

    renderOverflowTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(1);
    expect(getTab('Main')).toBeInTheDocument();

    const overflowButton = screen.getByRole('button');

    expect(overflowButton).toHaveAttribute('aria-haspopup', 'menu');

    await userEvent.click(overflowButton);

    const items = screen.getAllByRole('menuitem');

    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Media');
    expect(items[1]).toHaveTextContent('Setup');
  });

  it('should not render the overflow button when nothing is hidden', () => {
    renderOverflowTabs();

    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render TabMenuIcon where it is placed and the counter last in the menu item', async () => {
    mockLayout({ visibleCount: 1 });

    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>
          <InlineTabs.Tab value="a">A</InlineTabs.Tab>
          <InlineTabs.Tab value="b" counter={3}>
            <InlineTabs.TabMenuIcon>
              <svg data-testid="menu-icon" />
            </InlineTabs.TabMenuIcon>
            <InlineTabs.TabLabel>B</InlineTabs.TabLabel>
          </InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    await userEvent.click(screen.getByRole('button'));

    const item = screen.getByRole('menuitem');

    const icon = within(item).getByTestId('menu-icon');
    const label = within(item).getByText('B');
    const counter = within(item).getByText('3');

    expect(icon.compareDocumentPosition(label)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(label.compareDocumentPosition(counter)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('should show the sum of the hidden counters on the overflow button', () => {
    mockLayout({ visibleCount: 1 });

    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
        <InlineTabs.List>
          <InlineTabs.Tab value="main" counter={100}>
            Main
          </InlineTabs.Tab>
          <InlineTabs.Tab value="media" counter={7}>
            Media
          </InlineTabs.Tab>
          <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
          <InlineTabs.Tab value="team" counter={5}>
            Team
          </InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    expect(screen.getByRole('button')).toHaveTextContent('12');
  });

  it('should show no counter on the overflow button when the hidden tabs have none', () => {
    mockLayout({ visibleCount: 1 });

    renderOverflowTabs();

    expect(screen.getByRole('button').textContent).toBe('');
  });

  it('should name the overflow button with overflowButtonAriaLabel', () => {
    mockLayout({ visibleCount: 1 });

    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
        <InlineTabs.List overflowButtonAriaLabel="More tabs">
          <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
          <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    expect(
      screen.getByRole('button', { name: 'More tabs' })
    ).toBeInTheDocument();
  });

  it('should set the measured width as the flex basis of the tab', () => {
    mockLayout({ tabWidths: [90.5, 65, 65] });

    renderOverflowTabs();

    expect(getTab('Main')).toHaveStyle({ flexBasis: '90.5px' });
  });

  it('should set title and data attributes on the tab', () => {
    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>
          <InlineTabs.Tab value="a" title="Tab A" data-amp-key="tab-a">
            A
          </InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    expect(getTabContent(getTab('A'))).toHaveAttribute('title', 'Tab A');
    expect(getTabContent(getTab('A'))).toHaveAttribute('data-amp-key', 'tab-a');
  });

  it('should pass div props of Tab to the tab and the menu item', async () => {
    mockLayout({ visibleCount: 1 });

    const handleClick = jest.fn();

    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>
          <InlineTabs.Tab value="a" className="custom-a" onClick={handleClick}>
            A
          </InlineTabs.Tab>
          <InlineTabs.Tab value="b" className="custom-b">
            B
          </InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    await userEvent.click(getTabContent(getTab('A')) as HTMLElement);

    expect(getTabContent(getTab('A'))).toHaveClass('custom-a');
    expect(handleClick).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole('button'));

    expect(getTabContent(screen.getByRole('menuitem'))).toHaveClass('custom-b');
  });

  it('should keep the Tab id only on the panel copy', async () => {
    mockLayout({ visibleCount: 1 });

    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>
          <InlineTabs.Tab value="a" id="custom-a">
            A
          </InlineTabs.Tab>
          <InlineTabs.Tab value="b" id="custom-b">
            B
          </InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(document.querySelectorAll('#custom-a')).toHaveLength(1);
    expect(document.querySelectorAll('#custom-b')).toHaveLength(1);
    expect(
      document.getElementById('custom-b')?.closest('[role="tab"]')
    ).toHaveAttribute('hidden');
    expect(getTabContent(getTab('A'))).toHaveAttribute('id', 'custom-a');
    expect(getTabContent(screen.getByRole('menuitem'))).not.toHaveAttribute(
      'id'
    );
  });

  it('should keep the tab semantics when Tab gets id, role and aria props', () => {
    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>
          <InlineTabs.Tab
            value="a"
            id="custom-a"
            role="presentation"
            aria-selected={false}
          >
            A
          </InlineTabs.Tab>
        </InlineTabs.List>
        <InlineTabs.Content value="a">Panel A</InlineTabs.Content>
      </InlineTabs>
    );

    const tab = getTab('A');

    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(tab.id).not.toBe('custom-a');
    expect(screen.getByRole('tabpanel')).toHaveAttribute(
      'aria-labelledby',
      tab.id
    );
  });

  it('should render an empty panel for no items', () => {
    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>{null}</InlineTabs.List>
      </InlineTabs>
    );

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should keep the measure layer hidden from assistive technologies', () => {
    const { container } = render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
        <InlineTabs.List>
          <InlineTabs.Tab value="a">A</InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    const measureLayer = container.querySelector('[aria-hidden="true"]');

    expect(measureLayer).toHaveTextContent('A');
    expect(measureLayer?.querySelector('button, [tabindex]')).toBeNull();
  });

  it('should render Tab in conditional and mapped children in order', () => {
    const isMediaShown = true;

    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
        <InlineTabs.List>
          <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
          {isMediaShown && <InlineTabs.Tab value="media">Media</InlineTabs.Tab>}
          {['Setup', 'Reports'].map((label) => (
            <InlineTabs.Tab key={label} value={label.toLowerCase()}>
              {label}
            </InlineTabs.Tab>
          ))}
        </InlineTabs.List>
      </InlineTabs>
    );

    expect(screen.getAllByRole('tab').map((tab) => tab.textContent)).toEqual([
      'Main',
      'Media',
      'Setup',
      'Reports',
    ]);
  });

  it('should drop a removed hidden tab from the menu', async () => {
    mockLayout({ visibleCount: 1 });

    const tree = (isSetupShown: boolean) => (
      <InlineTabs theme={InlineTabsPrimaryTheme} value="setup">
        <InlineTabs.List>
          <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
          <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
          {isSetupShown && <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>}
        </InlineTabs.List>
      </InlineTabs>
    );

    const { rerender } = render(tree(true));

    rerender(tree(false));

    await userEvent.click(screen.getByRole('button'));

    expect(
      screen.getAllByRole('menuitem').map((item) => item.textContent)
    ).toEqual(['Media']);
  });

  it('should update the menu without remounting the tabs when tabs are inserted or moved', async () => {
    mockLayout({ visibleCount: 1 });

    const onMount = jest.fn();

    const MountProbe = (props: MountProbeProps) => {
      const { value } = props;

      React.useEffect(() => onMount(value), [value]);

      return null;
    };

    const LABELS: Record<string, string> = {
      main: 'Main',
      media: 'Media',
      setup: 'Setup',
      reports: 'Reports',
    };

    const tree = (values: string[]) => (
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
        <InlineTabs.List>
          {values.map((value) => (
            <InlineTabs.Tab key={value} value={value}>
              {LABELS[value]}
              <MountProbe value={value} />
            </InlineTabs.Tab>
          ))}
        </InlineTabs.List>
      </InlineTabs>
    );

    const { rerender } = render(tree(['main', 'media', 'setup']));

    onMount.mockClear();

    rerender(tree(['reports', 'main', 'media', 'setup']));
    rerender(tree(['reports', 'setup', 'media', 'main']));

    expect(onMount.mock.calls).toEqual([['reports'], ['reports']]);

    await userEvent.click(screen.getByRole('button'));

    expect(
      screen.getAllByRole('menuitem').map((item) => item.textContent)
    ).toEqual(['Setup', 'Media', 'Main']);
  });

  it('should render the overflow button after the list children', () => {
    mockLayout({ visibleCount: 2 });

    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
        <InlineTabs.List>
          <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
          <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
          <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
          <span>After</span>
        </InlineTabs.List>
      </InlineTabs>
    );

    const button = screen.getByRole('button');

    expect(screen.getByText('After').compareDocumentPosition(button)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('should render List children other than Tab in place', () => {
    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
        <InlineTabs.List>
          <span>Before</span>
          <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
          <span>Between</span>
          <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    const listChildren = Array.from(screen.getByRole('tablist').children);
    const positions = [
      screen.getByText('Before'),
      getTab('Main'),
      screen.getByText('Between'),
      getTab('Setup'),
    ].map((element) => listChildren.indexOf(element));

    expect(screen.getAllByRole('tab')).toHaveLength(2);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(positions).not.toContain(-1);
  });

  it('should keep the trigger of a hidden selected tab for its panel label', () => {
    mockLayout({ visibleCount: 1 });

    renderInlineTabs({ defaultValue: 'setup' });

    const panel = screen.getByRole('tabpanel');
    const trigger = document.getElementById(
      panel.getAttribute('aria-labelledby') ?? ''
    );

    expect(panel).toHaveTextContent('Setup panel');
    expect(trigger).toHaveTextContent('Setup');
    expect(trigger).not.toBeVisible();
  });

  it('should render a tab without TabLabel', () => {
    render(
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="icon">
        <InlineTabs.List>
          <InlineTabs.Tab value="icon" title="Icon">
            <svg data-testid="tab-icon" />
          </InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    expect(
      within(screen.getByRole('tab')).getByTestId('tab-icon')
    ).toBeInTheDocument();
  });

  it('should select tabs with the arrow keys and Enter', async () => {
    const handleChange = renderInlineTabs();

    act(() => {
      getTab('Main').focus();
    });
    await userEvent.keyboard('{ArrowRight}{Enter}');

    expect(getTab('Media')).toHaveFocus();
    expect(handleChange).toHaveBeenCalledWith('media');
  });

  it('should not scroll the page on Space on a tab', () => {
    renderInlineTabs();

    const isNotPrevented = fireEvent.keyDown(getTab('Media'), { key: ' ' });

    expect(isNotPrevented).toBe(false);
  });

  it('should select the focused tab on Space', async () => {
    const onChange = renderInlineTabs();

    act(() => getTab('Main').focus());
    await userEvent.keyboard('{ArrowRight} ');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('media');
  });

  it('should keep the overflow button mounted when the split changes', () => {
    mockLayout({ visibleCount: 2 });

    const tree = () => (
      <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
        <InlineTabs.List>
          <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
          <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
          <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs>
    );

    const { rerender } = render(tree());
    const button = screen.getByRole('button');

    mockLayout({ visibleCount: 1 });
    rerender(tree());

    expect(
      screen.queryByRole('tab', { name: 'Media' })
    ).not.toBeInTheDocument();

    expect(button.isConnected).toBe(true);
    expect(screen.getByRole('button')).toBe(button);
  });

  it('should render the parts outside List without errors', () => {
    render(
      <>
        <InlineTabs.Tab value="a" id="custom-a" counter={2}>
          <InlineTabs.TabMenuIcon data-testid="icon" />
          <InlineTabs.TabLabel>A</InlineTabs.TabLabel>
        </InlineTabs.Tab>
      </>
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(document.getElementById('custom-a')).toHaveTextContent('A');
  });

  describe('overflow menu', () => {
    const openMenu = async () => {
      await userEvent.click(screen.getByRole('button'));

      return screen.getAllByRole('menuitem');
    };

    it('should add the theme class to the portaled menu content', async () => {
      mockLayout({ visibleCount: 1 });

      const { container } = render(
        <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
          <InlineTabs.List>
            <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
            <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
          </InlineTabs.List>
        </InlineTabs>
      );

      const rootClassList = Array.from(
        container.firstElementChild?.classList ?? []
      ).filter((className) => !className.includes('inlineTabs'));

      const [item] = await openMenu();
      const content = item.closest('[data-menu-level]');

      expect(rootClassList.length).toBeGreaterThan(0);
      expect(container).not.toContainElement(content as HTMLElement);
      rootClassList.forEach((className) => {
        expect(content).toHaveClass(className);
      });
    });

    it('should select a hidden tab from the menu in uncontrolled mode', async () => {
      mockLayout({ visibleCount: 1 });

      const onChange = jest.fn();

      renderOverflowTabs({ onChange });

      const [, setup] = await openMenu();

      fireEvent.click(setup);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('setup');

      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();

      const [, reopenedSetup] = await openMenu();

      expect(reopenedSetup).toHaveAttribute('data-selected');
    });

    it('should return focus to the overflow button after a keyboard selection in the menu', async () => {
      mockLayout({ visibleCount: 1 });

      const onChange = jest.fn();

      renderOverflowTabs({ onChange });

      const overflowButton = screen.getByRole('button');

      act(() => overflowButton.focus());
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => {
        expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
      });
      await userEvent.keyboard('{Enter}');

      expect(onChange).toHaveBeenCalledWith('media');
      await waitFor(() => {
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
      });
      await waitFor(() => {
        expect(overflowButton).toHaveFocus();
      });
    });

    it('should keep focus on an outside element the menu was closed by', async () => {
      mockLayout({ visibleCount: 1 });

      render(
        <>
          <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
            <InlineTabs.List>
              <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
              <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
            </InlineTabs.List>
          </InlineTabs>
          <input aria-label="Outside" />
        </>
      );

      act(() => screen.getByRole('button').focus());
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => {
        expect(screen.getByRole('menuitem')).toHaveFocus();
      });

      const input = screen.getByRole('textbox', { name: 'Outside' });

      await userEvent.click(input);

      await waitFor(() => {
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
      });
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(input).toHaveFocus();
    });

    it('should not move focus to the overflow button after a click on an empty place', async () => {
      mockLayout({ visibleCount: 1 });

      renderOverflowTabs();

      const overflowButton = screen.getByRole('button');

      act(() => overflowButton.focus());
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => {
        expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
      });

      await userEvent.click(document.body);

      await waitFor(() => {
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
      });
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(overflowButton).not.toHaveFocus();
    });

    it('should set title and data attributes on the menu item', async () => {
      mockLayout({ visibleCount: 1 });

      render(
        <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="a">
          <InlineTabs.List>
            <InlineTabs.Tab value="a">A</InlineTabs.Tab>
            <InlineTabs.Tab value="b" title="Tab B" data-amp-key="tab-b">
              B
            </InlineTabs.Tab>
          </InlineTabs.List>
        </InlineTabs>
      );

      const [item] = await openMenu();

      expect(getTabContent(item)).toHaveAttribute('title', 'Tab B');
      expect(getTabContent(item)).toHaveAttribute('data-amp-key', 'tab-b');
    });

    it('should mark the selected hidden item', async () => {
      mockLayout({ visibleCount: 1 });

      renderOverflowTabs({ defaultValue: 'setup' });

      const [media, setup] = await openMenu();

      expect(setup).toHaveAttribute('data-selected');
      expect(setup).toHaveAttribute('aria-current', 'true');
      expect(media).not.toHaveAttribute('data-selected');
      expect(media).not.toHaveAttribute('aria-current');
    });

    describe('refs inside a tab', () => {
      const tabRef = React.createRef<HTMLDivElement>();
      const dotRef = React.createRef<HTMLDivElement>();
      const onMainMount = jest.fn();

      const MountProbe = () => {
        React.useEffect(() => onMainMount(), []);

        return null;
      };

      const RefTabs = () => (
        <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
          <InlineTabs.List>
            <InlineTabs.Tab value="main">
              Main
              <MountProbe />
            </InlineTabs.Tab>
            <InlineTabs.Tab ref={tabRef} value="team" counter={3}>
              <InlineTabs.TabLabel>Team</InlineTabs.TabLabel>
              <div ref={dotRef} />
            </InlineTabs.Tab>
          </InlineTabs.List>
        </InlineTabs>
      );

      const getPanelTeamTab = () =>
        screen.getAllByRole('tab', { hidden: true })[1];

      const closeMenu = async () => {
        await userEvent.keyboard('{Escape}');
        await waitFor(() => {
          expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
        });
      };

      const expectRefsOnPanelTab = () => {
        const panelTab = getPanelTeamTab();

        expect(tabRef.current).toBe(getTabContent(panelTab));
        expect(dotRef.current).not.toBeNull();
        expect(panelTab).toContainElement(dotRef.current);
      };

      beforeEach(() => {
        onMainMount.mockClear();
      });

      it('should attach the refs to the panel tab on mount', () => {
        mockLayout({ visibleCount: 1 });

        render(<RefTabs />);

        expectRefsOnPanelTab();
      });

      it('should attach the refs back to the panel tab after the menu closes', async () => {
        mockLayout({ visibleCount: 1 });

        render(<RefTabs />);

        await openMenu();
        await closeMenu();

        expectRefsOnPanelTab();
      });

      it('should keep the refs on the panel tab when the tab leaves the menu', async () => {
        mockLayout({ visibleCount: 1 });

        const { rerender } = render(<RefTabs />);

        await openMenu();
        await closeMenu();

        mockLayout({});
        rerender(<RefTabs />);

        expect(getPanelTeamTab()).not.toHaveAttribute('hidden');
        expectRefsOnPanelTab();
      });

      it('should not remount the tabs that were not in the menu', async () => {
        mockLayout({ visibleCount: 1 });

        render(<RefTabs />);

        const mountCount = onMainMount.mock.calls.length;

        await openMenu();
        await closeMenu();

        expect(onMainMount).toHaveBeenCalledTimes(mountCount);
      });
    });
  });

  it('should select a hidden tab from the menu with the keyboard', async () => {
    mockLayout({ visibleCount: 1 });

    const onChange = jest.fn();

    renderOverflowTabs({ onChange });

    act(() => screen.getByRole('button').focus());
    await userEvent.keyboard('{Enter}');

    const [media] = await screen.findAllByRole('menuitem');

    expect(media).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('setup');
  });

  describe('slider', () => {
    const OFFSETS: Record<string, [number, number]> = {
      Main: [0, 50],
      Media: [50, 60],
      Setup: [110, 55],
    };

    const getSlider = () =>
      document.querySelector<HTMLElement>('[data-inline-tabs-slider]');

    let boxSpy: jest.SpyInstance;

    const boxOf = (el: HTMLElement): [number, number] => {
      if (el.getAttribute('aria-haspopup')) {
        return [110, 32];
      }

      return OFFSETS[el.textContent ?? ''] ?? [0, 0];
    };

    beforeEach(() => {
      boxSpy = jest
        .spyOn(Element.prototype, 'getBoundingClientRect')
        .mockImplementation(function mock(this: HTMLElement) {
          const [left, width] = boxOf(this);

          return { left, width } as DOMRect;
        });
    });

    afterEach(() => {
      boxSpy.mockRestore();
    });

    it('should place the slider under the selected tab', () => {
      renderOverflowTabs({ defaultValue: 'media' });

      expect(getSlider()).toHaveStyle({ left: '50px', width: '60px' });
    });

    it('should place the slider under the overflow button when a hidden tab is selected', () => {
      mockLayout({ visibleCount: 1 });

      renderOverflowTabs({ defaultValue: 'setup' });

      expect(getSlider()).toHaveStyle({ left: '110px', width: '32px' });
    });

    it('should animate only moves caused by a selection', async () => {
      renderOverflowTabs();

      expect(getSlider()).not.toHaveAttribute('data-animated');

      await userEvent.click(getTab('Media'));

      expect(getSlider()).toHaveStyle({ left: '50px' });
      expect(getSlider()).toHaveAttribute('data-animated');
    });

    it('should not animate a move caused by a layout change', () => {
      mockLayout({ visibleCount: Infinity });

      const view = render(
        <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="setup">
          <InlineTabs.List>
            <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
            <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
          </InlineTabs.List>
        </InlineTabs>
      );

      expect(getSlider()).toHaveStyle({ left: '110px' });

      mockLayout({ visibleCount: 1 });
      view.rerender(
        <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="setup">
          <InlineTabs.List>
            <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
            <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
          </InlineTabs.List>
        </InlineTabs>
      );

      expect(getSlider()).toHaveStyle({ left: '110px', width: '32px' });
      expect(getSlider()).not.toHaveAttribute('data-animated');
    });

    it('should open the menu on hover and hide the slider while it is open', async () => {
      mockLayout({ visibleCount: 1 });

      renderOverflowTabs();

      expect(getSlider()).toBeInTheDocument();

      const overflowButton = screen.getByRole('button');

      await userEvent.hover(overflowButton);

      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(getSlider()).not.toBeInTheDocument();

      await userEvent.unhover(overflowButton);

      await waitFor(() => expect(getSlider()).toBeInTheDocument());
    });

    it('should show the slider again when the open menu unmounts because all tabs fit', async () => {
      mockLayout({ visibleCount: 1 });

      const { rerender } = renderOverflowTabs();

      await userEvent.hover(screen.getByRole('button'));

      expect(getSlider()).not.toBeInTheDocument();

      mockLayout({ visibleCount: Infinity });
      rerender(
        <InlineTabs theme={InlineTabsPrimaryTheme} defaultValue="main">
          <InlineTabs.List>
            <InlineTabs.Tab value="main">Main</InlineTabs.Tab>
            <InlineTabs.Tab value="media">Media</InlineTabs.Tab>
            <InlineTabs.Tab value="setup">Setup</InlineTabs.Tab>
          </InlineTabs.List>
        </InlineTabs>
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(getSlider()).toBeInTheDocument();
    });

    it('should not render the slider when value matches no tab', () => {
      renderOverflowTabs({ defaultValue: 'unknown' });

      expect(getSlider()).not.toBeInTheDocument();
    });
  });
});
