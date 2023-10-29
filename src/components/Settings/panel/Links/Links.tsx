import { Container, Box, Group, Button, Grid } from '@mantine/core';
import classes from './Links.module.css';

export default function Links() {
  return (
    <Container className={classes.root_container}>
      <Box className={classes.root_box}>
        <Grid>
          <Grid.Col span={4}>
						
					</Grid.Col>
          <Grid.Col span={4}>2</Grid.Col>
          <Grid.Col span={4}>3</Grid.Col>
        </Grid>
      </Box>
    </Container>
  );
}
