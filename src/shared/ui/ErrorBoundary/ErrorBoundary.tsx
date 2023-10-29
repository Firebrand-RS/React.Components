import React, { ReactNode } from 'react';
import classes from './ErrorBoundary.module.scss';
import { Button } from '../Button/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  outError: Error | null;
  resetError: () => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  private handleReset() {
    this.setState({ error: null });
    this.props.resetError();
  }

  render() {
    const { children } = this.props;
    if (this.state.error || this.props.outError) {
      return (
        <>
          {
            <Button className={classes.resetbutton} onClick={this.handleReset}>
              Reset
            </Button>
          }
          {React.Children.map(children, (child, i) => {
            if (i !== 1) return;
            return child;
          })}
          <div className={classes.container}>
            <p>Something went wrong</p>
            <p>{`${this.state.error ?? this.props.outError}`}</p>
          </div>
        </>
      );
    }

    return children;
  }
}
