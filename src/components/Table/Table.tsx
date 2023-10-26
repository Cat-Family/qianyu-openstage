import cx from 'clsx';
import { ReactElement, ReactNode, useState } from 'react';
import {
  Table as MantineTable,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Checkbox,
  Pagination,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import classes from './Table.module.css';

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
    <MantineTable.Th className={classes.th}>
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
        <Text fw={500} fz="sm" >
          {children}
        </Text>
      )}
    </MantineTable.Th>
  );
}

function filterData<T extends { id: string }>(data: T[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

function sortData<T extends { id: string }>(
  data: T[],
  payload: { sortBy: keyof T | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData<T>(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return new String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

function Table<T extends { id: string }>({ columns, data }: TableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
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
    setSortedData(sortData<T>(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  return (
    <>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea h="69vh" p="lg" onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <MantineTable highlightOnHover withTableBorder withRowBorders>
          <MantineTable.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <MantineTable.Tr key="head">
              <MantineTable.Td key="check">
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={selection.length > 0 && selection.length !== data.length}
                />
              </MantineTable.Td>
              {columns.map((item, index) => (
                <Th
                  key={index}
                  isSorted={item.sorted}
                  sorted={sortBy === item.dataIndex}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting(item.dataIndex)}
                >
                  {item.title}
                </Th>
              ))}
            </MantineTable.Tr>
          </MantineTable.Thead>
          <MantineTable.Tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <MantineTable.Tr key={item.id}>
                  <MantineTable.Td>
                    <Checkbox
                      checked={selection.includes(item.id)}
                      onChange={() => toggleRow(item.id)}
                    />
                  </MantineTable.Td>
                  {columns.map((column) => {
                    if (column.render)
                      return (
                        <MantineTable.Td key={item.id + column.dataIndex.toString()}>
                          {column.render(item[column.dataIndex])}
                        </MantineTable.Td>
                      );
                    else
                      return (
                        <MantineTable.Td key={item.id + column.dataIndex.toString()}>
                          <Text fw={400} fz="sm" >
                            {item[column.dataIndex] as ReactElement}
                          </Text>
                        </MantineTable.Td>
                      );
                  })}
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
      <Center>
        <Pagination total={10} />
      </Center>
    </>
  );
}

export { Table };