import React, { useEffect } from 'react';
import { Anchor, Breadcrumbs, Button, Center, Flex, Title, rem } from '@mantine/core';
import { IconHome, IconPlus } from '@tabler/icons-react';
import useFetch from '../../hooks/useFetch';
import classes from './MenuResource.module.css';
import { ResourceResponse, ResourceTable } from '../../ts/types/interface/menu.res.interface';
import { Table } from '../../components/Table/Table';
import columns from './ResourceColumns';

const MenuResourcePage = () => {
  const { fetchData, loading, error, data } = useFetch<ResourceResponse>('/resource/list', false);

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
            level: 1,
            content: ({ children }: ResourceTable) =>
              children.length > 0 ? (
                <Table<ResourceTable>
                  w="100%"
                  columns={columns}
                  level={1}
                  noHeader
                  noSelector
                  data={children.map((item) => ({ ...item, actions: item, id: item.resourceId }))}
                  rowExpansion={{
                    level: 2,
                    content: ({ children }: ResourceTable) =>
                      children.length > 0 ? (
                        <Table<ResourceTable>
                          w="100%"
                          level={2}
                          columns={columns}
                          noHeader
                          noSelector
                          data={children.map((item) => ({
                            ...item,
                            actions: item,
                            id: item.resourceId,
                          }))}
                        />
                      ) : null,
                  }}
                />
              ) : null,
          }}
        />
      </Center>
    </>
  );
};

export default MenuResourcePage;
