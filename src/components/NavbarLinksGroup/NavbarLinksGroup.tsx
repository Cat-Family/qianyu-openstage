import { useState } from 'react'
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem,
  Modal,
  Container,
  ScrollArea,
  Flex,
  Tabs,
  Divider,
  Space,
  Button,
  CloseButton
} from '@mantine/core'
import {
  IconChevronLeft,
  IconChevronRight,
  IconLayoutBottombarCollapseFilled,
  IconXboxX
} from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import { useCounter, useDisclosure } from '@mantine/hooks'
import SettingsModal from '../SettingsModal/SettingsModal'

const useStyles = createStyles(theme => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color
    }
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  chevron: {
    transition: 'transform 200ms ease'
  }
}))

interface LinksGroupProps {
  icon: React.FC<any>
  label: string
  initiallyOpened?: boolean
  links?: { label: string; link: string }[]
  href?: string
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  href
}: LinksGroupProps) {
  const { classes, theme, cx } = useStyles()
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft
  const { pathname } = useLocation()
  const [settingsOpened, { open, close }] = useDisclosure(false)

  const items = (hasLinks ? links : []).map(link => (
    <Text<typeof Link>
      component={Link}
      className={cx(classes.link, { [classes.active]: pathname === link.link })}
      to={link.link}
      key={link.label}
    >
      {link.label}
    </Text>
  ))

  const lorem = 'test'

  const [count, handlers] = useCounter(100, { min: 0, max: 100 })
  const content = Array(count)
    .fill(0)
    .map((_, index) => <p key={index}>{lorem}</p>)
  return (
    <>
      {href ? (
        <UnstyledButton
          component={Link}
          to={href}
          onClick={() => setOpened(o => !o)}
          className={cx(classes.control, {
            [classes.active]: pathname === href
          })}
        >
          <Group position="apart" spacing={0}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size="1.1rem" />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size="1rem"
                stroke={1.5}
                style={{
                  transform: opened
                    ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                    : 'none'
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      ) : (
        <UnstyledButton
          onClick={() => {
            setOpened(o => !o)
            console.log(label)
            if (label === 'Settings') open()
          }}
          className={classes.control}
        >
          <Group position="apart" spacing={0}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size="1.1rem" />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size="1rem"
                stroke={1.5}
                style={{
                  transform: opened
                    ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                    : 'none'
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      )}

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}

      <SettingsModal settingsOpened={settingsOpened} settingsClose={close} />
    </>
  )
}
