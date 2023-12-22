import React, { ReactElement, useState } from 'react';
import { ActionIcon, Checkbox, TableTd, TableTr, rem } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { TableRowCell } from './TableRowCell';
import { TableRowExpansion } from './TableRowExpansion';

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
  expansion?: any;
  noSelector?: boolean;
  level?: number;
};

export function TableRow<T>({
  item,
  toggleRow,
  columns,
  renderColumns,
  selection,
  id,
  expansion,
  noSelector,
  level,
}: TableRowProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableTr>
        {!noSelector && (
          <TableTd>
            <Checkbox checked={selection.includes(id)} onChange={() => toggleRow(id)} />
          </TableTd>
        )}
        <TableTd w={50} pl={(level || 0) * 15}>
          {expansion ? (
            expansion?.content?.(item) && open ? (
              <ActionIcon variant="light" onClick={() => setOpen(!open)}>
                <IconChevronDown
                  style={{ width: rem(16), height: rem(16), lineHeight: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            ) : (
              <ActionIcon
                variant="light"
                onClick={() => setOpen(!open)}
                disabled={!expansion?.content?.(item)}
              >
                <IconChevronRight
                  style={{ width: rem(16), height: rem(16), lineHeight: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
            )
          ) : null}
        </TableTd>
        {columns.map(
          (column) =>
            renderColumns.includes(column.name) && (
              <TableRowCell<T> key={column.uid as React.Key} column={column} item={item} />
            )
        )}
      </TableTr>
      {expansion?.content?.(item) && (
        <TableRowExpansion<T>
          colSpan={columns.length + 1}
          open={open}
          content={expansion?.content}
          item={item}
          renderColumns={renderColumns}
        />
      )}
    </>
  );
}
