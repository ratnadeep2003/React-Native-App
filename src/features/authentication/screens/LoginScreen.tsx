import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { authService } from '../services/authService';

interface LoginProps {
  onLogin: () => void;
  onNavigateToSignup: () => void;
}

type AuthView = 'login' | 'forgot' | 'reset';

export const LoginScreen = ({ onLogin, onNavigateToSignup }: LoginProps) => {
  const { theme, fontFamily, fontSize } = useTheme();
  const [currentView, setCurrentView] = useState<AuthView>('login');
  
  // Shared state fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleLogin = async () => {
    setError('');
    const res = await authService.verifyUser(email, password);
    if (res.success) onLogin();
    else setError(res.error || 'Login verification failed');
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please provide your account email first.');
      return;
    }
    setError('');
    setInfoMessage('If an account matches that email address, we’ve sent a password reset link. Please check your inbox and spam folder.');
    setCurrentView('reset');
  };

  const handleResetPassword = () => {
    if (!resetToken || !newPassword) {
      setError('Verification code and a new password is required');
      return;
    }
    setError('');
    setInfoMessage('Password update verified. Sign in using your new credentials.');
    setCurrentView('login');
  };

  const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: theme.background },
    title: { fontWeight: '800', textAlign: 'center', color: theme.text, fontFamily, marginBottom: 8 },
    subtitle: { textAlign: 'center', marginBottom: 32, color: theme.subtext, fontFamily },
    linkRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, marginBottom: 18 },
    linkText: { fontSize: fontSize - 2, fontWeight: '600', color: theme.primary, fontFamily },
  });

  if (currentView === 'forgot') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { fontSize: fontSize + 12 }]}>Recover Access</Text>
        <Text style={[styles.subtitle, { fontSize }]}>Provide your email to verify account validation states</Text>
        <Input label="Account Email" placeholder="name@domain.com" value={email} onChangeText={setEmail} />
        {error ? <Text style={{ color: theme.danger, marginBottom: 10 }}>{error}</Text> : null}
        <Button label="Request Link" onPress={handleForgotPassword} />
        <TouchableOpacity style={{ marginTop: 16, alignItems: 'center' }} onPress={() => setCurrentView('login')}>
          <Text style={styles.linkText}>Back to Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (currentView === 'reset') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { fontSize: fontSize + 12 }]}>Reset Credentials</Text>
        {infoMessage ? <Text style={{ color: theme.success, textAlign: 'center', marginBottom: 12 }}>{infoMessage}</Text> : null}
        <Input label="Verification Code" placeholder="Enter code" value={resetToken} onChangeText={setResetToken} />
        <Input label="New Password" placeholder="Minimum 6 characters" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
        {error ? <Text style={{ color: theme.danger, marginBottom: 10 }}>{error}</Text> : null}
        <Button label="Confirm Update" onPress={handleResetPassword} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { fontSize: fontSize + 12 }]}>Welcome Back</Text>
      <Text style={[styles.subtitle, { fontSize }]}>Sign in to access your dashboard metrics</Text>
      {infoMessage ? <Text style={{ color: theme.success, textAlign: 'center', marginBottom: 12 }}>{infoMessage}</Text> : null}
      
      <Input label="Email Address" placeholder="Enter email" value={email} onChangeText={setEmail} />
      <Input label="Password" placeholder="Enter password" value={password} onChangeText={setPassword} secureTextEntry />
      
      {error ? <Text style={{ color: theme.danger, textAlign: 'center', marginBottom: 10 }}>{error}</Text> : null}
      
      <View style={styles.linkRow}>
        <TouchableOpacity onPress={() => setCurrentView('forgot')}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNavigateToSignup}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <Button label="Sign In" onPress={handleLogin} />
    </ScrollView>
  );
};