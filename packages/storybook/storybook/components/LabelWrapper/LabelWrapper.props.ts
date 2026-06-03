import { type LabelProps } from 'src/components/Label';

export type LabelWrapperProps = Partial<LabelProps> & {
  Component?: React.FC<LabelProps>;
};
