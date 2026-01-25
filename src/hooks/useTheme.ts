import { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';

export const useTheme = () => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useThemeStore();

  // Ensure theme is applied on component mount
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  return {
    // Current theme setting ('light' | 'dark' | 'system')
    theme,

    // Resolved theme ('light' | 'dark')
    resolvedTheme,

    // Set theme explicitly
    setTheme,

    // Toggle between light and dark
    toggleTheme,

    // Convenience flags
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  };
};
