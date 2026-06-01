import { Appearance } from '@ui-kit/lib/appearance';

export interface ConfigProviderProps {
  /**
   * Nested element
   */
  children: React.ReactNode;
  /**
   * Current application theme
   */
  appearance: Appearance;
}
