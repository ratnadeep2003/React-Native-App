export interface ThemePalette {
  name: string;
  background: string;
  surface: string;
  card: string;
  primary: string;
  accent: string;
  text: string;
  subtext: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
}

export const themes: Record<string, ThemePalette> = {
  default: {
    name: 'Ocean Dark',
    background: '#0f1117',
    surface: '#1a1d2e',
    card: '#1e2235',
    primary: '#4f8ef7',
    accent: '#7c5cbf',
    text: '#e8eaf6',
    subtext: '#8892b0',
    border: '#2a2f4a',
    success: '#43d9ad',
    warning: '#f5a623',
    danger: '#ff4d6d',
  },
  rose: {
    name: 'Rose Light',
    background: '#fff5f7',
    surface: '#ffffff',
    card: '#fdf0f3',
    primary: '#e91e8c',
    accent: '#ff6b9d',
    text: '#2d1b2e',
    subtext: '#7a5b6a',
    border: '#f0d0da',
    success: '#2ecc71',
    warning: '#f39c12',
    danger: '#e74c3c',
  },
  forest: {
    name: 'Forest Mist',
    background: '#0d1f1a',
    surface: '#122a23',
    card: '#163029',
    primary: '#3ddc97',
    accent: '#a3f7c0',
    text: '#d4f5e5',
    subtext: '#7ab59a',
    border: '#1e4035',
    success: '#3ddc97',
    warning: '#f5c842',
    danger: '#ff6b6b',
  },
  slate: {
    name: 'Slate Classic',
    background: '#f1f5f9',
    surface: '#ffffff',
    card: '#f8fafc',
    primary: '#3b5bdb',
    accent: '#845ef7',
    text: '#1e293b',
    subtext: '#64748b',
    border: '#e2e8f0',
    success: '#0f9b58',
    warning: '#d97706',
    danger: '#dc2626',
  },
};