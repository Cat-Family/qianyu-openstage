import { useEffect } from 'react'
import { Navbar, ScrollArea } from '@mantine/core'
import {
  IconNotes,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconBuildingStore
} from '@tabler/icons-react'
import useStyles from './Navbar.styles'
import { useLocation } from 'react-router-dom'
import { UserButton } from '../../UserButton/UserButton'
import { LinksGroup } from '../../NavbarLinksGroup/NavbarLinksGroup'

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, href: '/' },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [{ label: 'Overview', link: '/caretakers' }]
  },
  { label: 'Store', icon: IconBuildingStore, href: '/stores' },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments }
]

export default function NavbarSegmented({ opened }: any) {
  const location = useLocation()
  const { classes, cx } = useStyles()
  const links = mockdata.map(item => <LinksGroup key={item.label} {...item} />)
  useEffect(() => {}, [location])
  return (
    <>
      <Navbar className={cx(classes.navbar, { [classes.opened]: opened })}>
        <Navbar.Section
          grow
          component={ScrollArea}
          mx="-xs"
          px="xs"
          className={classes.body}
        >
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <UserButton
            image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            name="Ann Nullpointer"
            email="anullpointer@yahoo.com"
          />
        </Navbar.Section>
      </Navbar>
    </>
  )
}
