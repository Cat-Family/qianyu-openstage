import React, { ReactElement, useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Center,
  Drawer,
  Flex,
  Group,
  Text,
  ThemeIcon,
  Title,
  rem,
} from '@mantine/core';
import { IconHome, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Table } from '../../components/Table';
import classes from './Table.module.css';
import useFetch from '../../hooks/useFetch';
import { IconMap, IconMapKey } from '../../utils/icon';

interface DataInterface {
  id: string;
  isCatalog: boolean;
  resourceIcon: IconMapKey;
  resourceId: string;
  resourceLevel: number;
  resourceName: string;
  resourcePath: string;
  actions: DataInterface;
}
export interface ListRes {
  code: number;
  data: DataInterface[];
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
  const { fetchData, data, loading, error } = useFetch<ListRes>('/router/getMenuTree', true);

  const columns: {
    name: string;
    uid: keyof DataInterface;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    width?: string | number;
    render?: (item: DataInterface) => ReactElement | void;
  }[] = [
    {
      name: 'id',
      uid: 'resourceId',
      sortable: true,
      searchable: true,
      defaultShow: true,
    },
    {
      name: 'resourceName',
      uid: 'resourceName',
      sortable: true,
      searchable: true,
      defaultShow: true,
    },
    {
      name: 'icon',
      uid: 'resourceIcon',
      sortable: true,
      searchable: true,
      defaultShow: false,
      width: 50,
      render: (item) => (
        <ThemeIcon variant="light" size={30}>
          {IconMap[item.icon]}
        </ThemeIcon>
      ),
    },
    {
      name: 'level',
      uid: 'resourceLevel',
      sortable: true,
      searchable: true,
      defaultShow: true,
      width: 50,
    },
    {
      name: 'ACTIONS',
      uid: 'actions',
      sortable: false,
      searchable: false,
      defaultShow: true,
      render: (item: DataInterface) => (
        <Group wrap="nowrap">
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
      <Flex className={classes.header}>
        <Flex direction="column" gap="sm">
          <Breadcrumbs mt="xs">{items}</Breadcrumbs>
          <Title order={2} fz={27}>
            TablePage
          </Title>
        </Flex>

        <Button
          rightSection={<IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.8} />}
          style={{ alignSelf: 'end' }}
        >
          Add
        </Button>
      </Flex>
      <Center mx="5vw" pt="lg">
        <Table<DataInterface>
          fetchData={fetchData}
          loading={loading}
          error={error}
          columns={columns}
          data={data?.data?.map((item) => ({
            ...item,
            actions: item,
            id: item.resourceId,
          }))}
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
