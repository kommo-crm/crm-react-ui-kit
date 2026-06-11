import { type LabelProps } from '@ui-kit/components/Label';

export type LabelWrapperProps = Partial<LabelProps> & {
  Component?: React.FC<LabelProps>;
};
