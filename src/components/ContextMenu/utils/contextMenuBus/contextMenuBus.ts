import { Callback } from './contextMenuBus.types';

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
