import { Skeleton as NextUISkeleton, SkeletonProps as NextUISkeletonProps } from '@nextui-org/react';

export interface SkeletonProps extends NextUISkeletonProps {
  className?: string;
}

export function Skeleton({ className = '', ...rest }: SkeletonProps) {
  return (
    <NextUISkeleton
      className={`rounded-lg bg-[var(--app-surface-hover)] ${className}`}
      {...rest}
    />
  );
}
