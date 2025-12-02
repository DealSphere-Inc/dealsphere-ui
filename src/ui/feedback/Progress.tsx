import { Progress as NextUIProgress, ProgressProps as NextUIProgressProps } from '@nextui-org/react';

export interface ProgressProps extends NextUIProgressProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export function Progress({ size = 'md', color = 'primary', ...rest }: ProgressProps) {
  return <NextUIProgress size={size} color={color} {...rest} />;
}
