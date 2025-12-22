export type Callback = ({
  id,
  isMovingTowardMenuRef,
}: {
  id: string;
  isMovingTowardMenuRef: React.MutableRefObject<boolean>;
}) => void;
