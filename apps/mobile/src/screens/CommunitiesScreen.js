// Communities Screen (Placeholder)

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommunitiesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Communities</Text>
      <Text style={styles.placeholder}>Coming Soon</Text>
      <Text style={styles.description}>
        Connect with other Novari users and grow together
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});
