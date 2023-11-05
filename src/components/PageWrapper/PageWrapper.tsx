import React, { ComponentProps } from 'react';
import classes from './PageWrapper.module.scss';

interface PageWrapperProps extends ComponentProps<'div'> {}

export function PageWrapper(props: PageWrapperProps) {
  return <div {...props} className={classes.wrapper}></div>;
}
