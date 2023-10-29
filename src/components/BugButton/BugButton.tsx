import React, { ComponentProps } from 'react';
import classes from './BugButton.module.scss';
import { Button } from '../Button/Button';

interface BugButtonProps extends ComponentProps<'button'> {}
interface BugButtonState {
  hasError: boolean;
}

export class BugButton extends React.Component<BugButtonProps, BugButtonState> {
  constructor(props: BugButtonProps) {
    super(props);
    this.handleThrowError = this.handleThrowError.bind(this);
    this.state = {
      hasError: false,
    };
  }

  private handleThrowError(): void {
    this.setState({
      hasError: true,
    });
  }

  componentDidUpdate(): void {
    if (this.state.hasError) {
      throw new Error('Bug button error');
    }
  }

  render() {
    return (
      <Button className={classes.bugbutton} onClick={this.handleThrowError}>
        Throw error
      </Button>
    );
  }
}
