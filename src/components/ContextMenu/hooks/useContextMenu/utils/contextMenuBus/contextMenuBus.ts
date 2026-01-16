import {
  ContextMenuBusCallback,
  ContextMenuBusPayload,
} from './contextMenuBus.types';

/**
 * Pub/Sub bus for context menu communication.
 *
 * Enables communication between multiple context menu instances.
 * Required when the browser loses focus, as Radix's focus-based
 * implementation stops working in this scenario.
 */
let listeners: ContextMenuBusCallback[] = [];
let isAimingRef: React.MutableRefObject<boolean> | null = null;
let activeMenuId: string | null = null;

/**
 * Emits a payload to the context menu bus.
 */
const emit = (payload: ContextMenuBusPayload) => {
  listeners.forEach((cb) => cb(payload));

  isAimingRef = payload.isAimingRef;
  activeMenuId = payload.id;
};

/**
 * Subscribes to the context menu bus.
 */
const subscribe = (cb: ContextMenuBusCallback) => {
  listeners.push(cb);

  return () => {
    listeners = listeners.filter((fn) => fn !== cb);
  };
};

export const contextMenuBus = {
  emit,
  subscribe,
  get isAimingRef() {
    return isAimingRef;
  },
  get activeMenuId() {
    return activeMenuId;
  },
};
