// useStreakSummary hook - fetch user's streak data
// Displays:
// - Login streak (current, best, last login)
// - Task streak (current, best, last task completed)
// - Lifetime completed tasks
//
// Usage in component:
// const { data: streaks, isLoading } = useStreakSummary();

import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export function useStreakSummary() {
  return useQuery({
    queryKey: ['streaks', 'summary'],
    queryFn: async () => {
      return apiClient.get('/streaks/summary');
    },
    // Cache for 1 minute (refresh often for streaks)
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
