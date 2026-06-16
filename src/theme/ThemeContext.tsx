import React, { createContext, useContext, useState, ReactNode } from 'react';
import { themes, ThemePalette } from './colors';
import { fontFamilies, fontSizes, layoutTokens } from './tokens';

interface ThemeContextProps {
  theme: ThemePalette;
  fontFamily: string | undefined;
  fontSize: number;
  radii: typeof layoutTokens.radii;
  activeTheme: string;
  setActiveTheme: (name: string) => void;
  activeFont: string;
  setActiveFont: (name: string) => void;
  activeFontSize: string;
  setActiveFontSize: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [activeTheme, setActiveTheme] = useState<string>('default');
  const [activeFont, setActiveFont] = useState<string>('system');
  const [activeFontSize, setActiveFontSize] = useState<string>('medium');

  const theme = themes[activeTheme] || themes.default;
  const fontFamily = fontFamilies[activeFont]?.value;
  const fontSize = fontSizes[activeFontSize]?.base || 15;
  const radii = layoutTokens.radii;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        fontFamily,
        fontSize,
        radii,
        activeTheme,
        setActiveTheme,
        activeFont,
        setActiveFont,
        activeFontSize,
        setActiveFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be inside a ThemeProvider');
  return context;
};