
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'elegant-blue' | 'fresh-green' | 'youthful-purple' | 'sunny-orange' | 'classic-black-gold';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: {
    id: ThemeType;
    name: string;
    description: string;
    psychology: string;
    primary: string;
    gradient: string;
  }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = [
  {
    id: 'elegant-blue' as ThemeType,
    name: 'Elegant Blue',
    description: 'Trust & Focus',
    psychology: 'Perfect for corporate events and weddings',
    primary: '#2563EB',
    gradient: 'from-blue-600 to-blue-400'
  },
  {
    id: 'fresh-green' as ThemeType,
    name: 'Fresh Green',
    description: 'Calming & Natural',
    psychology: 'Ideal for family gatherings and relaxed dining',
    primary: '#059669',
    gradient: 'from-emerald-600 to-green-400'
  },
  {
    id: 'youthful-purple' as ThemeType,
    name: 'Youthful Purple',
    description: 'Creative & Exciting',
    psychology: 'Great for parties and younger audiences',
    primary: '#7C3AED',
    gradient: 'from-purple-600 to-violet-400'
  },
  {
    id: 'sunny-orange' as ThemeType,
    name: 'Sunny Orange',
    description: 'Energy & Friendliness',
    psychology: 'Boosts appetite and encourages action',
    primary: '#EA580C',
    gradient: 'from-orange-600 to-amber-400'
  },
  {
    id: 'classic-black-gold' as ThemeType,
    name: 'Classic Black & Gold',
    description: 'Luxury & Premium',
    psychology: 'Perfect for high-end events and fine dining',
    primary: '#D97706',
    gradient: 'from-amber-600 to-yellow-400'
  }
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('elegant-blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('dinevibe-theme') as ThemeType;
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dinevibe-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
