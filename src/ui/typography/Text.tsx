import { ReactNode } from 'react';

export interface TextProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'subtle' | 'success' | 'warning' | 'danger';
  className?: string;
  as?: 'p' | 'span' | 'div';
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorClasses = {
  default: 'text-[var(--app-text)]',
  primary: 'text-[var(--app-primary)]',
  secondary: 'text-[var(--app-secondary)]',
  muted: 'text-[var(--app-text-muted)]',
  subtle: 'text-[var(--app-text-subtle)]',
  success: 'text-[var(--app-success)]',
  warning: 'text-[var(--app-warning)]',
  danger: 'text-[var(--app-danger)]',
};

export function Text({
  children,
  size = 'base',
  weight = 'normal',
  color = 'default',
  as: Tag = 'p',
  className = '',
}: TextProps) {
  return (
    <Tag className={`${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${className}`}>
      {children}
    </Tag>
  );
}
