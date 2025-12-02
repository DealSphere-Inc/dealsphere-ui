import NextLink from 'next/link';
import { ReactNode } from 'react';

export interface LinkProps {
  children: ReactNode;
  href: string;
  color?: 'default' | 'primary' | 'secondary';
  external?: boolean;
  className?: string;
}

const colorClasses = {
  default: 'text-[var(--app-text)] hover:text-[var(--app-primary)]',
  primary: 'text-[var(--app-primary)] hover:text-[var(--app-primary-hover)]',
  secondary: 'text-[var(--app-secondary)] hover:text-[var(--app-secondary-hover)]',
};

export function Link({ children, href, color = 'primary', external = false, className = '' }: LinkProps) {
  const linkClass = `${colorClasses[color]} transition-colors underline-offset-4 hover:underline ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={linkClass}>
      {children}
    </NextLink>
  );
}
