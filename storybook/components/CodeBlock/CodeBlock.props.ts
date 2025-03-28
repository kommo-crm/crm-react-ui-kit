import type { StoryObj } from '@storybook/react';
import { SupportedLanguage } from 'storybook/internal/components';

/**
 * Props for the CodeBlock component.
 *
 * Either `of` must be provided, or both `code` and `language` together.
 */
export type CodeBlockProps =
  | {
      /**
       * Component story (mutually exclusive with `code` and `language`).
       */
      of: StoryObj;
      /**
       * Code must not be provided when `of` is set.
       */
      code?: never;
      /**
       * Language must not be provided when `of` is set.
       */
      language?: never;
    }
  | {
      /**
       * Code in string format (required if `of` is not provided).
       */
      code: string;
      /**
       * The programming language of the code (required if `code` is provided).
       */
      language: SupportedLanguage;
      /**
       * Component story must not be provided when `code` and `language` are set.
       */
      of?: never;
    };
