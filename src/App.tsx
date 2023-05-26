import { BrowserRouter } from 'react-router-dom'
import { Text } from '@mantine/core'

import Layout from './components/Layout/Layout'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <BrowserRouter>
      <Layout location={window.location} />
    </BrowserRouter>
  )
}

export default App
