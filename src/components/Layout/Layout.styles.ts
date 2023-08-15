import { createStyles, rem, em } from '@mantine/core'
import { HEADER_HEIGHT } from './Header/HeaderDesktop.styles'
import { NAVBAR_WIDTH, NAVBAR_BREAKPOINT } from './Navbar/Navbar.styles'

interface LayoutStyles {
  shouldRenderHeader: boolean
}

export default createStyles((theme, { shouldRenderHeader }: LayoutStyles) => ({
  '@global': {
    '#nprogress': {
      zIndex: 100000
    }
  },

  withNavbar: {
    paddingLeft: rem(NAVBAR_WIDTH),

    [`@media (max-width: ${em(NAVBAR_BREAKPOINT)})`]: {
      paddingLeft: 0
    }
  },

  withoutHeader: {
    '& $main': {
      paddingTop: 0
    }
  },

  main: {
    scrollMarginTop: rem(HEADER_HEIGHT),
    flex: 1,
    // aligns page top most heading with navigation and table of contents
    paddingTop: shouldRenderHeader
      ? `calc(${rem(HEADER_HEIGHT)} - ${theme.spacing.xl} - ${rem(4)})`
      : 0,

    [`@media (max-width: ${em(NAVBAR_BREAKPOINT)})`]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },

  content: {
    minHeight: `calc(100vh - ${rem(280)})`
  },
  page: {
    padding: `${em(45)}  ${theme.spacing.xl} 0`,
    minHeight: shouldRenderHeader
      ? `calc(100vh - ${rem(354)})`
      : `calc(100vh - ${rem(320)})`,
    position: 'relative',
    zIndex: 1,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    boxShadow: theme.colorScheme === 'dark' ? 'none' : theme.shadows.sm,
    paddingBottom: rem(80)
  }
}))
