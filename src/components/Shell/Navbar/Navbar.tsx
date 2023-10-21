import { AppShell, ScrollArea } from '@mantine/core';

import { LinksGroup } from '../../NavbarLinksGroup/NavbarLinksGroup';
import classes from './Navbar.module.css';
import useFetch from '../../../hooks/useFetch';
import { useEffect, useState } from 'react';

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
