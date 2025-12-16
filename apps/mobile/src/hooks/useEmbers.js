// useEmbers hook - fetch all embers
// Uses React Query for server state
// Handles caching, loading, and error states
//
// Usage in component:
// const { data: embers, isLoading, error } = useEmbers();

import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export function useEmbers() {
  return useQuery({
    queryKey: ['embers'],
    queryFn: async () => {
      return apiClient.get('/embers');
    },
    // Cache for 10 minutes
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}

/**
 * useEmber - fetch single ember by ID
 * @param emberId - Ember ID
 * Returns: { data, isLoading, error }
 */
export function useEmber(emberId) {
  return useQuery({
    queryKey: ['embers', emberId],
    queryFn: async () => {
      return apiClient.get(`/embers/${emberId}`);
    },
    enabled: !!emberId,
    staleTime: 10 * 60 * 1000,
  });
}
