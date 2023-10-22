import { FC, ReactElement, useState } from 'react';
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
  Flex,
  Avatar,
  Menu,
  ActionIcon,
  Select,
  Badge,
  Anchor,
} from '@mantine/core';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPencil,
  IconDots,
  IconMessages,
  IconReportAnalytics,
  IconNote,
  IconTrash,
} from '@tabler/icons-react';
import classes from './Table.module.css';

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <MantineTable.Th className={classes.th}>
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
    </MantineTable.Th>
  );
}

const rolesData = ['Manager', 'Collaborator', 'Contractor', 'Designer', 'Engineer'];

function filterData<T extends Object>(data: T[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key]?.toString().toLowerCase().includes(query))
  );
}

function sortData<T extends Object>(
  data: T[],
  payload: { sortBy: keyof T | null; reversed: boolean; search: string }
) {item
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData<T>(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy]?.toString().localeCompare(a[sortBy]?.toString());
      }

      return a[sortBy]?.toString().localeCompare(b[sortBy]?.toString());
    }),
    payload.search
  );
}

interface IProps<T> {
  columns: {
    title: string;
    dataIndex: string;
    render?: (item: any) => ReactElement;
  }[];
  data: T[];
}

export function Table<T extends object>({ columns, data }: IProps<T>) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<T[]>(data);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

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

  // const rows = sortedData.map((item) => (
  //   <MantineTable.Tr key={item.name}>
  //     <MantineTable.Td>
  //       <Checkbox
  //       // checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)}
  //       />
  //     </MantineTable.Td>
  //     <MantineTable.Td>
  //       <Group gap="sm">
  //         <Avatar size={40} src={item.avatar} radius={40} />
  //         <Text fz="sm" fw={500}>
  //           {item.name}
  //         </Text>
  //       </Group>
  //     </MantineTable.Td>
  //     <MantineTable.Td>
  //       <Badge color={jobColors[item.job.toLowerCase()]} variant="light">
  //         {item.job}
  //       </Badge>
  //     </MantineTable.Td>
  //     <MantineTable.Td>
  //       <Anchor component="button" size="sm">
  //         {item.email}
  //       </Anchor>
  //     </MantineTable.Td>
  //     <MantineTable.Td>
  //       <Text fz="sm">${item.rate.toFixed(1)} / hr</Text>
  //     </MantineTable.Td>
  //     <MantineTable.Td>
  //       <Group gap={0} justify="flex-end">
  //         <ActionIcon variant="subtle" color="gray">
  //           <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
  //         </ActionIcon>

  //         <Menu
  //           transitionProps={{ transition: 'pop' }}
  //           withArrow
  //           position="bottom-end"
  //           withinPortal
  //         >
  //           <Menu.Target>
  //             <ActionIcon variant="subtle" color="red">
  //               <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
  //             </ActionIcon>
  //           </Menu.Target>
  //           <Menu.Dropdown>
  //             <Menu.Item
  //               leftSection={
  //                 <IconMessages style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
  //               }
  //             >
  //               Send message
  //             </Menu.Item>
  //             <Menu.Item
  //               leftSection={<IconNote style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
  //             >
  //               Add note
  //             </Menu.Item>
  //             <Menu.Item
  //               leftSection={
  //                 <IconReportAnalytics style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
  //               }
  //             >
  //               Analytics
  //             </Menu.Item>
  //             <Menu.Item
  //               leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
  //               color="red"
  //             >
  //               Terminate contract
  //             </Menu.Item>
  //           </Menu.Dropdown>
  //         </Menu>
  //       </Group>
  //     </MantineTable.Td>
  //   </MantineTable.Tr>
  // ));

  return (
    <ScrollArea>
      <Flex direction="column" wrap="nowrap" gap="lg">
        <TextInput
          placeholder="Search by any field"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          // onChange={handleSearchChange}
        />
        <MantineTable mb="lg" horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
          <MantineTable.Tbody>
            <MantineTable.Tr>
              <MantineTable.Th style={{ width: rem(40) }}>
                <Checkbox
                // onChange={toggleAll}
                // checked={selection.length === data.length}
                // indeterminate={selection.length > 0 && selection.length !== data.length}
                />
              </MantineTable.Th>
              {columns.map((item, index) => (
                <Th
                  key={index}
                  sorted={false}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting<>(item)}
                >
                  {item.title}
                </Th>
              ))}
            </MantineTable.Tr>
          </MantineTable.Tbody>
          <MantineTable.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <MantineTable.Tr>
                <MantineTable.Td>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </MantineTable.Td>
              </MantineTable.Tr>
            )}
          </MantineTable.Tbody>
        </MantineTable>
        <Center>
          <Pagination total={20} value={100} withControls withEdges size="md" gap="sm" />
        </Center>
      </Flex>
    </ScrollArea>
  );
}
