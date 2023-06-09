import {
  createStyles,
  MantineTheme,
  rem,
  em,
  getStylesRef
} from '@mantine/core'
import { HEADER_HEIGHT } from '../Header/HeaderDesktop.styles'

export const NAVBAR_WIDTH = 260
export const NAVBAR_BREAKPOINT = 760

export default createStyles((theme: MantineTheme) => ({
  navbar: {
    boxSizing: 'border-box',
    height: '100vh',
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    position: 'fixed',
    zIndex: 5,
    top: 0,
    bottom: 0,
    left: 0,
    width: rem(NAVBAR_WIDTH),

    [`@media (max-width: ${em(NAVBAR_BREAKPOINT)})`]: {
      display: 'none'
    }
  },

  opened: {
    [`@media (max-width: ${em(NAVBAR_BREAKPOINT)})`]: {
      display: 'block',
      width: '100%',
      right: 0
    }
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing.md,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    paddingLeft: theme.spacing.md,
    paddingTop: `calc(${rem(HEADER_HEIGHT)} + ${theme.spacing.md})`,

    [`@media (max-width: ${em(NAVBAR_BREAKPOINT)})`]: {
      paddingBottom: rem(120)
    }
  },

  title: {
    textTransform: 'uppercase',
    letterSpacing: rem(-0.25)
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black
      }
    }
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color
      }
    }
  },

  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md
  }
}))
