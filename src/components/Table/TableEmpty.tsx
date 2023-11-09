import React, { FC } from 'react';
import { TableTd, TableTr, Text } from '@mantine/core';

interface TableEmpty {
  length: number;
}

const TableEmpty: FC<TableEmpty> = ({ length }) => (
    <TableTr>
      <TableTd colSpan={length + 2}>
        <Text fw={500} ta="center">
          Nothing found
        </Text>
      </TableTd>
    </TableTr>
  );

export { TableEmpty };
