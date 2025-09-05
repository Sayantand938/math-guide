import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Sun, Moon, Home } from 'lucide-react';

type Theme = 'light' | 'dark';

const Header = () => {
  // Initialize state from localStorage or system preference.
  // This function runs only once when the component is first created.
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      return storedTheme;
    }
    // If no theme is stored, default to the user's system preference.
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // This effect runs whenever the `theme` state changes.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Save the current theme choice to localStorage.
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="flex justify-between items-center mb-8 gap-4">
      <div className="flex-1">
         <Button asChild variant="outline" size="sm">
            <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Home
            </Link>
         </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={toggleTheme} variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;