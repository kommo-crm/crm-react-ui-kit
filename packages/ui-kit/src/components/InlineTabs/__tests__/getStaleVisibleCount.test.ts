import { getStaleVisibleCount } from '../components/List/utils';

describe('getStaleVisibleCount', () => {
  it.each([
    {
      name: 'a tab inserted before a visible one when every tab was visible',
      values: ['a', 'b', 'c'],
      visibleCount: 3,
      tabValues: ['d', 'a', 'b', 'c'],
      expected: 4,
    },
    {
      name: 'a visible tab removed when every tab was visible',
      values: ['a', 'b', 'c'],
      visibleCount: 3,
      tabValues: ['a', 'c'],
      expected: 2,
    },
    {
      name: 'a tab inserted before a visible one with the menu',
      values: ['a', 'b', 'c'],
      visibleCount: 2,
      tabValues: ['d', 'a', 'b', 'c'],
      expected: 3,
    },
    {
      name: 'a tab appended with the menu',
      values: ['a', 'b', 'c'],
      visibleCount: 2,
      tabValues: ['a', 'b', 'c', 'd'],
      expected: 2,
    },
    {
      name: 'a visible tab removed with the menu',
      values: ['a', 'b', 'c'],
      visibleCount: 2,
      tabValues: ['a', 'c'],
      expected: 1,
    },
    {
      name: 'the only hidden tab removed',
      values: ['a', 'b', 'c'],
      visibleCount: 2,
      tabValues: ['a', 'b'],
      expected: 2,
    },
    {
      name: 'a hidden tab moved to the start',
      values: ['a', 'b', 'c'],
      visibleCount: 2,
      tabValues: ['c', 'a', 'b'],
      expected: 2,
    },
    {
      name: 'a visible tab moved past the hidden ones',
      values: ['a', 'b', 'c', 'd'],
      visibleCount: 3,
      tabValues: ['b', 'c', 'd', 'a'],
      expected: 3,
    },
    {
      name: 'the only hidden tab replaced by a tab inserted at the start',
      values: ['a', 'b', 'c'],
      visibleCount: 2,
      tabValues: ['d', 'a', 'b'],
      expected: 2,
    },
    {
      name: 'every tab removed with the menu',
      values: ['a', 'b', 'c'],
      visibleCount: 2,
      tabValues: [],
      expected: 0,
    },
    {
      name: 'the only hidden tab replaced by a tab appended',
      values: ['a', 'b', 'c'],
      visibleCount: 2,
      tabValues: ['a', 'b', 'd'],
      expected: 2,
    },
  ])('should handle $name', (testCase) => {
    expect(
      getStaleVisibleCount({
        tabsKey: testCase.values.join('\n'),
        visibleCount: testCase.visibleCount,
        tabValues: testCase.tabValues,
      })
    ).toBe(testCase.expected);
  });
});
