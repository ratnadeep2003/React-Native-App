import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';

import { ThemeProvider } from './src/theme/ThemeContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {

  const publishableKey = 'pk_test_51TiuvoB6acVRWcSAK4mQ0JazdyhUcSHahJuWNWgjiwU9BaqxkHe7twxaWzDLR3z6Av9fMu7jX4vjtzGfw64357VW00FgBufIH8';

  return (
    <StripeProvider
      publishableKey={publishableKey}
      urlScheme="myapp"
    >
      <ThemeProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <RootNavigator />
        </SafeAreaView>
      </ThemeProvider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1117',
  },
});