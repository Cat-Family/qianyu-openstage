import { createStyles, rem } from '@mantine/core'

export default createStyles(theme => {
  console.log(theme.colorScheme)
  return {
    content: {
      height: '100vh',
      paddingTop: rem(20),
      minHeight: `calc(100vh - ${rem(350)})`,
      position: 'relative',
      zIndex: 1,
      backgroundColor: theme.colorScheme === 'dark' ? theme.black : theme.white,
      boxShadow: theme.colorScheme === 'dark' ? 'none' : theme.shadows.sm,
      paddingBottom: rem(80)
    }
  }
})
