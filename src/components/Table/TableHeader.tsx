import React, { ReactElement } from 'react';
import cx from 'clsx';
import { Checkbox, Table as MantineTable } from '@mantine/core';
import classes from './Table.module.css';
import { TableHeaderCell } from './TableHeaderCell';

interface ThProps<T> {
  toggleAll: () => void;
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T;
    render?: (item: any) => ReactElement;
  }[];
  data: T[];
  scrolled: boolean;
  selection: number[];
  renderColumns: string[];
  sortBy: keyof T | null;
  reverseSortDirection: boolean;
  setSorting: (field: keyof T) => void;
}

function TableHeader<T>({
  toggleAll,
  data,
  columns,
  scrolled,
  selection,
  renderColumns,
  sortBy,
  reverseSortDirection,
  setSorting,
}: ThProps<T>) {
  return (
    <MantineTable.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
      <MantineTable.Tr key="head">
        <MantineTable.Td key="check">
          <Checkbox
            onChange={toggleAll}
            checked={selection.length === data.length}
            indeterminate={selection.length > 0 && selection.length !== data.length}
          />
        </MantineTable.Td>
        {columns.map(
          (item, index) =>
            renderColumns.includes(item.name) && (
              <TableHeaderCell
                key={index}
                isSortable={item.sortable}
                sortable={sortBy === item.uid}
                reversed={reverseSortDirection}
                onSort={() => setSorting(item.uid)}
              >
                {item.name}
              </TableHeaderCell>
            )
        )}
      </MantineTable.Tr>
    </MantineTable.Thead>
  );
}

export { TableHeader };
