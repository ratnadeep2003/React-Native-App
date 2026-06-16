import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { Alert } from '../../../components/ui/Alert';

export default function ComponentLibraryScreen() {
  const { theme, fontFamily, fontSize } = useTheme();
  const [testInput, setTestInput] = useState('');

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { padding: 20 },
    label: { fontSize: fontSize, fontWeight: '700', color: theme.primary, fontFamily, marginTop: 24, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
    row: { flexDirection: 'row', gap: 10 },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.label}>Buttons</Text>
        <View style={styles.row}>
          <Button label="Primary Button" onPress={() => {}} />
          <Button label="Accent Variant" variant="accent" onPress={() => {}} />
        </View>

        <Text style={styles.label}>Cards Primitives</Text>
        <Card title="Dynamic Native Card" description="This container scales using design system rules safely." />

        <Text style={styles.label}>Form Components</Text>
        <Input placeholder="Type inside atomic block..." value={testInput} onChangeText={setTestInput} />

        <Text style={styles.label}>System Alerts</Text>
        <Alert label="✓ Operational workflow verified." color={theme.success} />
        <Alert label="✕ Fault detection threshold crossed." color={theme.danger} />
      </View>
    </ScrollView>
  );
}