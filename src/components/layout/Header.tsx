import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface HeaderProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const NAV_LINKS = ['Home', 'Components', 'Theme', 'About'];

export default function Header({ activeScreen, onNavigate, onLogout }: HeaderProps) {
  const { theme, fontFamily, fontSize } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const styles = StyleSheet.create({
    header: {
      backgroundColor: theme.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 12,
      zIndex: 100,
    },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    logo: { fontSize: fontSize + 4, fontWeight: '700', color: theme.primary, fontFamily },
    logoAccent: { color: theme.accent },
    hamburger: { padding: 6, gap: 4 },
    bar: { width: 22, height: 2, backgroundColor: theme.text, borderRadius: 2 },
    dropdown: { marginTop: 12, borderTopWidth: 1, borderTopColor: theme.border, paddingTop: 8 },
    navItem: { paddingVertical: 12 },
    navText: { fontSize: fontSize, color: theme.subtext, fontFamily, fontWeight: '500' },
    navTextActive: { color: theme.primary, fontWeight: '700' },
  });

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Text style={styles.logo}>Component<Text style={styles.logoAccent}>Vault</Text></Text>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.hamburger}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </TouchableOpacity>
      </View>
      {menuOpen && (
        <View style={styles.dropdown}>
          {NAV_LINKS.map(link => (
            <TouchableOpacity key={link} style={styles.navItem} onPress={() => { onNavigate(link); setMenuOpen(false); }}>
              <Text style={[styles.navText, activeScreen === link && styles.navTextActive]}>{link}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.navItem} onPress={() => { setMenuOpen(false); onLogout(); }}>
            <Text style={[styles.navText, { color: theme.danger }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}