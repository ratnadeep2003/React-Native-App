import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export default function Footer() {
  const { theme, fontFamily, fontSize } = useTheme();

  const styles = StyleSheet.create({
    footer: { backgroundColor: theme.surface, borderTopWidth: 1, borderTopColor: theme.border, paddingVertical: 16, alignItems: 'center' },
    text: { fontSize: fontSize - 2, color: theme.subtext, fontFamily },
    accent: { color: theme.primary, fontWeight: '600' },
  });

  return (
    <View style={styles.footer}>
      <Text style={styles.text}><Text style={styles.accent}>ComponentVault</Text> · Expo TypeScript Engine</Text>
    </View>
  );
}