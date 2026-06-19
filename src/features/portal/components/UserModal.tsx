import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Alert, StyleSheet, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { Button } from '../../../components/ui/Button';

interface UserData {
  email: string;
  name: string;
  surname: string;
  password?: string;
}

interface UserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (user: UserData) => void;
  onDelete: (email: string) => void;
  initialData: UserData | null;
  fieldErrors?: Record<string, string[]>;
}

export const UserModal = ({ visible, onClose, onSave, onDelete, initialData, fieldErrors = {} }: UserModalProps) => {
  const { theme, fontFamily, fontSize } = useTheme();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSurname(initialData.surname);
      setEmail(initialData.email);
      setPassword('');
    } else {
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');
    }
  }, [initialData, visible]);

  const handleSave = () => {
    if (!name || !surname || !email || (!initialData && !password)) {
      Alert.alert('Please fill in all required fields.');
      return;
    }
    onSave({ email, name, surname, password: password || undefined });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(initialData!.email) }
      ]
    );
  };

  const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
    modalContainer: { backgroundColor: theme.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: theme.border },
    title: { fontSize: fontSize + 4, fontWeight: '800', color: theme.text, fontFamily, marginBottom: 16, textAlign: 'center' },
    label: { fontSize: fontSize - 2, fontWeight: '700', color: theme.primary, fontFamily, marginBottom: 6, textTransform: 'uppercase' },
    input: {
      backgroundColor: theme.surface,
      color: theme.text,
      fontFamily,
      fontSize: fontSize,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 16,
    },
    inputError: {
      borderColor: '#E24B4A',
      marginBottom: 4,
    },
    errorText: {
      color: '#E24B4A',
      fontSize: fontSize - 3,
      fontFamily,
      marginBottom: 12,
    },
    deleteBtn: {
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E24B4A',
      marginBottom: 12,
    },
    actionRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
    btnFlex: { flex: 1 }
  });

  const firstnameError = fieldErrors.firstname?.[0];
  const surnameError = fieldErrors.surname?.[0];
  const emailError = fieldErrors.email?.[0];
  const passwordError = fieldErrors.password?.[0];

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.modalContainer}>
                <Text style={styles.title}>{initialData ? 'Edit User Credentials' : 'Add New User'}</Text>

                <ScrollView keyboardShouldPersistTaps="handled">
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={[styles.input, firstnameError && styles.inputError]}
                    placeholder="John"
                    placeholderTextColor={theme.subtext}
                    value={name}
                    onChangeText={setName}
                  />
                  {firstnameError && <Text style={styles.errorText}>{firstnameError}</Text>}

                  <Text style={styles.label}>Surname</Text>
                  <TextInput
                    style={[styles.input, surnameError && styles.inputError]}
                    placeholder="Doe"
                    placeholderTextColor={theme.subtext}
                    value={surname}
                    onChangeText={setSurname}
                  />
                  {surnameError && <Text style={styles.errorText}>{surnameError}</Text>}

                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={[styles.input, initialData && { opacity: 0.6 }, emailError && styles.inputError]}
                    placeholder="name@domain.com"
                    placeholderTextColor={theme.subtext}
                    value={email}
                    onChangeText={setEmail}
                    editable={!initialData}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {emailError && <Text style={styles.errorText}>{emailError}</Text>}

                  {!initialData && (
                    <>
                      <Text style={styles.label}>Account Password</Text>
                      <TextInput
                        style={[styles.input, passwordError && styles.inputError]}
                        placeholder="••••••••"
                        placeholderTextColor={theme.subtext}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                      />
                      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                    </>
                  )}

                  {/* Delete button — only shown in Edit mode */}
                  {initialData && (
                    <TouchableWithoutFeedback onPress={handleDelete}>
                      <View style={styles.deleteBtn}>
                        <Text style={{ color: '#E24B4A', fontWeight: '700', fontSize: fontSize - 1, fontFamily }}>🗑 Delete User</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}

                  <View style={styles.actionRow}>
                    <Button label="Cancel" onPress={onClose} variant="accent" style={styles.btnFlex} />
                    <Button label="Save Changes" onPress={handleSave} style={styles.btnFlex} />
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};