import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Background colors
      primary: isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
        : 'bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200',
      
      // Text colors
      text: {
        primary: isDarkMode ? 'text-white' : 'text-gray-900',
        secondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
        tertiary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
        accent: isDarkMode ? 'text-blue-300' : 'text-blue-700',
        muted: isDarkMode ? 'text-blue-200/70' : 'text-blue-600/80'
      },
      
      // Glass morphism and card backgrounds
      glass: {
        primary: isDarkMode 
          ? 'backdrop-blur-lg bg-white/5 border border-white/10' 
          : 'backdrop-blur-lg bg-white/80 border border-gray-200/60 shadow-lg',
        secondary: isDarkMode 
          ? 'backdrop-blur-sm bg-white/5' 
          : 'backdrop-blur-sm bg-white/60',
        hover: isDarkMode 
          ? 'bg-white/10 border-white/20' 
          : 'bg-white/90 border-gray-300/80'
      },
      
      // Border and accent colors
      border: {
        primary: isDarkMode ? 'border-blue-400' : 'border-blue-600',
        secondary: isDarkMode ? 'border-white/10' : 'border-gray-300/60'
      },
      
      // Gradient colors for text and elements
      gradient: {
        text: isDarkMode 
          ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text'
          : 'bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text',
        textLight: isDarkMode 
          ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text'
          : 'bg-gradient-to-r from-blue-600 to-cyan-700 text-transparent bg-clip-text'
      }
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};