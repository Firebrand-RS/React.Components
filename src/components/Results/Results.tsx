import React, { Children, ComponentProps, ReactNode } from 'react';
import classes from './Results.module.scss';
import { Button } from '../Button/Button';
import { Pagination } from '../Pagination/Pagination';

const PAGINATION_BUTTON_PAIR_COUNT = 2;
const PAGINATION_BUTTON_GAP = 8;
const NO_RESULTS_MESSAGE = `Sorry, we couldn't find any results`;

interface ResultsProps extends ComponentProps<'div'> {
  page: number;
  totalPages: number | null;
  onNavigate: (value: string) => void;
  children: ReactNode;
}

function Results({
  page,
  totalPages,
  onNavigate,
  children,
  className,
}: ResultsProps) {
  const hasResults = Children.count(children) > 0;

  return (
    <div className={[classes.resultswrapper, className].join(' ')}>
      {hasResults ? (
        <div className={classes.results}>{children}</div>
      ) : (
        <NoResults />
      )}
      <Pagination
        currentPage={page}
        pageCount={totalPages}
        buttonPairCount={PAGINATION_BUTTON_PAIR_COUNT}
        Controls={<Button />}
        onNavigate={onNavigate}
        gap={PAGINATION_BUTTON_GAP}
      />
    </div>
  );
}

function NoResults() {
  return <p className={classes.noresults}>{NO_RESULTS_MESSAGE}</p>;
}

export default Results;
