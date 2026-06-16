import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';

export default function AboutScreen() {
  const { theme, fontFamily, fontSize } = useTheme();

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { padding: 20 },
    
    // Top Row Metrics matching the structural design of before
    statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
    statCard: { flex: 1, backgroundColor: theme.surface, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: theme.border },
    statValue: { fontSize: fontSize + 10, fontWeight: '800', color: theme.text, fontFamily },
    statLabel: { fontSize: fontSize - 3, color: theme.subtext, fontFamily, textTransform: 'uppercase', marginTop: 2 },
    
    // Section Headers
    sectionLabel: { fontSize: fontSize - 1, fontWeight: '700', color: theme.primary, fontFamily, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
    
    // Main Descriptive Content Card
    aboutCard: { backgroundColor: theme.card, padding: 20, borderRadius: 14, borderWidth: 1, borderColor: theme.border, marginBottom: 20 },
    cardTitle: { fontSize: fontSize + 4, fontWeight: '800', color: theme.text, fontFamily, marginBottom: 10 },
    cardBody: { fontSize: fontSize, color: theme.subtext, fontFamily, lineHeight: 22 },
    
    // Core Architecture Points Grid
    bulletRow: { backgroundColor: theme.surface, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: theme.border, marginBottom: 8 },
    bulletTitle: { fontSize: fontSize, fontWeight: '700', color: theme.text, fontFamily, marginBottom: 2 },
    bulletDescription: { fontSize: fontSize - 2, color: theme.subtext, fontFamily }
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        
        {/* Structural Metrics Top Summary */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>v1.0.0</Text>
            <Text style={styles.statLabel}>Engine Build Version</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: theme.primary }]}>Stable</Text>
            <Text style={styles.statLabel}>Architecture State</Text>
          </View>
        </View>

        {/* Primary Narrative Context */}
        <Text style={styles.sectionLabel}>Core Manifesto</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.cardTitle}>About Enterprise Architecture</Text>
          <Text style={styles.cardBody}>
            This application enforces strict DRY (Don't Repeat Yourself) guidelines and Single Source of Truth metrics. 
            All background modules are isolated cleanly to guarantee frictionless horizontal scaling, modular maintainability, 
            and fluid cross-platform interface response.
          </Text>
        </View>

        {/* Architectural Highlights Breakdown */}
        <Text style={styles.sectionLabel}>Blueprint Specifications</Text>
        
        <View style={styles.bulletRow}>
          <Text style={styles.bulletTitle}>⚡ Fully Typed Interfaces</Text>
          <Text style={styles.bulletDescription}>TypeScript definitions prevent compile-time drift across states.</Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletTitle}>🎨 Tokenized Theme Engine</Text>
          <Text style={styles.bulletDescription}>Context-driven wrappers seamlessly adjust branding and style properties.</Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletTitle}>📦 Isolated Feature Scopes</Text>
          <Text style={styles.bulletDescription}>Domain structures encapsulate authentication and utilities separately.</Text>
        </View>

      </View>
    </ScrollView>
  );
}