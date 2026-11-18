import { doesSplitFit } from '../components/List/utils';

describe('doesSplitFit', () => {
  it('should fit the leading tabs with the overflow button', () => {
    expect(
      doesSplitFit({
        measurements: {
          tabWidths: [50, 50, 50],
          panelWidth: 132,
        },
        visibleCount: 2,
        overflowWidth: 32,
      })
    ).toBe(true);
  });

  it('should not fit when the overflow button takes the rest of the space', () => {
    expect(
      doesSplitFit({
        measurements: {
          tabWidths: [50, 50, 50],
          panelWidth: 131.9,
        },
        visibleCount: 2,
        overflowWidth: 32,
      })
    ).toBe(false);
  });

  it('should fit only the overflow button when no tab is visible', () => {
    expect(
      doesSplitFit({
        measurements: {
          tabWidths: [50],
          panelWidth: 32,
        },
        visibleCount: 0,
        overflowWidth: 32,
      })
    ).toBe(true);
  });
});
