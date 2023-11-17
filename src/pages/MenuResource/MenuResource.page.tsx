import React, { ReactElement, useEffect, useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Flex,
  Group,
  ThemeIcon,
  Title,
  rem,
} from '@mantine/core';
import { IconHome, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import useFetch from '../../hooks/useFetch';
import classes from './MenuResource.module.css';
import {
  ResourceResponse,
  ResourceInterface,
  ResourceTable,
} from '../../ts/types/interface/menu.res.interface';
import { Table } from '../../components/Table/Table';
import { IconMap, IconMapKey } from '../../utils/icon';

const MenuResourcePage = () => {
  const { fetchData, loading, error, data } = useFetch<ResourceResponse>('/resource/list', false);

  const columns: {
    name: string;
    uid: keyof ResourceTable;
    sortable?: boolean;
    searchable?: boolean;
    defaultShow?: boolean;
    width?: string | number;
    render?: (item: ResourceInterface) => ReactElement | void;
  }[] = [
    {
      name: 'ID',
      uid: 'resourceId',
      sortable: true,
      searchable: true,
      defaultShow: true,
    },
    {
      name: 'Name',
      uid: 'resourceName',
      sortable: true,
      searchable: true,
      defaultShow: true,
      render: (item) => (
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeIcon variant="light" size={30}>
            {IconMap[item.resourceIcon as IconMapKey]}
          </ThemeIcon>
          <Box ml="md">{item.resourceName}</Box>
        </Box>
      ),
    },
    {
      name: 'ACTIONS',
      uid: 'actions',
      sortable: false,
      searchable: false,
      defaultShow: true,
      render: (item: ResourceInterface) => (
        <Group wrap="nowrap">
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={(e) => {
              e.stopPropagation();
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

  const items = [
    <Anchor href="#" size="sm" key="home">
      <IconHome size={12} />
    </Anchor>,
    <Anchor href="#" size="12" key="tablePage">
      资源配置
    </Anchor>,
  ];

  useEffect(() => {
    fetchData('', { method: 'POST' });
  }, []);

  return (
    <>
      <Flex className={classes.header}>
        <Flex direction="column" gap="sm">
          <Breadcrumbs mt="xs">{items}</Breadcrumbs>
          <Title order={2} fz={27}>
            资源配置
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
        <Table<ResourceTable>
          fetchData={fetchData}
          loading={loading}
          error={error}
          columns={columns}
          data={data?.data?.map((item) => ({
            ...item,
            actions: item,
            id: item.resourceId,
          }))}
          noSelector
          rowExpansion={{
            content: ({ children }: ResourceTable) =>
              children.length > 0 ? (
                <Table<ResourceTable>
                  w="100%"
                  columns={columns}
                  noHeader
                  noSelector
                  data={children.map((item) => ({ ...item, actions: item, id: item.resourceId }))}
                />
              ) : null,
          }}
        />
      </Center>
    </>
  );
};

export default MenuResourcePage;
