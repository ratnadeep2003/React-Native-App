import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface CardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  style?: ViewStyle;
}

export const Card = ({ title, description, children, style }: CardProps) => {
  const { theme, fontFamily, fontSize, radii } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: radii.card,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 14,
    },
    title: { fontSize: fontSize + 2, fontWeight: '700', color: theme.text, fontFamily, marginBottom: 4 },
    sub: { fontSize: fontSize - 1, color: theme.subtext, fontFamily, lineHeight: fontSize * 1.5 },
  });

  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.sub}>{description}</Text>}
      {children}
    </View>
  );
};