import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
// 1. Make sure the import uses exact curly braces
import { authService } from '../services/authService'; 

interface SignupProps {
  onSignup: () => void;
  onNavigateToLogin: () => void;
}

export const SignupScreen = ({ onSignup, onNavigateToLogin }: SignupProps) => {
  const { theme, fontFamily, fontSize } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) { 
      setError('All fields are required.'); 
      return; 
    }
    try {
      setError('');
      // 2. CRITICAL: Call it directly as an independent function module. 
      // Do NOT type 'this.authService' or 'this.state.authService'.
      const res = await authService.saveUser(email, name, password); 
      
      if (res.success) {
        onSignup();
      } else {
        setError(res.error || 'Failed to save configuration');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { fontFamily, color: theme.text, fontSize: fontSize + 12 }]}>Create Account</Text>
      <Input label="Full Name" placeholder="John Doe" value={name} onChangeText={setName} />
      <Input label="Email Address" placeholder="name@domain.com" value={email} onChangeText={setEmail} />
      <Input label="Password" placeholder="Minimum 6 characters" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={{ color: theme.danger, textAlign: 'center', marginBottom: 10 }}>{error}</Text> : null}
      <Button label="Sign Up" onPress={handleSignup} />
      <Button label="Back to Login" variant="accent" onPress={onNavigateToLogin} style={{ marginTop: 12 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontWeight: '800', textAlign: 'center', marginBottom: 32 },
});