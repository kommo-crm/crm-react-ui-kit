import { Appearance } from 'src/lib/appearance';
import { Platform } from 'src/lib/platform';

export interface TestOptions {
  /**
   * Target test platform
   */
  platform: Platform;
  /**
   * Interface appearance
   */
  appearance: Appearance;
  /**
   * Screen shot comparison settings
   */
  toMatchSnapshot: {
    /**
     * Difference threshold for comparing snapshots
     */
    threshold: number;
  };
  /**
   * Function for generating the name of the snapshot file
   */
  getSnapshotFileName: () => string;
  /**
   * Function for checking screenshot with content cropping
   */
  expectScreenshotClippedToContent: () => Promise<void>;
  /**
   * Function for focus elements with id=FOCUSABLE_ELEMENT_ID
   */
  setFocusOnElement: () => Promise<void>;
}

export interface TestHelpers {
  /**
   * Asynchronous function to get the name of the snapshot file
   */
  getSnapshotFileName: () => Promise<string>;
}
