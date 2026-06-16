import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
}

export const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, style }: InputProps) => {
  const { theme, fontFamily, fontSize, radii } = useTheme();

  const styles = StyleSheet.create({
    container: { width: '100%', marginBottom: 16 },
    label: { fontSize: fontSize - 2, fontWeight: '600', color: theme.text, fontFamily, marginBottom: 8 },
    input: {
      backgroundColor: theme.surface,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: radii.input,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: fontSize,
      color: theme.text,
      fontFamily,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.subtext}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};