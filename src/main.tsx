import { Layout } from '@templates/Layout/Layout.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <Layout>
        <App />
      </Layout>
    </MantineProvider>
  </React.StrictMode>
)
