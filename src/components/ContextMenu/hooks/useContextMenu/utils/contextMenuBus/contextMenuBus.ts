import {
  ContextMenuBusCallback,
  ContextMenuBusPayload,
  ContextMenuBusAimingChangeCallback,
} from './contextMenuBus.types';

/**
 * Pub/Sub bus for context menu communication.
 *
 * Enables communication between multiple context menu instances.
 * Required when the browser loses focus, as Radix's focus-based
 * implementation stops working in this scenario.
 */
let listeners: ContextMenuBusCallback[] = [];
let aimingChangeListeners: ContextMenuBusAimingChangeCallback[] = [];
let isAiming: (() => boolean) | null = null;
let activeMenuId: string | null = null;

/**
 * Emits a payload to the context menu bus.
 */
const emit = (payload: ContextMenuBusPayload): void => {
  listeners.forEach((cb) => cb(payload));

  isAiming = payload.isAiming;
  activeMenuId = payload.id;
};

/**
 * Notifies all aiming change subscribers.
 */
const emitAimingChange = (aiming: boolean): void => {
  aimingChangeListeners.forEach((cb) => cb(aiming));
};

/**
 * Subscribes to the context menu bus.
 */
const subscribe = (cb: ContextMenuBusCallback): (() => void) => {
  listeners.push(cb);

  return () => {
    listeners = listeners.filter((fn) => fn !== cb);
  };
};

/**
 * Subscribes to aiming state changes.
 */
const subscribeAimingChange = (
  cb: ContextMenuBusAimingChangeCallback
): (() => void) => {
  aimingChangeListeners.push(cb);

  return () => {
    aimingChangeListeners = aimingChangeListeners.filter((fn) => fn !== cb);
  };
};

export const contextMenuBus = {
  emit,
  emitAimingChange,
  subscribe,
  subscribeAimingChange,
  get isAiming() {
    return isAiming;
  },
  get activeMenuId() {
    return activeMenuId;
  },
};
