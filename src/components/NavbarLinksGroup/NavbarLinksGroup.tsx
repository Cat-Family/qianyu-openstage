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

      <Modal
        opened={settingsOpened}
        onClose={close}
        fullScreen
        withCloseButton={false}
        transitionProps={{ transition: 'fade', duration: 200 }}
        padding={0}
      >
        <Container size="md" px="xs" display="flex">
          <Tabs
            sx={{ flex: 1 }}
            mih="100vh"
            defaultValue="gallery"
            orientation="vertical"
          >
            <Tabs.List>
              <ScrollArea h="100vh" type="never">
                <Space h={18} />
                <Text fz="12px">用户设置</Text>
                <Tabs.Tab w="100%" value="gallery">
                  我的账号
                </Tabs.Tab>
                <Tabs.Tab w="100%" value="messages">
                  个人资料
                </Tabs.Tab>
                <Tabs.Tab w="100%" value="settings">
                  隐私与安全
                </Tabs.Tab>
                <Tabs.Tab w="100%" value="a">
                  设备
                </Tabs.Tab>
                <Tabs.Tab w="100%" value="b">
                  连接
                </Tabs.Tab>
                <Divider my="sm" />
                <Text fz="xs">APP设置</Text>
                <Tabs.Tab w="100%" value="c">
                  外观
                </Tabs.Tab>
                <Tabs.Tab w="100%" value="c">
                  通知
                </Tabs.Tab>
                <Tabs.Tab w="100%" value="c">
                  快捷键
                </Tabs.Tab>
                <Tabs.Tab w="100%" value="d">
                  语言
                </Tabs.Tab>
                <Tabs.Tab w="100%" value="e">
                  高级设置
                </Tabs.Tab>
                <Divider my="sm" />
                <Tabs.Tab w="100%" value="f">
                  登出
                </Tabs.Tab>
                <Divider my="sm" />
                <Text fz={10}>Dev 0.0.1 (6822a8c)</Text>
                <Text fz={10}>Windows 10 64-Bit</Text>
              </ScrollArea>
            </Tabs.List>

            <Tabs.Panel
              value="gallery"
              sx={{ paddingTop: '1vh', paddingInline: '1rem' }}
            >
              <ScrollArea h="99vh" type="never" offsetScrollbars>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Maecenas pharetra convallis posuere morbi. Lectus nulla at
                  volutpat diam ut venenatis. Ornare lectus sit amet est
                  placerat. In eu mi bibendum neque egestas. Nulla facilisi
                  etiam dignissim diam quis enim. Quam pellentesque nec nam
                  aliquam sem et tortor. At imperdiet dui accumsan sit amet
                  nulla facilisi. Ut tristique et egestas quis ipsum suspendisse
                  ultrices gravida dictum. Nunc pulvinar sapien et ligula
                  ullamcorper. A condimentum vitae sapien pellentesque habitant.
                  Nibh ipsum consequat nisl vel pretium lectus. Magna fermentum
                  iaculis eu non diam. Id aliquet lectus proin nibh nisl
                  condimentum id. Faucibus a pellentesque sit amet porttitor.
                  Turpis egestas sed tempus urna et pharetra. Odio euismod
                  lacinia at quis risus sed. Phasellus faucibus scelerisque
                  eleifend donec pretium vulputate sapien nec sagittis. Viverra
                  vitae congue eu consequat ac felis. Justo nec ultrices dui
                  sapien eget. Montes nascetur ridiculus mus mauris vitae
                  ultricies leo integer. Proin fermentum leo vel orci porta non
                  pulvinar neque. Ipsum dolor sit amet consectetur. At augue
                  eget arcu dictum. Nullam eget felis eget nunc lobortis mattis
                  aliquam faucibus. Dictum sit amet justo donec enim diam
                  vulputate. Fringilla urna porttitor rhoncus dolor. Mauris nunc
                  congue nisi vitae. In mollis nunc sed id semper risus.
                  Suspendisse ultrices gravida dictum fusce ut placerat orci.
                  Nascetur ridiculus mus mauris vitae ultricies leo integer
                  malesuada. Varius sit amet mattis vulputate. Quam adipiscing
                  vitae proin sagittis nisl rhoncus mattis rhoncus. Non enim
                  praesent elementum facilisis leo vel fringilla est. Placerat
                  duis ultricies lacus sed turpis tincidunt id aliquet. Arcu
                  cursus euismod quis viverra nibh cras. Quis blandit turpis
                  cursus in hac habitasse platea dictumst. Id consectetur purus
                  ut faucibus pulvinar. Ut morbi tincidunt augue interdum velit
                  euismod in. Fringilla urna porttitor rhoncus dolor purus non
                  enim praesent. Non odio euismod lacinia at quis. Bibendum est
                  ultricies integer quis auctor. Dolor sed viverra ipsum nunc
                  aliquet bibendum enim facilisis. Lobortis feugiat vivamus at
                  augue eget arcu dictum varius. Morbi blandit cursus risus at
                  ultrices. Eget aliquet nibh praesent tristique magna sit amet
                  purus. Tellus at urna condimentum mattis pellentesque. Sodales
                  neque sodales ut etiam sit amet nisl purus. Id porta nibh
                  venenatis cras. Mi bibendum neque egestas congue quisque
                  egestas diam. Nec dui nunc mattis enim ut tellus elementum.
                  Sed felis eget velit aliquet sagittis id consectetur. Nunc
                  pulvinar sapien et ligula ullamcorper malesuada. Eget nullam
                  non nisi est sit. Tellus pellentesque eu tincidunt tortor
                  aliquam nulla facilisi cras fermentum. Facilisis gravida neque
                  convallis a cras semper auctor. Vestibulum sed arcu non odio
                  euismod lacinia at quis risus. Pulvinar mattis nunc sed
                  blandit libero. Nisl purus in mollis nunc sed. Vitae semper
                  quis lectus nulla. In tellus integer feugiat scelerisque.
                  Habitasse platea dictumst quisque sagittis purus sit amet. Dui
                  ut ornare lectus sit amet. Aliquet risus feugiat in ante metus
                  dictum at. Eu nisl nunc mi ipsum faucibus vitae aliquet nec.
                  Tempus urna et pharetra pharetra massa. Dictum fusce ut
                  placerat orci nulla pellentesque dignissim enim. Quis lectus
                  nulla at volutpat diam ut venenatis. Etiam dignissim diam quis
                  enim lobortis scelerisque fermentum dui faucibus. Ullamcorper
                  eget nulla facilisi etiam dignissim. Quis lectus nulla at
                  volutpat diam ut venenatis. Ipsum consequat nisl vel pretium
                  lectus quam id leo in. Morbi non arcu risus quis varius quam.
                  Duis at tellus at urna condimentum mattis pellentesque id
                  nibh. Erat nam at lectus urna. Sit amet facilisis magna etiam.
                  Dolor magna eget est lorem ipsum dolor sit. Libero id faucibus
                  nisl tincidunt eget nullam. Id aliquet risus feugiat in ante
                  metus dictum at tempor. Faucibus pulvinar elementum integer
                  enim neque. Lectus proin nibh nisl condimentum id. Habitasse
                  platea dictumst vestibulum rhoncus est pellentesque. Viverra
                  accumsan in nisl nisi scelerisque. Enim nulla aliquet
                  porttitor lacus luctus. Pretium viverra suspendisse potenti
                  nullam ac tortor. Maecenas volutpat blandit aliquam etiam erat
                  velit. Id porta nibh venenatis cras sed. Sagittis aliquam
                  malesuada bibendum arcu vitae elementum.
                </Text>
              </ScrollArea>
            </Tabs.Panel>
            <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
            <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
            <Tabs.Panel value="a">Settings</Tabs.Panel>
            <Tabs.Panel value="b">Settings</Tabs.Panel>
            <Tabs.Panel value="c">Settings</Tabs.Panel>
            <Tabs.Panel value="d">Settings</Tabs.Panel>
            <Tabs.Panel value="e">Settings</Tabs.Panel>
            <Tabs.Panel value="f">Settings</Tabs.Panel>
            <Tabs.Panel value="g">Settings</Tabs.Panel>
            <Tabs.Panel value="h">Settings</Tabs.Panel>
            <Tabs.Panel value="i">Settings</Tabs.Panel>
            <Tabs.Panel value="j">Settings</Tabs.Panel>
            <Tabs.Panel value="k">Settings</Tabs.Panel>
            <Tabs.Panel value="l">Settings</Tabs.Panel>
            <Tabs.Panel value="m">Settings</Tabs.Panel>
            <Tabs.Panel value="n">Settings</Tabs.Panel>
            <Tabs.Panel value="o">Settings</Tabs.Panel>
            <Tabs.Panel value="p">Settings</Tabs.Panel>
            <Tabs.Panel value="q">Settings</Tabs.Panel>
            <Tabs.Panel value="r">Settings</Tabs.Panel>
            <Tabs.Panel value="s">Settings</Tabs.Panel>
            <Tabs.Panel value="t">Settings</Tabs.Panel>
            <Tabs.Panel value="u">Settings</Tabs.Panel>
            <Tabs.Panel value="v">Settings</Tabs.Panel>
          </Tabs>
          <UnstyledButton
            onClick={close}
            h={57}
            w={36}
            aria-label="关闭"
            sx={{ textAlign: 'center', color: '#4E5058', marginTop: 12 }}
          >
            <Flex
              justify="center"
              align="center"
              color="dimmed"
              sx={{
                borderColor: '#4E5058',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: '50%',
                width: '36px',
                height: '36px'
              }}
            >
              <svg
                aria-hidden="true"
                role="img"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                ></path>
              </svg>
            </Flex>

            <Text size="xs">ESC</Text>
          </UnstyledButton>
        </Container>
      </Modal>
    </>
  )
}
