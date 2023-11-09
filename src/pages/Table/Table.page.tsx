import React, { ReactElement, useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Center,
  Drawer,
  Flex,
  Group,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconHome, IconPencil, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { users, statusOptions } from './data';
import { Table } from '../../components/Table';
import classes from './Table.module.css';

interface DataInterface {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
  actions: any;
}

const items = [
  <Anchor href="#" size="sm" key="home">
    <IconHome size={12} />
  </Anchor>,
  <Anchor href="#" size="12" key="tablePage">
    Table Page
  </Anchor>,
];

const TablePage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectItem, setSelectItem] = useState<DataInterface | undefined>();

  const usersColumns: {
    name: string;
    uid: keyof DataInterface;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    render?: (item: DataInterface) => ReactElement | void;
  }[] = [
    {
      name: 'ID',
      uid: 'id',
      sortable: true,
      searchable: true,
      defaultShow: true,
    },
    {
      name: 'NAME',
      uid: 'name',
      sortable: true,
      searchable: true,
      defaultShow: true,
      render: (item: DataInterface) => (
        <Group>
          <Avatar src={item.avatar} />
          <Flex direction="column">
            <Text size="sm">{item.name}</Text>
            <Text size="xs">{item.email}</Text>
          </Flex>
        </Group>
      ),
    },
    { name: 'AGE', uid: 'age', sortable: true, searchable: true, defaultShow: false },
    {
      name: 'ROLE',
      uid: 'role',
      sortable: true,
      searchable: true,
      defaultShow: true,
      render: (item: DataInterface) => (
        <Flex direction="column">
          <Text size="sm">{item.role}</Text>
          <Text size="xs">{item.team}</Text>
        </Flex>
      ),
    },
    { name: 'TEAM', uid: 'team', searchable: true, defaultShow: false },
    {
      name: 'EMAIL',
      uid: 'email',
      searchable: true,
      defaultShow: false,
    },
    {
      name: 'STATUS',
      uid: 'status',
      sortable: true,
      searchable: false,
      defaultShow: true,
      render: (item: DataInterface) => (
        <Group>
          <Badge
            size="xs"
            radius="xl"
            w={12}
            h={12}
            style={{ border: 'none' }}
            color={item.status === 'active' ? 'green' : item.status === 'paused' ? 'red' : 'yellow'}
          />
          <Text size="xs">
            {statusOptions.findLast((status) => status.uid === item.status)?.name}
          </Text>
        </Group>
      ),
    },
    {
      name: 'ACTIONS',
      uid: 'actions',
      sortable: false,
      searchable: false,
      defaultShow: true,
      render: (item: DataInterface) => (
        <Group>
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={(e) => {
              e.stopPropagation();
              open();
              setSelectItem(item);
            }}
          >
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <>
      <Box className={classes.header}>
        <Breadcrumbs mt="xs">{items}</Breadcrumbs>
        <Title order={2} fz={30}>
          TablePage
        </Title>
      </Box>
      <Center mx="5vw" pt="lg">
        <Table<DataInterface>
          columns={usersColumns}
          data={users.map((item) => ({ ...item, actions: item }))}
        />
      </Center>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Text>{JSON.stringify(selectItem)}</Text>
      </Drawer>
    </>
  );
};

export default TablePage;
