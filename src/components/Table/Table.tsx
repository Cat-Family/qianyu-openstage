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
  LoadingOverlay,
  StyleProp,
} from '@mantine/core';
import {
  IconChecks,
  IconDatabaseOff,
  IconDownload,
  IconExclamationCircle,
  IconTrash,
} from '@tabler/icons-react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import scrollClasses from './Scroll.module.css';
import { TableSearch } from './TableSearch';
import { FetchData } from '../../ts/types/types/fetchData.type';

interface TableProps<T> {
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    w?: StyleProp<React.CSSProperties['width']> | undefined;
    uid: keyof T;
    render?: (item: any) => ReactElement | void;
  }[];
  data?: T[];
  rowExpansion?: any;
  loading?: boolean;
  fetchData?: FetchData;
  pages?: number;
  total?: number;
  error?: Error;
  noHeader?: boolean;
  noFooter?: boolean;
  noSelector?: boolean;
  w?: StyleProp<React.CSSProperties['width']> | undefined;
}

function Table<T extends { id: string }>({
  columns,
  data,
  fetchData,
  loading,
  pages,
  total,
  error,
  rowExpansion,
  noHeader,
  noFooter,
  noSelector,
  w,
}: TableProps<T>) {
  const [renderColumns, setRenderColumns] = useState(
    columns.filter((item) => item.defaultShow).map((item) => item.name)
  );
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);

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
    const formData = new FormData();
    formData.append('pageSize', pageSize.toString());
    formData.append('pageNum', pageNum.toString());
    fetchData?.('', { method: 'POST', body: formData });
  }, []);

  return (
    <Stack gap="sm" pos="relative">
      {!noHeader && (
        <>
          <TableSearch
            pageNum={pageNum}
            pageSize={pageSize}
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
                <Menu.Item
                  leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
                >
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
        </>
      )}
      <ScrollArea
        w={w}
        pos="relative"
        classNames={scrollClasses}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <MantineTable withRowBorders>
          {!noHeader && (
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
              expansion={rowExpansion}
              noSelector={noSelector}
            />
          )}
          <MantineTable.Tbody>
            {data &&
              data.map((item) => (
                <TableRow<T>
                  key={item.id}
                  id={item.id}
                  item={item}
                  toggleRow={toggleRow}
                  columns={columns}
                  renderColumns={renderColumns}
                  selection={selection}
                  expansion={rowExpansion}
                  noSelector={noSelector}
                />
              ))}
          </MantineTable.Tbody>
        </MantineTable>
        <LoadingOverlay visible={loading} zIndex={800} overlayProps={{ radius: 'sm', blur: 2 }} />
        <LoadingOverlay
          visible={!loading && data?.length === 0}
          zIndex={800}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ children: <IconDatabaseOff scale={2} height={35} width={35} /> }}
        />
        <LoadingOverlay
          visible={Boolean(error)}
          zIndex={800}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{
            children: (
              <Stack gap="xs" justify="center" align="center">
                <IconExclamationCircle color="red" scale={2} height={35} width={35} />
                <Text>{error?.message}</Text>
              </Stack>
            ),
          }}
        />
      </ScrollArea>

      {!noFooter && pages && (
        <Flex w="100%" align="center" justify="space-between">
          <Menu shadow="md" width={100}>
            <MenuTarget>
              <Text size="xs" style={{ cursor: 'pointer' }}>
                Row per page: {pageSize}
              </Text>
            </MenuTarget>
            <MenuDropdown>
              <MenuItem onClick={() => setPageSize(10)}>
                <Text>10</Text>
              </MenuItem>
              <MenuItem onClick={() => setPageSize(15)}>
                <Text>15</Text>
              </MenuItem>
              <MenuItem onClick={() => setPageSize(20)}>
                <Text>20</Text>
              </MenuItem>
            </MenuDropdown>
          </Menu>

          <Pagination.Root
            total={pages ?? 0}
            value={pageNum}
            onChange={setPageNum}
            size="sm"
            radius="md"
            siblings={0}
          >
            <Group wrap="nowrap" gap="xs">
              <Pagination.Previous />
              <Pagination.Items />
              <Pagination.Next />
            </Group>
          </Pagination.Root>
        </Flex>
      )}
    </Stack>
  );
}

export { Table };
