import React, { ReactElement, useState } from 'react';
import {
  Table as MantineTable,
  ScrollArea,
  Group,
  Text,
  Pagination,
  Flex,
  Input,
  Button,
  Menu,
  MenuTarget,
  MenuDropdown,
  MenuItem,
  Stack,
  MultiSelect,
  Select,
} from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import scrollClasses from './Scroll.module.css';
import multiSelectClasses from './multiSelectClasses.module.css';
import { TableEmpty } from './TableEmpty';

interface TableProps<T> {
  columns: {
    name: string;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    uid: keyof T;
    render?: (item: any) => ReactElement;
  }[];
  data: T[];
}

function Table<T extends { id: number }>({ columns, data }: TableProps<T>) {
  const [sortedData, setSortedData] = useState(data);
  const [searchDataIndex, setSearchDataIndex] = useState<string>(columns[0].name);
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
      <Flex gap="lg" w="100%" align="center" wrap="wrap">
        <Select
          w={150}
          data={columns.filter((item) => item.searchable).map((item) => item.name)}
          defaultValue={searchDataIndex}
          checkIconPosition="right"
          allowDeselect={false}
          onChange={(e) => setSearchDataIndex(e as string)}
        />
        <Input
          style={{ flex: 1 }}
          placeholder={`Search by ${searchDataIndex}...`}
          leftSection={<IconSearch size={16} />}
        />
        <Flex gap="lg" align="center">
          <MultiSelect
            classNames={multiSelectClasses}
            placeholder="Status"
            w={150}
            checkIconPosition="right"
            defaultValue={['a', 'b', 'c']}
            data={['a', 'b', 'c']}
          />
          <MultiSelect
            w={150}
            classNames={multiSelectClasses}
            checkIconPosition="right"
            data={columns.map((item) => item.name)}
            placeholder="Columns"
            defaultValue={renderColumns}
            onChange={setRenderColumns}
          />
          <Button style={{ alignSelf: 'end' }} rightSection={<IconPlus />}>
            Add New
          </Button>
        </Flex>
      </Flex>
      <Flex justify="space-between" align="center" w="100%">
        <Text size="xs">Total {data.length} users</Text>
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
      <ScrollArea
        offsetScrollbars
        classNames={scrollClasses}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <MantineTable highlightOnHover withRowBorders>
          <TableHeader
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
    </Stack>
  );
}

export { Table };
