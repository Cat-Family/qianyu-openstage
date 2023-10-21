import { AppShell, ScrollArea } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';

import { LinksGroup } from '../../NavbarLinksGroup/NavbarLinksGroup';
import classes from './Navbar.module.css';
import useFetch from '../../../hooks/useFetch';
import { useEffect, useState } from 'react';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

const Navbar = () => {
  const [links, setLinks] = useState();
  const { fetchData, data } = useFetch<any>('/menu/loadMenuTree', { method: 'POST' });

  useEffect(() => {
    fetchData();
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
