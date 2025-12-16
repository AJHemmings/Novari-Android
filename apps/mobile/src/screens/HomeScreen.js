// Home Screen
// Shows:
// - Login streak summary
// - Task completion streak summary
// - Lifetime completed task count
// - Recommended ember/task preview

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useStreakSummary } from '../hooks/useStreakSummary';
import { useEmbers } from '../hooks/useEmbers';
import { useAuthStore } from '../store/authStore';
import apiClient from '../api/client';

export default function HomeScreen() {
  const { data: streaks, isLoading: streaksLoading } = useStreakSummary();
  const { data: embers, isLoading: embersLoading } = useEmbers();
  const logout = useAuthStore((state) => state.logout);

  // On component mount, ping login streak
  useEffect(() => {
    const recordLogin = async () => {
      try {
        await apiClient.post('/streaks/login-ping', {});
      } catch (error) {
        console.log('Login ping failed:', error);
      }
    };

    recordLogin();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (streaksLoading || embersLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔥 Novari Remastered</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Login Streak Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Login Streak</Text>
        <Text style={styles.streakNumber}>
          {streaks?.loginStreak?.current || 0}
        </Text>
        <Text style={styles.streakLabel}>Current Streak Days</Text>
        <Text style={styles.streakDetail}>
          Best: {streaks?.loginStreak?.best || 0} days
        </Text>
      </View>

      {/* Task Completion Streak Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>✅ Task Completion Streak</Text>
        <Text style={styles.streakNumber}>
          {streaks?.taskStreak?.current || 0}
        </Text>
        <Text style={styles.streakLabel}>Current Streak Days</Text>
        <Text style={styles.streakDetail}>
          Best: {streaks?.taskStreak?.best || 0} days
        </Text>
      </View>

      {/* Lifetime Tasks Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 Lifetime Progress</Text>
        <Text style={styles.lifetimeNumber}>
          {streaks?.lifetimeCompletedTasks || 0}
        </Text>
        <Text style={styles.streakLabel}>Tasks Completed</Text>
      </View>

      {/* Recommended Ember */}
      {embers && embers.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💡 Start an Ember</Text>
          {embers.slice(0, 3).map((ember) => (
            <View key={ember.id} style={styles.emberItem}>
              <Text style={styles.emberIcon}>{ember.icon}</Text>
              <Text style={styles.emberTitle}>{ember.title}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  streakLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  streakDetail: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  lifetimeNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  emberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  emberIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  emberTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  spacer: {
    height: 40,
  },
});
