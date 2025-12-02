import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

function Example() {
  return <div>Hello World</div>;
}

describe('Example', () => {
  it('should render', () => {
    render(<Example />);
    expect(screen.getByText('Hello World')).toBeDefined();
  });
});
