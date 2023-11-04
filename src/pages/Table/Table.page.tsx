import React, { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Box,
  Breadcrumbs,
  Center,
  Drawer,
  Group,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconHome, IconPencil, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Table } from '../../components/Table';
import classes from './Table.module.css';

interface DataInterface {
  id: string;
  device: string;
  status: number;
  times: string;
  operation: Object;
}

const deviceData = [
  {
    id: '1',
    device: '无人巡航机',
    status: 1,
    times: '1次',
  },
  {
    id: '2',
    device: '无人巡航机',
    status: 2,
    times: '1次',
  },
  {
    id: '3',
    device: '无人巡航机',
    status: 3,
    times: '1次',
  },
  {
    id: '4',
    device: '无人巡航机',
    status: 1,
    times: '1次',
  },
  {
    id: '5',
    device: '无人巡航机',
    status: 2,
    times: '1次',
  },
  {
    id: '6',
    device: '无人巡航机',
    status: 3,
    times: '1次',
  },
  {
    id: '7',
    device: '无人巡航机',
    status: 1,
    times: '1次',
  },
  {
    id: '8',
    device: '无人巡航机',
    status: 2,
    times: '1次',
  },
  {
    id: '9',
    device: '无人巡航机',
    status: 3,
    times: '1次',
  },
  {
    id: '10',
    device: '无人巡航机',
    status: 1,
    times: '1次',
  },
  {
    id: '11',
    device: '无人巡航机',
    status: 2,
    times: '1次',
  },
  {
    id: '12',
    device: '无人巡航机',
    status: 3,
    times: '1次',
  },
  {
    id: '13',
    device: '无人巡航机',
    status: 1,
    times: '1次',
  },
  {
    id: '14',
    device: '无人巡航机',
    status: 2,
    times: '1次',
  },
  {
    id: '15',
    device: '无人巡航机',
    status: 3,
    times: '1次',
  },
  {
    id: '16',
    device: '无人巡航机',
    status: 1,
    times: '1次',
  },
  {
    id: '17',
    device: '无人巡航机',
    status: 2,
    times: '1次',
  },
  {
    id: '18',
    device: '无人巡航机',
    status: 3,
    times: '1次',
  },
];

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

  const deviceColumns: {
    title: string;
    dataIndex: keyof DataInterface;
    sorted?: boolean;
    render?: any;
  }[] = [
    {
      title: 'ID',
      sorted: true,
      dataIndex: 'id',
    },
    {
      title: '设备名称',
      sorted: false,
      dataIndex: 'device',
    },
    {
      title: '设备状态',
      dataIndex: 'status',
      sorted: false,
      render: (item: number) =>
        item === 1 ? (
          <Text style={{ color: 'rgb(0, 181, 101)' }}>作业中</Text>
        ) : item === 2 ? (
          <Text style={{ color: 'rgb(66, 160, 255)' }}>待机中</Text>
        ) : (
          <Text style={{ color: 'rgb(217, 35, 35)' }}>故障</Text>
        ),
    },
    {
      title: '作业次数',
      dataIndex: 'times',
      sorted: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      sorted: false,
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
          columns={deviceColumns}
          data={deviceData.map((item) => ({ ...item, operation: item }))}
        />
      </Center>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Text>{selectItem?.id}</Text>
        <Text>{selectItem?.device}</Text>
        <Text>{selectItem?.status}</Text>
        <Text>{selectItem?.times}</Text>
      </Drawer>
    </>
  );
};

export default TablePage;
