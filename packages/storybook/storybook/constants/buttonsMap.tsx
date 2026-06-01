import React from 'react';

import {
  Button,
  ButtonNeutralTheme,
  ButtonPrimaryTheme,
  ButtonSecondaryTheme,
} from 'src/components/Button';

export const ButtonsMap = {
  DefaultButton: <button type="button">Button</button>,
  PrimaryButton: <Button theme={ButtonPrimaryTheme}>Button</Button>,
  SecondaryButton: <Button theme={ButtonSecondaryTheme}>Button</Button>,
  NeutralButton: <Button theme={ButtonNeutralTheme}>Button</Button>,
};
