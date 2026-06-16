import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Screens
import HomeScreen from '../features/portal/screens/HomeScreen';
import ComponentLibraryScreen from '../features/portal/screens/ComponentLibraryScreen';
import ThemeSettingsScreen from '../features/portal/screens/ThemeSettingsScreen';
import AboutScreen from '../features/portal/screens/AboutScreen';
import { LoginScreen } from '../features/authentication/screens/LoginScreen';
import { SignupScreen } from '../features/authentication/screens/SignupScreen';

const SCREENS: Record<string, React.ComponentType<any>> = {
  Home: HomeScreen,
  Components: ComponentLibraryScreen,
  Theme: ThemeSettingsScreen,
  About: AboutScreen,
};

export const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<'Login' | 'Signup'>('Login');
  const [activeScreen, setActiveScreen] = useState('Home');

  const ActiveComponent = SCREENS[activeScreen] || HomeScreen;

  if (!isAuthenticated) {
    if (authScreen === 'Signup') {
      return <SignupScreen onSignup={() => setIsAuthenticated(true)} onNavigateToLogin={() => setAuthScreen('Login')} />;
    }
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} onNavigateToSignup={() => setAuthScreen('Signup')} />;
  }

  return (
    <View style={styles.root}>
      <Header activeScreen={activeScreen} onNavigate={setActiveScreen} onLogout={() => setIsAuthenticated(false)} />
      <View style={styles.body}>
        <ActiveComponent onNavigate={setActiveScreen} />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1 },
});