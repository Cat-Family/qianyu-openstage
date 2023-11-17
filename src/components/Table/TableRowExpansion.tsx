import React from 'react';
import { Collapse, TableTd, TableTr } from '@mantine/core';
import { useRowExpansionStatus } from '../../hooks/useRowExpansionStatus';
import classes from './Table.module.css';

type TableRowExpansionProps<T> = {
  open: boolean;
  colSpan: number;
  content?: any;
  item: T;
};

export function TableRowExpansion<T>({ open, colSpan, content, item }: TableRowExpansionProps<T>) {
  const { expanded, visible } = useRowExpansionStatus(open, 200);

  return visible ? (
    <>
      <TableTr />
      <TableTr className={classes.expansion}>
        <TableTd colSpan={colSpan}>
          <Collapse in={expanded}>{content?.(item)}</Collapse>
        </TableTd>
      </TableTr>
    </>
  ) : null;
}
