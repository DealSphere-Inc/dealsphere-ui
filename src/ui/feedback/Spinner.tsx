import { Spinner as NextUISpinner, SpinnerProps as NextUISpinnerProps } from '@nextui-org/react';

export interface SpinnerProps extends NextUISpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export function Spinner({ size = 'md', color = 'primary', ...rest }: SpinnerProps) {
  return <NextUISpinner size={size} color={color} {...rest} />;
}
