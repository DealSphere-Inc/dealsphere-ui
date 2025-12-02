import { Input as NextUIInput, InputProps as NextUIInputProps } from '@nextui-org/react';
import { forwardRef } from 'react';

export interface InputProps extends NextUIInputProps {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    variant = 'bordered',
    size = 'md',
    classNames,
    ...rest
  } = props;

  return (
    <NextUIInput
      ref={ref}
      variant={variant}
      size={size}
      classNames={{
        inputWrapper: 'bg-[var(--app-surface-hover)] border border-[var(--app-border-subtle)]',
        ...classNames,
      }}
      {...rest}
    />
  );
});

Input.displayName = 'Input';
