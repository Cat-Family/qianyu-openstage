import React, { ReactElement, useState } from 'react';
import cx from 'clsx';
import {
  Table as MantineTable,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
  Checkbox,
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
import {
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconSearch,
  IconSelector,
} from '@tabler/icons-react';
import classes from './Table.module.css';
import scrollClasses from './Scroll.module.css';
import multiSelectClasses from './multiSelectClasses.module.css';

interface TableProps<T> {
  columns: {
    title: string;
    sorted?: boolean;
    dataIndex: keyof T;
    render?: (item: any) => ReactElement;
  }[];
  data: T[];
}

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted: boolean;
  onSort?(): void;
  isSorted?: boolean;
}

function Th({ children, reversed, sorted, onSort, isSorted }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <MantineTable.Th>
      {isSorted ? (
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group justify="space-between">
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
}

function Table<T extends { id: string }>({ columns, data }: TableProps<T>) {
  const [sortedData, setSortedData] = useState(data);
  const [searchDataIndex, setSearchDataIndex] = useState<string>(columns[0].title);
  const [renderColumns, setRenderColumns] = useState(columns.map((item) => item.title));
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const toggleRow = (id: string) =>
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
      <Flex gap="lg" w="100%" align="center">
        <Select
          w={150}
          data={columns.filter((item) => !item.render).map((item) => item.title)}
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
            data={columns.map((item) => item.title)}
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
          <MantineTable.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <MantineTable.Tr key="head">
              <MantineTable.Td key="check">
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={selection.length > 0 && selection.length !== data.length}
                />
              </MantineTable.Td>
              {columns.map(
                (item, index) =>
                  renderColumns.includes(item.title) && (
                    <Th
                      key={index}
                      isSorted={item.sorted}
                      sorted={sortBy === item.dataIndex}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting(item.dataIndex)}
                    >
                      {item.title}
                    </Th>
                  )
              )}
            </MantineTable.Tr>
          </MantineTable.Thead>
          <MantineTable.Tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <MantineTable.Tr
                  key={item.id}
                  onClick={() => toggleRow(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <MantineTable.Td>
                    <Checkbox
                      checked={selection.includes(item.id)}
                      onChange={() => toggleRow(item.id)}
                    />
                  </MantineTable.Td>
                  {columns.map(
                    (column) =>
                      renderColumns.includes(column.title) &&
                      (column.render ? (
                        <MantineTable.Td key={item.id + column.dataIndex.toString()}>
                          {column.render(item[column.dataIndex])}
                        </MantineTable.Td>
                      ) : (
                        <MantineTable.Td key={item.id + column.dataIndex.toString()}>
                          <Text fw={400} fz="sm">
                            {item[column.dataIndex] as ReactElement}
                          </Text>
                        </MantineTable.Td>
                      ))
                  )}
                </MantineTable.Tr>
              ))
            ) : (
              <MantineTable.Tr>
                <MantineTable.Td colSpan={Object.keys(data[0]).length + 2}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </MantineTable.Td>
              </MantineTable.Tr>
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
