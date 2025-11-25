import React from 'react';
import { render, screen } from '@testing-library/react';

import { Button, ButtonNeutralTheme } from 'src/components/Button';
import { Text, TextPrimaryTheme } from 'src/components/Text';

import { PopupPrimaryTheme } from '../components/Arrow';

import { type TooltipContextProps, Tooltip } from '..';

import { TooltipProps } from '../Tooltip.props';

import '@testing-library/jest-dom';

// const renderTooltip = (props: TooltipProps) => {
const renderTooltip = () => {
  return render(
    <Tooltip
    // {...props}
    >
      <Tooltip.Content>
        <Tooltip.Arrow theme={PopupPrimaryTheme}>
          <Text theme={TextPrimaryTheme} size="m">
            LOOOOOOOOOOOOOOOOOOOOOL
          </Text>
        </Tooltip.Arrow>

        <Tooltip.Trigger>
          <Button theme={ButtonNeutralTheme}>Hover me!</Button>
        </Tooltip.Trigger>
      </Tooltip.Content>
    </Tooltip>
  );
};

describe('Tooltip', () => {
  it('should be defined', () => {
    expect(Tooltip).toBeDefined();
  });

  // it('should renders as an anchor element', async () => {
  //   renderTooltip({});

  //   expect(screen.getByRole('link')).toBeInTheDocument();
  // });

  it('should renders trigger component correctly', () => {
    renderTooltip();

    expect(
      screen.getByRole('button', { name: /hover me/i })
    ).toBeInTheDocument();
  });

  // it('should apply custom anchor properties', async () => {
  //   const className = 'my-class';

  //   renderTooltip({ className });

  //   const element = screen.getByRole('link');

  //   expect(element).toHaveClass(className);
  //   /**
  //    * 1. Module className
  //    * 2. Theme className
  //    * 3. Additional class `my-class`
  //    */
  //   expect(element.classList).toHaveLength(3);
  // });
});
