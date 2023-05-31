import { randomId, useMediaQuery } from '@mantine/hooks'
import { NAVBAR_BREAKPOINT } from './Navbar/Navbar.styles'
import { Button, Text, em, rem } from '@mantine/core'
import { ModalsProvider, ContextModalProps } from '@mantine/modals'
import {
  shouldExcludeHeader,
  shouldExcludeNavbar
} from '../../settings/exclude-layout'
import useStyles from './Layout.styles'
import { useEffect, useRef, useState } from 'react'
import {
  SpotlightAction,
  SpotlightProvider,
  useSpotlight
} from '@mantine/spotlight'
import {
  IconDashboard,
  IconFileText,
  IconHome,
  IconSearch
} from '@tabler/icons-react'
import { Notifications } from '@mantine/notifications'
import Header from './Header/Header'
import Navbar from './Navbar/Navbar'
import { Footer } from '../Footer/Footer'
import { useLocation, useOutlet } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './styles.css'

const demonstrationModal = ({
  context,
  id,
  innerProps
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
)

const actions: SpotlightAction[] = [
  {
    title: 'Home',
    description: 'Get to home page',
    onTrigger: () => console.log('Home'),
    icon: <IconHome size="1.2rem" />
  },
  {
    title: 'Dashboard',
    description: 'Get full information about current system status',
    onTrigger: () => console.log('Dashboard'),
    icon: <IconDashboard size="1.2rem" />
  },
  {
    title: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onTrigger: () => console.log('Documentation'),
    icon: <IconFileText size="1.2rem" />
  }
]

// Separate component to allow calling useSpotlight hook.
function AutoOpenSpolight() {
  const spolight = useSpotlight()

  const searchParams = new URLSearchParams(window.location.search)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (params.has('searchParamName')) {
      spolight.openSpotlight()
    }
  }, [])

  return null
}

export function Layout() {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const nodeRef = useRef(null)
  const searchParams = new URLSearchParams(window.location.search)
  const navbarCollapse = useMediaQuery(`(max-width: ${em(NAVBAR_BREAKPOINT)})`)
  const shouldRenderHeader = !shouldExcludeHeader(location.pathname)
  const shouldRenderNavbar =
    !shouldExcludeNavbar(location.pathname) || navbarCollapse
  const { classes, cx } = useStyles({ shouldRenderHeader })
  const [navbarOpened, setNavbarState] = useState(false)
  const [spotlightQuery, setSpotlightQuery] = useState('')

  useEffect(() => {
    setSpotlightQuery(
      new URLSearchParams(searchParams).get('searchParamName') || ''
    )
  }, [])

  useEffect(() => {
    setNavbarState(false)
  }, [location.pathname])

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size="1.2rem" />}
      searchPlaceholder="Search..."
      shortcut={['mod + K', 'mod + P', '/']}
      highlightQuery
      query={spotlightQuery}
      onQueryChange={setSpotlightQuery}
      searchInputProps={{
        id: randomId(),
        name: randomId(),
        autoComplete: 'off'
      }}
      transitionProps={{
        duration: 150,
        transition: {
          in: { transform: 'translateY(0)', opacity: 1 },
          out: { transform: `translateY(-${rem(20)}), opacity: 0` },
          transitionProperty: 'transform, opacity'
        }
      }}
    >
      <Notifications />
      <AutoOpenSpolight />
      <div
        className={cx({
          [classes.withNavbar]: shouldRenderNavbar,
          [classes.withoutHeader]: !shouldRenderHeader
        })}
      >
        {shouldRenderHeader && (
          <Header
            navbarOpened={navbarOpened}
            toggleNavbar={() => setNavbarState(o => !o)}
          />
        )}
        {shouldRenderNavbar && (
          <Navbar opened={navbarOpened} onClose={() => setNavbarState(false)} />
        )}
        <main className={classes.main}>
          <div className={classes.content}>
            <ModalsProvider
              labels={{ confirm: 'Confirm', cancel: 'Cancel' }}
              modals={{ demonstration: demonstrationModal }}
            >
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames="page"
                  unmountOnExit
                >
                  <div ref={nodeRef} className={classes.page}>
                    {currentOutlet}
                  </div>
                </CSSTransition>
              </SwitchTransition>
              <Footer withNavbar />
            </ModalsProvider>
          </div>
        </main>
      </div>
    </SpotlightProvider>
  )
}
