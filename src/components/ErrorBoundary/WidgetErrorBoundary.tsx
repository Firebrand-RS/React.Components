import React, { ReactNode } from 'react';
import classes from './WidgetErrorBoundary.module.scss';
import { Button } from '../Button/Button';

interface WidgetErrorBoundaryProps {
  children: ReactNode;
}

interface WidgetErrorBoundaryState {
  error: Error | null;
}

export class WidgetErrorBoundary extends React.Component<
  WidgetErrorBoundaryProps,
  WidgetErrorBoundaryState
> {
  constructor(props: WidgetErrorBoundaryProps) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  private handleReset() {
    this.setState({ error: null });
  }

  render() {
    const { children } = this.props;
    if (this.state.error) {
      return (
        <>
          <Button className={classes.resetbutton} onClick={this.handleReset}>
            Reset
          </Button>
          <div className={classes.container}>
            <p>Widget error</p>
            <p>{`${this.state.error}`}</p>
          </div>
        </>
      );
    }

    return children;
  }
}
