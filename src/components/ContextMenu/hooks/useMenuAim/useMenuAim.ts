import { useEffect, useRef, useCallback } from 'react';

import {
  MenuAimDirection,
  Point,
  UseMenuAimOptions,
  UseMenuAimResult,
} from './useMenuAim.types';

const DEFAULT_SWITCH_DELAY = 200;
const DEFAULT_TOLERANCE = 40;
const RECALC_DELAY = 100;

/**
 * Checks whether a point `p` lies inside the triangle formed by points a, b, c.
 * Used to determine whether the cursor is moving within the "menu intent" area.
 */
const pointInTriangle = (p: Point, a: Point, b: Point, c: Point) => {
  const sign = (p1: Point, p2: Point, p3: Point) =>
    (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);

  const d1 = sign(p, a, b);
  const d2 = sign(p, b, c);
  const d3 = sign(p, c, a);

  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;

  return !(hasNeg && hasPos);
};

/**
 * Returns a unit direction vector that represents
 * the direction in which the submenu is opened.
 */
const getMenuDirectionVector = (
  direction: UseMenuAimOptions['direction']
): Point => {
  switch (direction) {
    case MenuAimDirection.LEFT:
      return { x: -1, y: 0 };
    case MenuAimDirection.RIGHT:
      return { x: 1, y: 0 };
    case MenuAimDirection.TOP:
      return { x: 0, y: -1 };
    case MenuAimDirection.BOTTOM:
      return { x: 0, y: 1 };
  }
};

/**
 * Determines whether the cursor is moving toward the menu
 * by projecting the cursor movement onto the menu direction vector.
 */
const isAiming = (prev: Point, current: Point, dir: Point) => {
  const dx = current.x - prev.x;
  const dy = current.y - prev.y;

  return dx * dir.x + dy * dir.y > 0;
};

/**
 * Returns two points that form the "active edge" of the submenu.
 * This edge is expanded by `tolerance` to make the interaction less strict.
 */
const getContentEdge = (
  el: HTMLElement,
  direction: UseMenuAimOptions['direction'],
  tolerance: number
): [Point, Point] => {
  const r = el.getBoundingClientRect();
  const scrollX = window.pageXOffset;
  const scrollY = window.pageYOffset;

  switch (direction) {
    case MenuAimDirection.RIGHT:
      return [
        { x: r.left + scrollX, y: r.top - tolerance + scrollY },
        { x: r.left + scrollX, y: r.bottom + tolerance + scrollY },
      ];
    case MenuAimDirection.LEFT:
      return [
        { x: r.right + scrollX, y: r.top - tolerance + scrollY },
        { x: r.right + scrollX, y: r.bottom + tolerance + scrollY },
      ];
    case MenuAimDirection.BOTTOM:
      return [
        { x: r.left - tolerance + scrollX, y: r.top + scrollY },
        { x: r.right + tolerance + scrollX, y: r.top + scrollY },
      ];
    case MenuAimDirection.TOP:
      return [
        { x: r.left - tolerance + scrollX, y: r.bottom + scrollY },
        { x: r.right + tolerance + scrollX, y: r.bottom + scrollY },
      ];
  }
};

/**
 * Hook that tracks whether the cursor is moving toward a menu/submenu
 * using geometric calculations based on the "menu aim" algorithm.
 *
 * This implementation prevents menus from closing prematurely when the user
 * is navigating toward a submenu by tracking cursor movement within an
 * "intent triangle" formed between the previous cursor position and the
 * menu's active edge.
 *
 * The algorithm works by:
 * 1. Tracking cursor positions as the mouse moves
 * 2. Creating an intent triangle from the previous cursor position to the menu edge
 * 3. Checking if the current cursor position is within this triangle
 * 4. Verifying that the cursor is moving in the direction of the menu
 * 5. Updating a ref with the result to avoid unnecessary re-renders
 *
 * This improves UX by allowing smooth navigation between parent menus and
 * submenus without accidental closures, similar to Amazon's mega dropdown
 * implementation.
 *
 * @link https://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown
 */
export const useMenuAim = <T extends HTMLElement = HTMLElement>({
  direction,
  tolerance = DEFAULT_TOLERANCE,
  switchDelay = DEFAULT_SWITCH_DELAY,
  enabled = true,
  externalAimingRef,
}: UseMenuAimOptions): UseMenuAimResult<T> => {
  const contentRef = useRef<T>(null);

  /**
   * Stores whether the cursor is currently moving toward the submenu.
   * Exposed as a ref to avoid unnecessary re-renders.
   * Use external ref if provided, otherwise create a new one.
   */
  const internalAimingRef = useRef(false);
  const isAimingRef =
    (externalAimingRef as React.MutableRefObject<boolean>) || internalAimingRef;

  const lastCursorRef = useRef<Point | null>(null);
  const prevCursorRef = useRef<Point | null>(null);

  /**
   * Timeout used to re-run calculations after mouse movement
   */
  const timeoutRef = useRef<number | null>(null);

  /**
   * Recalculates whether the cursor is moving toward the submenu.
   */
  const recalc = useCallback(() => {
    const cursor = lastCursorRef.current;
    const prev = prevCursorRef.current;
    const el = contentRef.current;

    if (!cursor || !prev || !el) {
      isAimingRef.current = false;

      return;
    }

    const [edgeA, edgeB] = getContentEdge(el, direction, tolerance);

    /**
     * Check if the cursor is inside the intent triangle
     */
    const inTriangle = pointInTriangle(cursor, prev, edgeA, edgeB);

    if (!inTriangle) {
      isAimingRef.current = false;

      return;
    }

    const dirVector = getMenuDirectionVector(direction);
    const movingToward = isAiming(prev, cursor, dirVector);

    isAimingRef.current = movingToward;
  }, [contentRef, direction, tolerance]);

  useEffect(() => {
    if (!enabled) {
      isAimingRef.current = false;

      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      prevCursorRef.current = lastCursorRef.current;
      lastCursorRef.current = { x: e.pageX, y: e.pageY };

      /**
       * Immediate recalculation on mouse move
       */
      recalc();

      /**
       * The timeout is intentionally used for stability:
       * if the mouse suddenly stops moving, we still perform
       * one final recalculation after a short delay.
       *
       * This helps avoid stale "moving toward menu" state
       * when the cursor stops inside the intent triangle.
       */
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(recalc, RECALC_DELAY);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, recalc]);

  /**
   * Resets internal state (useful when menu is closed).
   */
  const reset = useCallback(() => {
    isAimingRef.current = false;
    lastCursorRef.current = null;
    prevCursorRef.current = null;
  }, []);

  return {
    isAimingRef,
    reset,
    switchDelay,
    contentRef,
  };
};
