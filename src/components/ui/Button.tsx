import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'accent';
  style?: ViewStyle;
}

export const Button = ({ label, onPress, variant = 'primary', style }: ButtonProps) => {
  const { theme, fontFamily, fontSize, radii } = useTheme();

  const styles = StyleSheet.create({
    btn: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: radii.button,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: variant === 'accent' ? theme.accent : theme.primary,
    },
    text: {
      fontSize: fontSize,
      fontWeight: '700',
      fontFamily,
      color: '#ffffff',
    },
  });

  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};