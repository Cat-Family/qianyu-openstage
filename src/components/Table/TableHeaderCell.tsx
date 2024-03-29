import React, { FC } from 'react';
import { Center, Group, TableTh, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import classes from './Table.module.css';

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  width?: string | number;
  sortable: boolean;
  onSort?(): void;
  isSortable?: boolean;
}

const TableHeaderCell: FC<ThProps> = ({
  children,
  reversed,
  sortable,
  onSort,
  isSortable,
  width,
}) => {
  const Icon = sortable ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <TableTh w={width}>
      {isSortable ? (
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group justify="space-between" wrap="nowrap">
            <Text fw={500} fz="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      ) : (
        <Text fw={500} fz="sm">
          {children}
        </Text>
      )}
    </TableTh>
  );
};

export { TableHeaderCell };
