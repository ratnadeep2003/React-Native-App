export interface FontValue {
  label: string;
  value: string | undefined;
}

export interface SizeValue {
  label: string;
  base: number;
}

export const fontFamilies: Record<string, FontValue> = {
  system: { label: 'System Default', value: undefined },
  mono: { label: 'Monospace', value: 'Courier New' },
  serif: { label: 'Serif', value: 'Georgia' },
};

export const fontSizes: Record<string, SizeValue> = {
  small: { label: 'Small', base: 13 },
  medium: { label: 'Medium', base: 15 },
  large: { label: 'Large', base: 17 },
};

export const layoutTokens = {
  radii: {
    button: 10,
    card: 14,
    input: 8,
  },
};