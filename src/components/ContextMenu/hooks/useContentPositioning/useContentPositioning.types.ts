import { DirectionType } from '../../components/Content';

export interface UseContentPositioningOptions {
  /**
   * The direction of the content.
   */
  direction?: DirectionType;
  /**
   * The offset of the content.
   */
  alignOffset?: number;
  /**
   * Whether to disable auto positioning.
   */
  disableAutoPositioning: boolean;
  /**
   * The reference to the trigger element.
   */
  triggerRef: React.RefObject<HTMLElement>;
  /**
   * The reference to the content element.
   */
  contentRef: React.RefObject<HTMLElement>;
  /**
   * The boundary of the collision.
   */
  collisionBoundary?: Element | null;
  /**
   * The children of the content.
   */
  children: React.ReactNode;
  /**
   * Whether to disable repositioning.
   */
  disableRepositioning: boolean;
  /**
   * Whether the content is a SubContent.
   */
  isSubContent?: boolean;
}

export interface UseContentPositioningResult {
  /**
   * The alignment of the content.
   */
  align: 'start' | 'end';
  /**
   * The offset of the content.
   */
  offset: number;
  /**
   * Whether the content is positioned.
   */
  isPositioned: boolean;
}
