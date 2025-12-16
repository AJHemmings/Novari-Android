// useCompleteTask hook - mark a task as complete
// Uses React Query for mutation
//
// Usage in component:
// const { mutate: completeTask, isPending } = useCompleteTask();
// completeTask(taskId);

import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId) => {
      return apiClient.post(`/tasks/${taskId}/complete`, {});
    },
    // Invalidate related queries after success
    onSuccess: (data) => {
      // Refresh streak data
      queryClient.invalidateQueries({ queryKey: ['streaks'] });
      // Refresh tasks for this ember
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('Failed to complete task:', error);
    },
  });
}
