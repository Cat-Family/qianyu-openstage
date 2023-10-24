import { Box, Container, Text, Title } from '@mantine/core';
import { Table } from '../../components/Table';
import classes from './Table.module.css';

const deviceColumns = [
  {
    title: 'ID',
    sorted: false,
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
    render: () => (
      <div className="flex justify-center align-middle gap-2">
        <button>edit</button>
        <button>delete</button>
      </div>
    ),
  },
];
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
];

const TablePage = () => {
  return (
    <>
      <Box className={classes.header}>
        <Title order={2}>TablePage</Title>
        <Text size="sm">This is a table page</Text>
      </Box>
      <Container p="md" size="lg">
        <Table<{ id: string; device: string; status: number; times: string }>
          columns={deviceColumns}
          data={deviceData}
        />
      </Container>
    </>
  );
};

export default TablePage;
