import React from 'react';
import classes from './Pagination.module.scss';
import { Button } from '../Button/Button';

interface PaginationProps {
  currentPage: number;
  pageCount: number | null | undefined;
  buttonPairCount: number;
  Controls: React.ReactElement<React.DOMAttributes<HTMLButtonElement>>;
  gap?: number;
  onNavigate: (value: string) => void;
}

export class Pagination extends React.Component<PaginationProps> {
  constructor(props: PaginationProps) {
    super(props);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      currentPage: this.props.currentPage,
    };
  }

  private generatePageNumbers(): number[] {
    const { currentPage, buttonPairCount } = this.props;
    let { pageCount } = this.props;
    if (!pageCount || pageCount < 0) {
      pageCount = 0;
    }

    const buttonNumbers = [currentPage];
    let addPrevNumber = true;
    let numbersLeft = buttonPairCount * 2;
    let index = 10;
    while (numbersLeft !== 0 && index !== 0) {
      addPrevNumber ? addNumber('next') : addNumber('prev');
      addPrevNumber = !addPrevNumber;
      index--;
    }

    function addNumber(key: 'next' | 'prev'): void {
      const largerNumber = buttonNumbers[buttonNumbers.length - 1];
      if (key === 'next' && largerNumber < pageCount!) {
        buttonNumbers.push(largerNumber + 1);
        --numbersLeft;
      }

      const loweNumber = buttonNumbers[0];
      if (key === 'prev' && loweNumber > 1) {
        buttonNumbers.unshift(loweNumber - 1);
        --numbersLeft;
      }
    }

    return buttonNumbers;
  }

  private generateButtons(): React.ReactNode {
    const { Controls } = this.props;
    const pageNumbers = this.generatePageNumbers();
    return pageNumbers.map((number, index) => {
      const Cloned = React.cloneElement(Controls, {
        children: number,
        key: index,
        onClick: this.handleNavigate,
      });
      return Cloned;
    });
  }

  private handleNavigate(evt: React.MouseEvent<HTMLButtonElement>) {
    const { target } = evt;
    const isButton = target instanceof HTMLButtonElement;
    if (!isButton) {
      return;
    }
    const textValue = target.textContent;
    if (!textValue) {
      return;
    }
    this.props.onNavigate(textValue);
  }

  private handlePrev() {
    const newPageNumber = this.props.currentPage - 1;
    this.props.onNavigate(newPageNumber.toString());
  }

  private handleNext() {
    const newPageNumber = this.props.currentPage + 1;
    this.props.onNavigate(newPageNumber.toString());
  }

  render() {
    const { gap } = this.props;
    const buttons = this.generateButtons();
    return (
      <div className={classes.pagination} style={gap ? { gap } : {}}>
        <Button onClick={this.handlePrev}>{'<'}</Button>
        {buttons}
        <Button onClick={this.handleNext}>{'>'}</Button>
      </div>
    );
  }
}
