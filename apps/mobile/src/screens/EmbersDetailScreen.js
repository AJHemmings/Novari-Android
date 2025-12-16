// Ember Detail Screen
// Shows all tasks for a specific ember
// User can complete tasks here

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTasksByEmber } from '../hooks/useTasksByEmber';
import { useCompleteTask } from '../hooks/useCompleteTask';

export default function EmbersDetailScreen({ route }) {
  const emberId = route.params?.emberId;
  const emberTitle = route.params?.emberTitle;

  const { data: tasks, isLoading } = useTasksByEmber(emberId);
  const { mutate: completeTask, isPending } = useCompleteTask();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  /**
   * Handle task completion
   * Calls POST /api/v1/tasks/:taskId/complete
   */
  const handleCompleteTask = (taskId) => {
    completeTask(taskId, {
      onSuccess: () => {
        // Task completed successfully
        // React Query will invalidate and refetch
      },
    });
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskTitle,
            item.isCompleted && styles.taskTitleCompleted,
          ]}
        >
          {item.title}
        </Text>
        {item.description && (
          <Text style={styles.taskDescription}>{item.description}</Text>
        )}
      </View>

      {!item.isCompleted ? (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => handleCompleteTask(item.id)}
          disabled={isPending}
        >
          <Text style={styles.completeButtonText}>
            {isPending ? '...' : '✓'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>✓</Text>
        </View>
      )}
    </View>
  );

  const completedCount = tasks?.filter((t) => t.isCompleted).length || 0;
  const totalCount = tasks?.length || 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{emberTitle}</Text>
        <Text style={styles.progress}>
          {completedCount} / {totalCount} completed
        </Text>
      </View>

      {tasks && tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTask}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks for this ember yet</Text>
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
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  progress: {
    fontSize: 14,
    color: '#FF6B35',
    marginTop: 4,
    fontWeight: '600',
  },
  listContainer: {
    padding: 12,
  },
  taskCard: {
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
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  taskTitleCompleted: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  completeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  completedBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  completedBadgeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
