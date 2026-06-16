import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { themes } from '../../../theme/colors';
import { fontFamilies, fontSizes } from '../../../theme/tokens';

export default function ThemeSettingsScreen() {
  const { theme, fontFamily, fontSize, activeTheme, setActiveTheme, activeFont, setActiveFont, activeFontSize, setActiveFontSize } = useTheme();

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { padding: 20 },
    heading: { fontSize: fontSize, fontWeight: '700', color: theme.primary, fontFamily, marginTop: 20, marginBottom: 10, textTransform: 'uppercase' },
    pill: { padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 8, backgroundColor: theme.surface, borderColor: theme.border },
    pillActive: { backgroundColor: theme.primary, borderColor: theme.primary },
    text: { fontSize: fontSize, color: theme.text, fontFamily },
    textActive: { color: '#ffffff', fontWeight: '700' },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.heading}>Branding Palette</Text>
        {Object.keys(themes).map(key => (
          <TouchableOpacity key={key} style={[styles.pill, activeTheme === key && styles.pillActive]} onPress={() => setActiveTheme(key)}>
            <Text style={[styles.text, activeTheme === key && styles.textActive]}>{themes[key].name}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.heading}>Typography Mapping</Text>
        {Object.keys(fontFamilies).map(key => (
          <TouchableOpacity key={key} style={[styles.pill, activeFont === key && styles.pillActive]} onPress={() => setActiveFont(key)}>
            <Text style={[styles.text, activeFont === key && styles.textActive, { fontFamily: fontFamilies[key].value }]}>{fontFamilies[key].label}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.heading}>System Scale Mapping</Text>
        {Object.keys(fontSizes).map(key => (
          <TouchableOpacity key={key} style={[styles.pill, activeFontSize === key && styles.pillActive]} onPress={() => setActiveFontSize(key)}>
            <Text style={[styles.text, activeFontSize === key && styles.textActive]}>{fontSizes[key].label} ({fontSizes[key].base}px)</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}