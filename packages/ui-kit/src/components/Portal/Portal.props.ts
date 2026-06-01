import { HTMLAttributes } from 'react';

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom container where the content will be embedded.
   * By default, document.body.
   */
  container?: Element | DocumentFragment;
}
