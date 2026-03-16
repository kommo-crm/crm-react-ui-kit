import React from 'react';
import { render, screen } from '@testing-library/react';

import { type LinkProps, Link, LinkPrimaryTheme } from '..';

import '@testing-library/jest-dom';

const renderLink = (props: Partial<LinkProps>) => {
  return render(
    <Link role="link" theme={LinkPrimaryTheme} {...props}>
      Go to Dashboard
    </Link>
  );
};

describe('Link', () => {
  it('should be defined', () => {
    expect(Link).toBeDefined();
  });

  it('should renders as an anchor element', async () => {
    renderLink({});

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should renders children correctly', () => {
    renderLink({});

    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
  });

  it('should apply custom anchor properties', async () => {
    const className = 'my-class';

    renderLink({ className });

    const element = screen.getByRole('link');

    expect(element).toHaveClass(className);
    /**
     * 1. Module className
     * 2. Theme className
     * 3. Additional class `my-class`
     */
    expect(element.classList).toHaveLength(3);
  });
});
