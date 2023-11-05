import React, { SyntheticEvent, useState } from 'react';
import classes from './SubmittableSearch.module.scss';
import { Button } from '../Button/Button';

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
  const [value, setValue] = useState(valueProp);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    const { target } = evt;
    setValue(target.value);
  }

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
        onChange={handleChange}
        value={value}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
