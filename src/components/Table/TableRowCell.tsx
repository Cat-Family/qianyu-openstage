import React, { ReactElement } from 'react';
import { Box, Flex, StyleProp, TableTd, Text } from '@mantine/core';

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
    <TableTd>
      <Flex style={{ overflow: 'hidden' }} wrap="nowrap" justify="flex-start" gap="xs" w={column.w}>
        {column.render?.(item) ?? (item[column.uid] as ReactElement)}
      </Flex>
    </TableTd>
  );
}

export { TableRowCell };
