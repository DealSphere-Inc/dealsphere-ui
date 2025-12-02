import { Checkbox as NextUICheckbox, CheckboxProps as NextUICheckboxProps } from '@nextui-org/react';
import { forwardRef } from 'react';

export interface CheckboxProps extends NextUICheckboxProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    size = 'md',
    color = 'primary',
    ...rest
  } = props;

  return (
    <NextUICheckbox
      ref={ref}
      size={size}
      color={color}
      {...rest}
    />
  );
});

Checkbox.displayName = 'Checkbox';
