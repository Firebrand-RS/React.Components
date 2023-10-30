import React, { ComponentProps } from 'react';
import classes from './PageWrapper.module.scss';

interface PageWrapperProps extends ComponentProps<'div'> {}

export class PageWrapper extends React.Component<PageWrapperProps> {
  render() {
    return <div {...this.props} className={classes.wrapper}></div>;
  }
}
