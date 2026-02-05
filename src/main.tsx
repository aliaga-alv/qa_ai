import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './router';
import { useThemeStore } from './stores/themeStore';
import './styles/globals.css';

// Enable accessibility monitoring in development
if (import.meta.env.DEV) {
  import('./lib/a11y-checker').then(({ enableA11yMonitoring }) => {
    enableA11yMonitoring();
  });
}

// Initialize theme before rendering
const theme = useThemeStore.getState().theme;
const resolvedTheme =
  theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : theme;

if (resolvedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" richColors closeButton />
  </StrictMode>
);
