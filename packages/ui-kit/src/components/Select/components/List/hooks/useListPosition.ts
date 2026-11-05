import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from '@floating-ui/react-dom';

export type UseListPositionOptions = {
  /**
   * Whether the list is currently open.
   */
  isOpened: boolean;
  /**
   * Element the list is positioned against.
   */
  anchorElement: HTMLElement | null;
};

/**
 * Reads a shift of the list from its theme,
 * so the item text lines up with the button text.
 */
const getListShift = (
  listElement: HTMLElement,
  name: '--crm-ui-kit-list-top' | '--crm-ui-kit-list-left'
) => {
  const value = getComputedStyle(listElement).getPropertyValue(name);

  return parseFloat(value) || 0;
};

/**
 * Positions the list over its anchor with Floating UI, the engine
 * of Radix popper content:
 * - the list overlays the anchor, starting at its top or ending at its bottom;
 * - is shifted by `--crm-ui-kit-list-left` and `--crm-ui-kit-list-top`
 *   of the list theme, a negative top shift moves the list past the anchor
 *   edge it starts or ends at;
 * - flips to the side with more space when it does not fit below;
 * - is limited in height by the space left on that side;
 * - follows the anchor on scroll, resize and list size changes.
 *
 * The `fixed` strategy keeps the list from being clipped
 * by scrollable ancestors, such as a modal body.
 */
export const useListPosition = (options: UseListPositionOptions) => {
  const { isOpened, anchorElement } = options;

  const { refs, floatingStyles, isPositioned } = useFloating({
    open: isOpened,
    strategy: 'fixed',
    placement: 'bottom-start',
    elements: { reference: anchorElement },
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(({ rects, elements }) => ({
        mainAxis:
          -rects.reference.height +
          getListShift(elements.floating, '--crm-ui-kit-list-top'),
        crossAxis: getListShift(elements.floating, '--crm-ui-kit-list-left'),
      })),
      flip(),
      size({
        apply: ({ rects, availableHeight, elements }) => {
          const { style } = elements.floating;

          style.setProperty(
            '--crm-ui-kit-list-anchor-width',
            `${rects.reference.width}px`
          );
          style.setProperty(
            '--crm-ui-kit-list-available-height',
            `${availableHeight}px`
          );
        },
      }),
    ],
  });

  return {
    setListElement: refs.setFloating,
    listStyle: floatingStyles,
    isPositioned,
  };
};
