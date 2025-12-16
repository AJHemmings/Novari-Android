// Bottom tab navigation
// Instagram-style tabs: Home, Embers, Communities, DMs, Profile
// Each tab has its own Stack navigator for screen hierarchy

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import EmbersScreen from '../screens/EmbersScreen';
import EmbersDetailScreen from '../screens/EmbersDetailScreen';
import CommunitiesScreen from '../screens/CommunitiesScreen';
import DmsScreen from '../screens/DmsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const EmbersStack = createStackNavigator();
const CommunitiesStack = createStackNavigator();
const DmsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

/**
 * Home stack navigator
 * Nested stack for Home-related screens
 */
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

/**
 * Embers stack navigator
 * Has EmbersList and EmberDetail as nested screens
 */
function EmbersStackNavigator() {
  return (
    <EmbersStack.Navigator>
      <EmbersStack.Screen
        name="EmbersList"
        component={EmbersScreen}
        options={{ title: 'Embers' }}
      />
      <EmbersStack.Screen
        name="EmberDetail"
        component={EmbersDetailScreen}
        options={({ route }) => ({
          title: route.params?.emberTitle || 'Ember',
        })}
      />
    </EmbersStack.Navigator>
  );
}

function CommunitiesStackNavigator() {
  return (
    <CommunitiesStack.Navigator>
      <CommunitiesStack.Screen
        name="CommunitiesList"
        component={CommunitiesScreen}
        options={{ headerShown: false }}
      />
    </CommunitiesStack.Navigator>
  );
}

function DmsStackNavigator() {
  return (
    <DmsStack.Navigator>
      <DmsStack.Screen
        name="DmsList"
        component={DmsScreen}
        options={{ headerShown: false }}
      />
    </DmsStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

/**
 * Main bottom tab navigator
 * How to add a new tab:
 * 1. Create new screen component (e.g., src/screens/NewScreen.js)
 * 2. Create stack navigator above (NewStackNavigator)
 * 3. Add Tab.Screen below with name, component, and icon
 */
export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        // Make tab bar look like Instagram
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Embers"
        component={EmbersStackNavigator}
        options={{
          tabBarLabel: 'Embers',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>🔥</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Communities"
        component={CommunitiesStackNavigator}
        options={{
          tabBarLabel: 'Communities',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>👥</Text>
          ),
        }}
      />

      <Tab.Screen
        name="DMs"
        component={DmsStackNavigator}
        options={{
          tabBarLabel: 'DMs',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>💬</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
