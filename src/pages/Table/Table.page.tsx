import {
  ActionIcon,
  Anchor,
  Autocomplete,
  Box,
  Breadcrumbs,
  Container,
  Drawer,
  Flex,
  Group,
  NumberInput,
  SimpleGrid,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import { Table } from '../../components/Table';
import { IconHome, IconPencil, IconTrash } from '@tabler/icons-react';
import classes from './Table.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

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
          <label style={{ color: 'rgb(0, 181, 101)' }}>作业中</label>
        ) : item === 2 ? (
          <label style={{ color: 'rgb(66, 160, 255)' }}>待机中</label>
        ) : (
          <label style={{ color: 'rgb(217, 35, 35)' }}>故障</label>
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
            onClick={() => {
              open();
              setSelectItem(item);
            }}
          >
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
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
      <Container size="lg">
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          <TextInput label="ID" labelProps={{}} placeholder="Input placeholder" mb="md" />
          <TextInput label="设备名称" placeholder="Search by any field" mb="md" />
          <Autocomplete
            placeholder="Search by any field"
            label="设备状态"
            mb="md"
            data={['作业中', '待机中', '故障']}
          />
          <NumberInput label="作业次数" placeholder="Search by any field" mb="md" />
        </SimpleGrid>
      </Container>
      <Box px={60}>
        <Table<DataInterface>
          columns={deviceColumns}
          data={deviceData.map((item) => ({ ...item, operation: item }))}
        />
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
      </Box>
    </>
  );
};

export default TablePage;
