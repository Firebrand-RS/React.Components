import classes from './BugButton.module.scss';

import React, { ComponentProps, useState } from 'react';
import { Button } from '../Button/Button';

interface BugButtonProps extends ComponentProps<'button'> {}

export function BugButton({ className, ...props }: BugButtonProps) {
  const [hasError, setHasError] = useState(false);

  throwError();

  function handleThrowError(): void {
    setHasError(true);
  }

  function throwError(): void {
    if (hasError) {
      throw new Error('BugButton error');
    }
  }

  return (
    <Button
      {...props}
      className={[classes.bugbutton, className].join(' ')}
      onClick={handleThrowError}
    >
      Throw error
    </Button>
  );
}
