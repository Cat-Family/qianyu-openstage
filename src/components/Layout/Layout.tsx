import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  createEmotionCache,
  Global,
  Text
} from '@mantine/core'
import rtlPlugin from 'stylis-plugin-rtl'
import { LayoutInner, LayoutProps } from './LayoutInner'
import { useEffect, useState } from 'react'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { DirectionContext } from './DirectionContext'
import { Footer } from '../Footer/Footer'

const THEME_KEY = 'mantine-color-scheme'

const rtlCache = createEmotionCache({
  key: 'mantine-rtl',
  prepend: true,
  stylisPlugins: [rtlPlugin]
})

export default function Layout({ location }: LayoutProps) {
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const toggleDirection = () =>
    setDir(current => (current === 'ltr' ? 'rtl' : 'ltr'))

  useHotkeys([
    ['mod+J', () => toggleColorScheme()],
    ['mod + shift + L', () => toggleDirection()]
  ])

  useEffect(() => {}, [])

  return (
    <DirectionContext.Provider value={{ dir, toggleDirection }}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            dir,
            colorScheme,
            headings: { fontFamily: 'system-ui' }
          }}
          emotionCache={dir === 'rtl' ? rtlCache : undefined}
        >
          <Global
            styles={theme => ({
              body: {
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[1]
                    : theme.colors.gray[8]
              }
            })}
          />
          <div dir={dir}>
            <LayoutInner location={location}></LayoutInner>
          </div>
        </MantineProvider>
      </ColorSchemeProvider>
    </DirectionContext.Provider>
  )
}
