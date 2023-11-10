import React, { ReactElement, useLayoutEffect, useState } from 'react';
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
  rem,
} from '@mantine/core';
import { IconChecks, IconDownload, IconTrash } from '@tabler/icons-react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import scrollClasses from './Scroll.module.css';
import { TableEmpty } from './TableEmpty';
import { TableSearch } from './TableSearch';
import { FetchData } from '../../ts/types/types/fetchData.type';
import { TableLoader } from './TableLoader';

interface TableProps<T> {
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T;
    render?: (item: any) => ReactElement | void;
  }[];
  data?: T[];
  loading?: boolean;
  fetchData: FetchData;
  pageNum?: number;
  pageSize?: number;
  pages?: number;
  total?: number;
  error?: Error;
}

function Table<T extends { id: string }>({
  columns,
  data,
  fetchData,
  loading,
  pageNum,
  pageSize,
  pages,
  total,
  error,
}: TableProps<T>) {
  const [renderColumns, setRenderColumns] = useState(
    columns.filter((item) => item.defaultShow).map((item) => item.name)
  );
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      data ? (current.length === data.length ? [] : data.map((item) => item.id)) : []
    );

  const setSorting = (field: keyof T) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  useLayoutEffect(() => {
    fetchData('/catalog/list', { method: 'POST' });
  }, []);

  return (
    <Stack gap="sm">
      <TableSearch
        fetchData={fetchData}
        columns={columns}
        renderColumns={renderColumns}
        setRenderColumns={setRenderColumns}
      />
      <Flex justify="space-between" align="center" w="100%" mt="xs">
        <Text size="xs">Total {total} users</Text>
        <Menu shadow="lg" width={180}>
          <MenuTarget>
            <Button variant="subtle" disabled={selection.length === 0} ta="center" size="xs">
              {total} of {selection.length} selected
            </Button>
          </MenuTarget>
          <MenuDropdown>
            <Menu.Item leftSection={<IconChecks style={{ width: rem(14), height: rem(14) }} />}>
              Batch approvals
            </Menu.Item>
            <Menu.Item leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
              Batch downloads
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
            >
              Delete in bulk
            </Menu.Item>
          </MenuDropdown>
        </Menu>
      </Flex>
      <ScrollArea
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
            {loading || !data ? (
              <TableLoader loading={loading} length={renderColumns.length} />
            ) : data.length > 0 ? (
              data?.map((item) => (
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

      <Flex w="100%" align="center" justify="space-between">
        <Pagination.Root total={pages ?? 0} value={pageNum} size="sm" radius="md" siblings={0}>
          <Group wrap="nowrap" gap="xs">
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
          </Group>
        </Pagination.Root>

        <Menu shadow="md" width={100}>
          <MenuTarget>
            <Text size="xs" style={{ cursor: 'pointer' }}>
              Row per page: {pageSize}
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
