import React, { ReactNode } from 'react';
import classes from './Results.module.scss';
import { Button } from '../Button/Button';
import { Pagination } from '../Pagination/Pagination';

const PAGINATION_BUTTON_PAIR_COUNT = 2;
const PAGINATION_BUTTON_GAP = 8;

interface ResultsProps {
  page: number;
  totalPages: number | null;
  onNavigate: (value: string) => void;
  children: ReactNode;
}

function Results({ page, totalPages, onNavigate, children }: ResultsProps) {
  return (
    <>
      <div className={classes.content}>{children}</div>
      <Pagination
        currentPage={page}
        pageCount={totalPages}
        buttonPairCount={PAGINATION_BUTTON_PAIR_COUNT}
        Controls={<Button />}
        onNavigate={onNavigate}
        gap={PAGINATION_BUTTON_GAP}
      />
    </>
  );
}

export default Results;
