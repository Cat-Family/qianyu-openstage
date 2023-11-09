import React, { ReactElement, useState } from 'react';
import {
  Button,
  Flex,
  Group,
  Input,
  MultiSelect,
  Select,
  SimpleGrid,
  UnstyledButton,
  em,
  rem,
} from '@mantine/core';
import { IconChevronDown, IconPlus, IconSearch, IconZoomReset } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import multiSelectClasses from './multiSelectClasses.module.css';

interface TableSearchProps<T> {
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T;
    render?: (item: any) => ReactElement | void;
  }[];
  renderColumns: string[];
  setRenderColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

function TableSearch<T>({ columns, renderColumns, setRenderColumns }: TableSearchProps<T>) {
  const isXs = useMediaQuery(`(max-width: ${'36em'})`);
  const isSm = useMediaQuery(`(max-width: ${'48em'})`);
  const isLg = useMediaQuery(`(max-width: ${'75em'})`);

  return (
    <>
      <SimpleGrid cols={{ xs: 1, sm: 2, lg: 4, xl: 4 }}>
        {columns
          .filter((item) => item.searchable)
          .map((column) => (
            <Input
              key={column.uid as React.Key}
              placeholder={`Search by ${column.name}`}
              leftSection={<IconSearch size={16} />}
            />
          ))}
        <MultiSelect
          classNames={multiSelectClasses}
          checkIconPosition="right"
          data={columns.map((item) => item.name)}
          placeholder="Columns"
          defaultValue={renderColumns}
          onChange={setRenderColumns}
        />
        <Group style={{ alignSelf: 'end', justifySelf: 'end' }}>
          <Button variant="outline">Reset</Button>
          <Button>Search</Button>
          <UnstyledButton>
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </UnstyledButton>
        </Group>
      </SimpleGrid>
    </>
  );
}

export { TableSearch };
