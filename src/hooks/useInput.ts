import { useState } from 'react';

type UseInput = (
  initialValue: string
) => [string, (evt: React.ChangeEvent<HTMLInputElement>) => void];

export const useInput: UseInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function onChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    const { target } = evt;
    setValue(target.value);
  }

  return [value, onChange];
};
