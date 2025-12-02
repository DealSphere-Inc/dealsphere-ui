import { Textarea as NextUITextarea, TextAreaProps as NextUITextareaProps } from '@nextui-org/react';
import { forwardRef } from 'react';

export interface TextareaProps extends NextUITextareaProps {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    variant = 'bordered',
    size = 'md',
    classNames,
    ...rest
  } = props;

  return (
    <NextUITextarea
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

Textarea.displayName = 'Textarea';
