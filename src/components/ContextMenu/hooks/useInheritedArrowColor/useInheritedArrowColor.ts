import { useLayoutEffect, useState } from 'react';

export const useInheritedArrowColor = (
  open: boolean,
  contentRef: React.RefObject<HTMLDivElement>
) => {
  const [inheritedArrowColor, setInheritedArrowColor] = useState<string | null>(
    null
  );

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const raf = requestAnimationFrame(() => {
      const updateColor = (item: Element) => {
        setInheritedArrowColor(getComputedStyle(item).backgroundColor);
      };

      const resolveTargetItem = () => {
        if (!contentRef.current) {
          return;
        }

        const side = contentRef.current?.dataset.side;
        const align = contentRef.current?.dataset.align;

        if (!side || !align) {
          return;
        }

        const items = Array.from(contentRef.current.children);

        if (!items.length) {
          return;
        }

        let index =
          side === 'bottom' || (side !== 'top' && align === 'start')
            ? 0
            : items.length - 1;

        let targetItem = items[index];

        if (!targetItem) {
          return;
        }

        if (targetItem.hasAttribute('data-arrow')) {
          if (side === 'bottom' || (side !== 'top' && align === 'start')) {
            index += 1;
          } else {
            index -= 1;
          }

          targetItem = items[index];

          if (!targetItem) {
            return;
          }
        }

        if (
          targetItem.hasAttribute('data-label') &&
          ['left', 'right'].includes(contentRef.current.dataset.side ?? '') &&
          contentRef.current.dataset.align === 'start'
        ) {
          if (side === 'bottom' || (side !== 'top' && align === 'start')) {
            index += 1;
          } else {
            index -= 1;
          }

          targetItem = items[index];

          if (!targetItem) {
            return;
          }
        }

        if (
          targetItem.getAttribute('role') === 'group' &&
          targetItem.children
        ) {
          const targetItemChildren = Array.from(targetItem.children);

          targetItem =
            side === 'bottom' || (side !== 'top' && align === 'start')
              ? targetItemChildren[0]
              : targetItemChildren[targetItemChildren.length - 1];

          if (targetItem.hasAttribute('data-content-wrapper')) {
            targetItem =
              side === 'bottom' || (side !== 'top' && align === 'start')
                ? targetItemChildren[1]
                : targetItemChildren[targetItemChildren.length - 2];
          }
        }

        return targetItem.hasAttribute('data-item') ? targetItem : null;
      };

      let itemObserver: MutationObserver | null = null;
      let themeObserver: MutationObserver | null = null;

      const handleUpdate = () => {
        const targetItem = resolveTargetItem();

        if (!targetItem) {
          return;
        }

        updateColor(targetItem);

        if (itemObserver) {
          itemObserver.disconnect();
        }

        itemObserver = new MutationObserver(() => updateColor(targetItem));

        itemObserver.observe(targetItem, {
          attributes: true,
          attributeFilter: ['style', 'class', 'data-highlighted', 'data-state'],
        });

        const root = document.documentElement;

        themeObserver = new MutationObserver(() => updateColor(targetItem));

        themeObserver.observe(root, {
          attributes: true,
          attributeFilter: ['data-crm-ui-kit-theme'],
        });
      };

      handleUpdate();

      const content = contentRef.current!;
      const sideAlignObserver = new MutationObserver(handleUpdate);

      if (content) {
        sideAlignObserver.observe(content, {
          attributes: true,
          attributeFilter: ['data-side', 'data-align'],
        });
      }

      return () => {
        itemObserver?.disconnect();
        themeObserver?.disconnect();
        sideAlignObserver.disconnect();
      };
    });

    return () => cancelAnimationFrame(raf);
  }, [open]);

  return inheritedArrowColor;
};
