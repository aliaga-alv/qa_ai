import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { router } from './router';
import { useThemeStore } from './stores/themeStore';
import './styles/globals.css';

// TanStack Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
      gcTime: 10 * 60 * 1000, // 10 minutes - cache garbage collection (renamed from cacheTime)
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch on window focus by default
      refetchOnReconnect: true, // Refetch on reconnect
    },
    mutations: {
      retry: 0, // Don't retry mutations by default
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  </StrictMode>
);
