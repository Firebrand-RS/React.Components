import React, { ComponentProps } from 'react';
import classes from './Button.module.scss';

interface ButtonProps extends ComponentProps<'button'> {}

export class Button extends React.Component<ButtonProps> {
  render() {
    const { type = 'button', ...props } = this.props;

    return (
      <button
        {...props}
        className={[classes.button, props.className].join(' ')}
        type={type}
      >
        {this.props.children}
      </button>
    );
  }
}
