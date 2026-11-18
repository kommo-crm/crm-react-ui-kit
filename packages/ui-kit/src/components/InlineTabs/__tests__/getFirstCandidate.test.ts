import { getFirstCandidate } from '../components/List/utils';

describe('getFirstCandidate', () => {
  it('should keep all tabs when they fit into the panel', () => {
    expect(
      getFirstCandidate({ tabWidths: [50, 50, 50], panelWidth: 150 })
    ).toBe(3);
  });

  it('should stop at the first tab that does not fit, without reserving the overflow button', () => {
    expect(
      getFirstCandidate({ tabWidths: [50, 50, 50, 50], panelWidth: 150 })
    ).toBe(3);
  });

  it('should count fractional widths without rounding', () => {
    expect(
      getFirstCandidate({ tabWidths: [40.3, 40.3, 40.3], panelWidth: 121 })
    ).toBe(3);
  });

  it('should keep no tab when even the first does not fit', () => {
    expect(getFirstCandidate({ tabWidths: [130, 100], panelWidth: 120 })).toBe(
      0
    );
  });
});
