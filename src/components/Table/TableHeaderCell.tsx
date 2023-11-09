import React, { FC } from 'react';
import { Center, Group, Table as MantineTable, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import classes from './Table.module.css';

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sortable: boolean;
  onSort?(): void;
  isSortable?: boolean;
}

const TableHeaderCell: FC<ThProps> = ({ children, reversed, sortable, onSort, isSortable }) => {
  const Icon = sortable ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <MantineTable.Th>
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
    </MantineTable.Th>
  );
};

export { TableHeaderCell };