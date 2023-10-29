import React, { SyntheticEvent } from 'react';
import classes from './SubmittableSearch.module.scss';
import { Button } from '../Button/Button';

interface SubmittableSearchProps {
  placeholder: string;
  onSearch: (value: string) => void;
}
interface SubmittableSearchState {
  value: string;
}

export class SubmittableSearch extends React.Component<
  SubmittableSearchProps,
  SubmittableSearchState
> {
  constructor(props: SubmittableSearchProps) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    const { target } = evt;
    this.setState({ value: target.value });
  }

  handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    this.props.onSearch(this.state.value);
  }

  setValue(value: string) {
    this.setState({ value });
    this.props.onSearch(value);
  }

  render() {
    const { placeholder } = this.props;

    return (
      <form className={classes.search} onSubmit={this.handleSubmit}>
        <input
          className={classes.input}
          type="search"
          name="search-field"
          placeholder={placeholder}
          onChange={this.handleChange}
          value={this.state.value}
        />
        <Button type="submit">Search</Button>
      </form>
    );
  }
}
