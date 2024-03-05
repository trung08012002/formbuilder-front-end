import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import { Layout } from '@/templates/Layout/Layout.tsx';

import { store } from './providers/redux/store.ts';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <ReduxProvider store={store}>
          <Layout>
            <App />
          </Layout>
        </ReduxProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
