import React, { ReactElement } from 'react';
import { StyleProp, TableTd, Text } from '@mantine/core';

type TableRowCellProps<T> = {
  item: T;
  column: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T;
    w?: StyleProp<React.CSSProperties['width']> | undefined;
    render?: (item: T) => ReactElement | void;
  };
};

function TableRowCell<T>({ column, item }: TableRowCellProps<T>) {
  return (
    <TableTd w={column.w}>{column.render?.(item) ?? (item[column.uid] as ReactElement)}</TableTd>
  );
}

export { TableRowCell };
