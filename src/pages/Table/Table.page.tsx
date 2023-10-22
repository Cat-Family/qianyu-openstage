import { Box, Container, Text, Title } from '@mantine/core';
import { Table } from '../../components/Table';
import classes from './Table.module.css';

const TablePage = () => {
  return (
    <>
			<Box className={classes.header}>
				<Title order={2}>TablePage</Title>
				<Text size="sm">This is a table page</Text>
			</Box>
      <Container p="md" size="lg">
        {/* <Table /> */}
      </Container>
    </>
  );
};

export default TablePage;
