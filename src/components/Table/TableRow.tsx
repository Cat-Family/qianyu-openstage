import React, { ReactElement } from 'react';
import { Checkbox, TableTd, TableTr } from '@mantine/core';
import { TableRowCell } from './TableRowCell';

type TableRowProps<T> = {
  item: T;
  toggleRow: (id: string) => void;
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T;
    render?: (item: T) => ReactElement | void;
  }[];
  renderColumns: string[];
  selection: string[];
  id: string;
};

export function TableRow<T>({
  item,
  toggleRow,
  columns,
  renderColumns,
  selection,
  id,
}: TableRowProps<T>) {
  return (
    <>
      <TableTr>
        <TableTd>
          <Checkbox checked={selection.includes(id)} onChange={() => toggleRow(id)} />
        </TableTd>
        {columns.map(
          (column) =>
            renderColumns.includes(column.name) && (
              <TableRowCell<T> key={column.uid as React.Key} column={column} item={item} />
            )
        )}
      </TableTr>
    </>
  );
}
