// Root navigation - handles Auth stack vs App stack
// Conditional navigation: User sees Auth screens until logged in
// Then sees Tab Navigator with app screens

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthStore } from '../store/authStore';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createStackNavigator();

/**
 * Auth stack - shown to unauthenticated users
 * Login and Register screens
 */
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

/**
 * App stack - shown to authenticated users
 * Main app with tabs
 */
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}

/**
 * Root navigation container
 * Conditionally shows auth stack or app stack based on isAuthenticated
 *
 * How authentication flow works:
 * 1. User not logged in -> see AuthStack (Login/Register)
 * 2. User logs in successfully -> authStore.setAuth() called
 * 3. isAuthenticated becomes true -> AppStack rendered
 * 4. User logout -> authStore.logout() called -> back to AuthStack
 */
export function RootNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
