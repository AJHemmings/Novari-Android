// Embers List Screen
// Shows all available embers (areas of growth)
// User can tap to see tasks for each ember

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useEmbers } from '../hooks/useEmbers';

export default function EmbersScreen({ navigation }) {
  const { data: embers, isLoading } = useEmbers();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  /**
   * Navigate to EmberDetail screen
   * Pass emberId and emberTitle to detail screen
   */
  const handleEmberPress = (ember) => {
    navigation.navigate('EmberDetail', {
      emberId: ember.id,
      emberTitle: ember.title,
    });
  };

  const renderEmber = ({ item }) => (
    <TouchableOpacity
      style={styles.emberCard}
      onPress={() => handleEmberPress(item)}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 Embers</Text>
        <Text style={styles.headerSubtitle}>Areas of Growth</Text>
      </View>

      {embers && embers.length > 0 ? (
        <FlatList
          data={embers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEmber}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No embers available yet</Text>
        </View>
      )}
    </View>
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
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  listContainer: {
    padding: 12,
  },
  emberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  arrow: {
    fontSize: 20,
    color: '#FF6B35',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
