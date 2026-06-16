import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface AlertProps {
  label: string;
  color: string;
}

export const Alert = ({ label, color }: AlertProps) => {
  const { fontFamily, fontSize } = useTheme();

  const styles = StyleSheet.create({
    alert: {
      padding: 14,
      borderRadius: 8,
      borderLeftWidth: 4,
      marginBottom: 12,
      backgroundColor: color + '18',
      borderLeftColor: color,
    },
    text: { fontSize: fontSize - 1, fontWeight: '500', fontFamily, color: color },
  });

  return (
    <View style={styles.alert}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};