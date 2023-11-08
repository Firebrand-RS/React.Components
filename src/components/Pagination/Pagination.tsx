import classes from './Pagination.module.scss';

import React, { AllHTMLAttributes } from 'react';
import { Button } from '../Button/Button';

interface PaginationProps {
  currentPage: number;
  pageCount: number | null;
  buttonPairCount: number;
  Controls: React.ReactElement<React.DOMAttributes<HTMLButtonElement>>;
  gap?: number;
  onNavigate: (value: string) => void;
}

export function Pagination(props: PaginationProps) {
  function generatePageNumbers(): number[] {
    const { currentPage, buttonPairCount } = props;
    let { pageCount } = props;
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

  function handleNavigate(evt: React.MouseEvent<HTMLButtonElement>) {
    const { target } = evt;
    const isButton = target instanceof HTMLButtonElement;
    if (!isButton) {
      return;
    }
    const textValue = target.textContent;
    if (!textValue) {
      return;
    }
    props.onNavigate(textValue);
  }

  function handlePrev(): void {
    const newPageNumber = props.currentPage - 1;
    props.onNavigate(newPageNumber.toString());
  }

  function handleNext(): void {
    const newPageNumber = props.currentPage + 1;
    props.onNavigate(newPageNumber.toString());
  }

  function generateButtons(): React.ReactNode {
    const { Controls, currentPage } = props;
    const pageNumbers = generatePageNumbers();
    return pageNumbers.map((number, index) => {
      const Cloned = React.cloneElement<AllHTMLAttributes<HTMLButtonElement>>(
        Controls,
        {
          children: number,
          key: index,
          onClick: handleNavigate,
          disabled: currentPage === number,
        }
      );
      return Cloned;
    });
  }

  const { gap, currentPage, pageCount } = props;
  const buttons = generateButtons();
  return (
    <div className={classes.pagination} style={gap ? { gap } : {}}>
      <Button onClick={handlePrev} disabled={currentPage <= 1}>
        {'<'}
      </Button>
      {buttons}
      <Button
        onClick={handleNext}
        disabled={pageCount !== null && currentPage >= pageCount}
      >
        {'>'}
      </Button>
    </div>
  );
}
