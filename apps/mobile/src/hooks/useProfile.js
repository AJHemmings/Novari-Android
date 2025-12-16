// useProfile hook - fetch current user profile
// Uses React Query for server state
// Caches profile data and handles loading/error states
//
// Usage in component:
// const { data: profile, isLoading, error } = useProfile();

import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return apiClient.get('/users/me');
    },
    // Cache for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Keep data in cache even if stale
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * useMutateProfile - update user profile
   * Usage: const { mutate, isPending } = useMutateProfile();
   * mutate({ firstName: 'John' });
   */
export function useMutateProfile() {
  const { invalidateQueries } = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiClient.patch('/users/me', data),
    onSuccess: () => {
      // Refresh profile query after update
      invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
