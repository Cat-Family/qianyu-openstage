import React, { useEffect, useState } from 'react';
import { AppShell, ScrollArea } from '@mantine/core';
import useCookie from '../../../hooks/useCookie';
import { LinksGroup } from '../../NavbarLinksGroup/NavbarLinksGroup';
import useFetch from '../../../hooks/useFetch';
import classes from './Navbar.module.css';
import { LoadMenuTreeRes } from '@/ts/types/interface/menu.res.interface';

const Navbar = () => {
  const [links, setLinks] = useState<any>();
  const { fetchData, data } = useFetch<LoadMenuTreeRes>(false);
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
        <div className={classes.linksInner}>{links}</div>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;
