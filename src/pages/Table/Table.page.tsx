import React, { ReactElement, useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Center,
  Drawer,
  Group,
  Text,
  ThemeIcon,
  Title,
  rem,
} from '@mantine/core';
import { IconHome, IconPencil, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Table } from '../../components/Table';
import classes from './Table.module.css';
import useFetch from '../../hooks/useFetch';
import { IconMap, IconMapKey } from '../../components/NavbarLinksGroup/NavbarLinksGroup';

interface DataInterface {
  catalogName: string;
  icon: IconMapKey;
  id: string;
  level: number;
  actions: DataInterface;
}

export interface ListRes {
  code: number;
  data: {
    pageBean: {
      list: DataInterface[];
      pageNum: number;
      pageSize: number;
      pages: number;
      total: number;
    };
  };
  message: string;
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
  const { fetchData, data, loading, error } = useFetch<ListRes>(false);

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
      name: 'catalogName',
      uid: 'catalogName',
      sortable: true,
      searchable: true,
      defaultShow: true,
    },
    {
      name: 'icon',
      uid: 'icon',
      sortable: true,
      searchable: true,
      defaultShow: false,
      render: (item) => (
        <ThemeIcon variant="light" size={30}>
          {IconMap[item.icon]}
        </ThemeIcon>
      ),
    },
    {
      name: 'level',
      uid: 'level',
      sortable: true,
      searchable: true,
      defaultShow: true,
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
          fetchData={fetchData}
          loading={loading}
          error={error}
          pageSize={data?.data.pageBean.pages}
          pageNum={data?.data.pageBean.pageNum}
          total={data?.data.pageBean.total}
          pages={data?.data.pageBean.total}
          columns={usersColumns}
          data={data?.data?.pageBean.list.map((item) => ({ ...item, actions: item }))}
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
