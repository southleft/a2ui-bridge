import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';

// Scroll to top on route change and page load (like traditional page behavior)
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Mantine styles - MUST be imported
import '@mantine/core/styles.css';

import { Landing } from './components/Landing';
import { Demo } from './components/Demo';
import { Learn } from './components/Learn';
import { UseCases } from './components/UseCases';
import { Teams } from './components/Teams';
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
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
