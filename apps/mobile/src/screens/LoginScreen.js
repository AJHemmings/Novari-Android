// Login Screen
// User enters email + password
// Calls /api/v1/auth/login
// On success: navigate to Home, store token in secure storage
// On error: show error message

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import apiClient from '../api/client';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('demo@novari.dev');
  const [password, setPassword] = useState('DemoPass123!');
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  /**
   * Handle login
   * POST /api/v1/auth/login
   * On success: store tokens and navigate to Home
   */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      // Store auth in Zustand
      setAuth(response.user, response.accessToken, response.refreshToken);

      // TODO: Store tokens in secure storage
      // import * as SecureStore from 'expo-secure-store';
      // await SecureStore.setItemAsync('accessToken', response.accessToken);
      // await SecureStore.setItemAsync('refreshToken', response.refreshToken);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Novari Remastered</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!isLoading}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#FF6B35" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Don't have an account? Register</Text>
          </TouchableOpacity>

          <Text style={styles.demoText}>Demo: demo@novari.dev / DemoPass123!</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: '#FF6B35',
    textAlign: 'center',
    fontSize: 14,
  },
  demoText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
});
