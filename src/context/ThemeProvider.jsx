import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext.js';

const STORAGE_KEY = 'theme';

function getSavedTheme() {
  try {
    if (localStorage.getItem(STORAGE_KEY) === 'dark') {
      return 'dark';
    } else {
      return 'light';
    }
  } catch {
    return 'light';
  }
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getSavedTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

export default ThemeProvider;