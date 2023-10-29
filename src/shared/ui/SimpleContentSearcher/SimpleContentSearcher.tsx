import React from 'react';
import { SubmittableSearch } from '../SubmittableSearch/SubmittableSearch';

interface SimpleContentSearcherProps {
  placeholder: string;
  onSearch: (value?: string) => void;
  withWebStorage?: WebStorageOptions;
}

interface WebStorageOptions {
  key: string;
}

interface SimpleContentSearcherState {
  searchText: string;
}

export class SimpleContentSearcher extends React.Component<
  SimpleContentSearcherProps,
  SimpleContentSearcherState
> {
  private searchInput: React.RefObject<SubmittableSearch>;

  constructor(props: SimpleContentSearcherProps) {
    super(props);
    this.searchInput = React.createRef<SubmittableSearch>();
    this.setValueToWebStorage = this.setValueToWebStorage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(): void {
    const { withWebStorage } = this.props;
    if (withWebStorage) {
      this.loadContentBySavedQuery(withWebStorage);
    } else {
      this.loadAllContent();
    }
  }

  private loadContentBySavedQuery(withWebStorage: WebStorageOptions) {
    const storageValue = this.getValueFromWebStorage(withWebStorage);

    const { current } = this.searchInput;
    if (!current) {
      return;
    }
    current.setValue(storageValue);
  }

  private loadAllContent() {
    this.props.onSearch();
  }

  private handleSearch(value: string): void {
    const { withWebStorage } = this.props;
    if (withWebStorage) {
      this.setValueToWebStorage(withWebStorage, value);
    }
    this.props.onSearch(value);
  }

  private getValueFromWebStorage(options: WebStorageOptions): string {
    const storageValue = localStorage.getItem(options.key);
    if (!storageValue) {
      return '';
    }
    return storageValue;
  }

  private setValueToWebStorage(
    options: WebStorageOptions,
    value: string
  ): void {
    localStorage.setItem(options.key, value);
  }

  render() {
    const { placeholder } = this.props;

    return (
      <>
        <SubmittableSearch
          placeholder={placeholder}
          onSearch={this.handleSearch}
          ref={this.searchInput}
        />
      </>
    );
  }
}
