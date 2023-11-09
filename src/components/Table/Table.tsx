import React, { ReactElement, useState } from 'react';
import {
  Table as MantineTable,
  ScrollArea,
  Group,
  Text,
  Pagination,
  Flex,
  Button,
  Menu,
  MenuTarget,
  MenuDropdown,
  MenuItem,
  Stack,
} from '@mantine/core';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import scrollClasses from './Scroll.module.css';
import { TableEmpty } from './TableEmpty';
import { TableSearch } from './TableSearch';

interface TableProps<T> {
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T;
    render?: (item: any) => ReactElement | void;
  }[];
  data: T[];
}

function Table<T extends { id: number }>({ columns, data }: TableProps<T>) {
  const [sortedData, setSortedData] = useState(data);
  const [renderColumns, setRenderColumns] = useState(
    columns.filter((item) => item.defaultShow).map((item) => item.name)
  );
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selection, setSelection] = useState<number[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const setSorting = (field: keyof T) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  return (
    <Stack gap="sm">
      <TableSearch
        columns={columns}
        renderColumns={renderColumns}
        setRenderColumns={setRenderColumns}
      />
      <Flex justify="space-between" align="center" w="100%">
        <Text size="xs">Total {data.length} users</Text>
        <Flex h="1rem" justify="center" align="center" gap="md">
          {selection.length > 0 && (
            <Button ta="center" color="red" size="xs">
              Delete select data
            </Button>
          )}
          <Text ta="center" size="xs">
            {data.length} of {selection.length} selected
          </Text>
        </Flex>
      </Flex>
      <ScrollArea
        offsetScrollbars
        classNames={scrollClasses}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <MantineTable highlightOnHover withRowBorders>
          <TableHeader<T>
            data={data}
            columns={columns}
            toggleAll={toggleAll}
            scrolled={scrolled}
            selection={selection}
            renderColumns={renderColumns}
            sortBy={sortBy}
            reverseSortDirection={reverseSortDirection}
            setSorting={setSorting}
          />
          <MantineTable.Tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <TableRow<T>
                  key={item.id}
                  id={item.id}
                  item={item}
                  toggleRow={toggleRow}
                  columns={columns}
                  renderColumns={renderColumns}
                  selection={selection}
                />
              ))
            ) : (
              <TableEmpty length={renderColumns.length} />
            )}
          </MantineTable.Tbody>
        </MantineTable>
      </ScrollArea>

      <Flex w="100%" align="center" pt="md" justify="space-between">
        <Pagination.Root total={10} size="sm" radius="md" siblings={0}>
          <Group wrap="nowrap" gap="xs">
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
          </Group>
        </Pagination.Root>

        <Menu shadow="md" width={100}>
          <MenuTarget>
            <Text size="xs" style={{ cursor: 'pointer' }}>
              Row per page: 5
            </Text>
          </MenuTarget>
          <MenuDropdown>
            <MenuItem>
              <Text>5</Text>
            </MenuItem>
            <MenuItem>
              <Text>10</Text>
            </MenuItem>
            <MenuItem>
              <Text>15</Text>
            </MenuItem>
            <MenuItem>
              <Text>20</Text>
            </MenuItem>
          </MenuDropdown>
        </Menu>
      </Flex>
    </Stack>
  );
}

export { Table };
