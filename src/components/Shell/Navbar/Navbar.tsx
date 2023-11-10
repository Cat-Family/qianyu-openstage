import React, { useEffect, useState } from 'react';
import { AppShell, Box, ScrollArea, Skeleton } from '@mantine/core';
import useCookie from '../../../hooks/useCookie';
import { LinksGroup } from '../../NavbarLinksGroup/NavbarLinksGroup';
import useFetch from '../../../hooks/useFetch';
import { LoadMenuTreeRes } from '../../../ts/types/interface/menu.res.interface';
import classes from './Navbar.module.css';

const Navbar = () => {
  const [links, setLinks] = useState<any>();
  const { fetchData, data, loading } = useFetch<LoadMenuTreeRes>(false);
  const [value] = useCookie('qy');

  useEffect(() => {
    value && fetchData('/router/loadMenuTree', { method: 'POST' });
  }, []);

  useEffect(() => {
    data?.data && setLinks(data.data.map((item, index) => <LinksGroup {...item} key={index} />));
  }, [data]);
  return (
    <AppShell.Navbar>
      <AppShell.Section component={ScrollArea} type="never">
        {links}
        {loading &&
          [...new Array(5).keys()].map((item) => (
            <Box className={classes.skeleton} key={item}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Skeleton h={30} w={30} />
                <Skeleton h="1rem" w={80} />
              </Box>
            </Box>
          ))}
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;
