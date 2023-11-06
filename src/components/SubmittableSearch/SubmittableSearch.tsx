import React, { SyntheticEvent } from 'react';
import classes from './SubmittableSearch.module.scss';
import { Button } from '../Button/Button';
import { useInput } from '../../hooks/useInput';

interface SubmittableSearchProps {
  placeholder: string;
  value: string;
  onSearch: (value: string) => void;
}

export function SubmittableSearch({
  value: valueProp,
  onSearch,
  placeholder,
}: SubmittableSearchProps) {
  const [value, onChange] = useInput(valueProp);

  function handleSubmit(evt: SyntheticEvent): void {
    evt.preventDefault();
    onSearch(value);
  }

  return (
    <form className={classes.search} onSubmit={handleSubmit}>
      <input
        className={classes.input}
        type="search"
        name="search-field"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
