import React from 'react';
import { Collapse, TableTd, TableTr } from '@mantine/core';
import { useRowExpansionStatus } from '../../hooks/useRowExpansionStatus';

type DataTableRowExpansionProps = {
  open: boolean;
  colSpan: number;
  content: () => React.ReactNode;
};

export function DataTableRowExpansion({ open, colSpan, content }: DataTableRowExpansionProps) {
  const { expanded, visible } = useRowExpansionStatus(open, 200);

  return visible ? (
    <>
      <TableTr />
      <TableTr>
        <TableTd className="mantine-table-row-expansion-cell" colSpan={colSpan}>
          <Collapse in={expanded}>
            <div className="mantine-table-row-expansion-cell-content">{content()}</div>
          </Collapse>
        </TableTd>
      </TableTr>
    </>
  ) : null;
}
