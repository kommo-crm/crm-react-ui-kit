/**
 * Payload emitted when a context menu opens.
 * Used to coordinate between multiple menu instances.
 */
export type ContextMenuBusPayload = {
  /**
   * Unique identifier of the menu that emitted the event.
   */
  id: string;
  /**
   * Function that returns whether the cursor is moving toward the active menu.
   */
  isAiming: () => boolean;
};

/**
 * Callback function for context menu bus subscribers.
 */
export type ContextMenuBusCallback = (payload: ContextMenuBusPayload) => void;
