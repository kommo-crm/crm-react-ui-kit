import { Appearance } from 'src/lib/appearance';

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
