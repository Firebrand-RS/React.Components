import React, { ComponentProps } from 'react';
import './Loader.scss';

interface LoaderProps extends ComponentProps<'div'> {}

export class Loader extends React.Component<LoaderProps> {
  render() {
    return (
      <div className="lds-roller">
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
}
