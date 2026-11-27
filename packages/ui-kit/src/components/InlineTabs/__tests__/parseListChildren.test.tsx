import React from 'react';

import { Tab } from '../components/Tab';
import { parseListChildren } from '../components/List/utils';

const getValues = (children: React.ReactNode) =>
  parseListChildren(children).tabs.map((tab) => tab.props.value);

const getOtherKeys = (children: React.ReactNode) =>
  parseListChildren(children).listChildren.flatMap((child) =>
    child.kind === 'other' ? [child.key] : []
  );

describe('parseListChildren', () => {
  it('returns tabs in order with their props', () => {
    const { tabs } = parseListChildren(
      <>
        <Tab value="a" title="A" data-amp-key="tab-a">
          A
        </Tab>
        <Tab value="b">B</Tab>
      </>
    );

    expect(tabs.map((tab) => tab.props)).toEqual([
      { 'value': 'a', 'title': 'A', 'data-amp-key': 'tab-a', 'children': 'A' },
      { value: 'b', children: 'B' },
    ]);
  });

  it('unwraps fragments and nested arrays', () => {
    expect(
      getValues([
        <Tab key="a" value="a" />,
        [<Tab key="b" value="b" />, [<Tab key="c" value="c" />]],
        <React.Fragment key="d">
          <>
            <Tab value="d" />
          </>
        </React.Fragment>,
      ])
    ).toEqual(['a', 'b', 'c', 'd']);
  });

  it('takes only Tab elements as tabs', () => {
    expect(
      getValues(
        <>
          {false}
          {null}
          text
          <span>span</span>
          <Tab value="a" />
        </>
      )
    ).toEqual(['a']);
  });

  it('does not count a custom wrapper around Tab as a tab', () => {
    const Wrapped = () => <Tab value="b" />;

    expect(
      getValues(
        <>
          <Tab value="a" />
          <Wrapped />
        </>
      )
    ).toEqual(['a']);
  });

  it('keeps children in markup order', () => {
    const Wrapped = () => <Tab value="c" />;
    const span = <span>span</span>;

    const { tabs, listChildren } = parseListChildren(
      <>
        text
        <Tab value="a" />
        {span}
        <Tab value="b" />
        <Wrapped />
      </>
    );

    expect(listChildren).toMatchObject([
      { kind: 'other', node: 'text' },
      { kind: 'tab', tab: tabs[0], tabIndex: 0 },
      { kind: 'other' },
      { kind: 'tab', tab: tabs[1], tabIndex: 1 },
      { kind: 'other' },
    ]);
  });

  it('keeps the keys of other children when a conditional tab shows', () => {
    const getKeys = (isShown: boolean) =>
      getOtherKeys(
        <>
          <Tab value="a" />
          {isShown && <Tab value="b" />}
          <span>overflow</span>
        </>
      );

    expect(getKeys(true)).toEqual(getKeys(false));
  });

  it('keeps the key of a child after a conditional sibling', () => {
    const getKeys = (isLoading: boolean) =>
      getOtherKeys(
        <>
          {isLoading && <span>spinner</span>}
          <span>filter</span>
        </>
      );

    expect(getKeys(true)[1]).toBe(getKeys(false)[0]);
  });

  it('moves the key with an explicitly keyed child', () => {
    const [x, y] = getOtherKeys([<span key="x" />, <span key="y" />]);

    expect(getOtherKeys([<span key="y" />, <span key="x" />])).toEqual([y, x]);
  });

  it('gives unique keys to the children of different fragments', () => {
    const keys = getOtherKeys(
      <>
        <>
          <span />
          text
        </>
        <>
          <span />
          text
        </>
      </>
    );

    expect(new Set(keys).size).toBe(4);
  });
});
