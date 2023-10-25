import cx from 'clsx';
import { UserMenu } from '../../../components/UserMenu/UserMenu';
import { AppShell, Box, Burger, Flex, Group, RemoveScroll, Title } from '@mantine/core';
import classes from './Header.module.css';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: HeaderProps) => {
  return (
    <>
      <AppShell.Header
        display="flex"
        className={cx(classes.header, RemoveScroll.classNames.fullWidth)}
        data-desktop
      >
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Title size={21} fw={600}>
            千渝掌柜
          </Title>
        </Group>
        <Box style={{ flex: 1 }} />
        <Group h="100%" px="md">
          <UserMenu />
        </Group>
      </AppShell.Header>
    </>
  );
};

export default Header;
