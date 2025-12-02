import { Switch as NextUISwitch, SwitchProps as NextUISwitchProps } from '@nextui-org/react';
import { forwardRef } from 'react';

export interface SwitchProps extends NextUISwitchProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const {
    size = 'md',
    color = 'primary',
    ...rest
  } = props;

  return (
    <NextUISwitch
      ref={ref}
      size={size}
      color={color}
      {...rest}
    />
  );
});

Switch.displayName = 'Switch';
