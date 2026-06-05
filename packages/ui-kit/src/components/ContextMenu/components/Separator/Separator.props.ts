import { ComponentPropsWithoutRef } from 'react';

import { Separator } from '@ui-kit/components/Separator';

export type SeparatorProps = Omit<
  ComponentPropsWithoutRef<typeof Separator>,
  'theme'
>;
