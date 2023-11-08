import './Loader.scss';

import React, { ComponentProps } from 'react';

interface LoaderProps extends ComponentProps<'div'> {}

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <div {...props} className={['lds-roller', className].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
