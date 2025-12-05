import { Callback } from './contextMenuBus.types';

/**
 * The bus for the context menu.
 *
 * It is necessary to communicate between the context menus.
 * It is necessary for the case when the browser is not focused.
 * Since in this case, the implementation of the Radix on the focuses stops working.
 */
class ContextMenuBus {
  private listeners: Callback[] = [];

  emit(openedId: string) {
    this.listeners.forEach((cb) => cb(openedId));
  }

  subscribe(cb: Callback) {
    this.listeners.push(cb);

    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== cb);
    };
  }
}

export const contextMenuBus = new ContextMenuBus();
