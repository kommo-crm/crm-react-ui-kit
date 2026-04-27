import { Appearance } from '@/lib/appearance';

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
