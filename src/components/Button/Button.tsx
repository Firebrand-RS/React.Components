import classes from './Button.module.scss';

import React, { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={[classes.button, className].join(' ')}
      type={type}
    ></button>
  );
}
