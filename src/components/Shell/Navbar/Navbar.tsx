import React, { useEffect, useState } from 'react';
import { AppShell, ScrollArea } from '@mantine/core';

import { LinksGroup } from '../../NavbarLinksGroup/NavbarLinksGroup';
import useFetch from '../../../hooks/useFetch';
import classes from './Navbar.module.css';

const Navbar = () => {
  const [links, setLinks] = useState();
  const { fetchData, data } = useFetch<any>();

  useEffect(() => {
    fetchData('/menu/loadMenuTree', { method: 'POST' });
  }, []);

  useEffect(() => {
    data?.data && setLinks(data.data.map((item: any) => <LinksGroup {...item} key={item.id} />));
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
