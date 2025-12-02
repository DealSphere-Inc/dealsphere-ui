import { Chip, ChipProps } from '@nextui-org/react';
import { ReactNode } from 'react';

export interface BadgeProps extends Omit<ChipProps, 'children'> {
  children: ReactNode;
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'dot';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({
  children,
  variant = 'flat',
  color = 'default',
  size = 'md',
  ...rest
}: BadgeProps) {
  return (
    <Chip
      variant={variant}
      color={color}
      size={size}
      {...rest}
    >
      {children}
    </Chip>
  );
}
