import { ComponentPropsWithoutRef } from 'react';

import { Separator } from 'src/components/Separator';

export type SeparatorProps = Omit<
  ComponentPropsWithoutRef<typeof Separator>,
  'theme'
>;
