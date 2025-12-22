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
  public isMovingTowardActiveMenuRef: React.MutableRefObject<boolean> | null =
    null;
  public activeMenuId: string | null = null;

  emit({
    id,
    isMovingTowardMenuRef,
  }: {
    id: string;
    isMovingTowardMenuRef: React.MutableRefObject<boolean>;
  }) {
    this.listeners.forEach((cb) => cb({ id, isMovingTowardMenuRef }));

    this.isMovingTowardActiveMenuRef = isMovingTowardMenuRef;
    this.activeMenuId = id;
  }

  subscribe(cb: Callback) {
    this.listeners.push(cb);

    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== cb);
    };
  }
}

export const contextMenuBus = new ContextMenuBus();
