import React, { ReactElement } from 'react';
import { Checkbox, Table as MantineTable } from '@mantine/core';
import { TableRowCell } from './TableRowCell';

type TableRowProps<T> = {
  item: T;
  toggleRow: (id: number) => void;
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T;
    render?: (item: T) => ReactElement | void;
  }[];
  renderColumns: string[];
  selection: number[];
  id: number;
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
      <MantineTable.Tr onClick={() => toggleRow(id)} style={{ cursor: 'pointer' }}>
        <MantineTable.Td>
          <Checkbox checked={selection.includes(id)} onChange={() => toggleRow(id)} />
        </MantineTable.Td>
        {columns.map(
          (column) =>
            renderColumns.includes(column.name) && (
              <TableRowCell<T> key={column.uid as React.Key} column={column} item={item} />
            )
        )}
      </MantineTable.Tr>
    </>
  );
}
