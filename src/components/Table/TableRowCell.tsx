import React, { ReactElement } from 'react';
import { TableTd, Text } from '@mantine/core';

type TableRowCellProps<T> = {
  item: T;
  column: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T;
    render?: (item: any) => ReactElement;
  };
};

function TableRowCell<T>({ column, item }: TableRowCellProps<T>) {
  return (
    <TableTd>
      {column.render ? (
        column.render(item[column.uid])
      ) : (
        <Text fw={400} fz="sm">
          {item[column.uid] as ReactElement}
        </Text>
      )}
    </TableTd>
  );
}

export { TableRowCell };
