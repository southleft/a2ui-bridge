import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';

// Mantine styles - MUST be imported
import '@mantine/core/styles.css';

import { Landing } from './components/Landing';
import { Demo } from './components/Demo';
import './index.css';

// Minimal theme with reduced visual noise
const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  defaultRadius: 'sm',
  components: {
    Card: {
      defaultProps: {
        shadow: 'none',
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'none',
      },
    },
    Button: {
      defaultProps: {
        radius: 'sm',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
