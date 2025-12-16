// useTasksByEmber hook - fetch tasks for a specific ember
// Uses React Query for server state
//
// Usage in component:
// const { data: tasks, isLoading } = useTasksByEmber(emberId);

import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export function useTasksByEmber(emberId) {
  return useQuery({
    queryKey: ['tasks', emberId],
    queryFn: async () => {
      return apiClient.get(`/tasks/ember/${emberId}`);
    },
    enabled: !!emberId,
    // Cache for 5 minutes
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
