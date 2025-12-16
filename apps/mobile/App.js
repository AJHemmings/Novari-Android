// App.js - Main entry point for Expo app
// Sets up React Query, Zustand, and navigation

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from './src/navigation/RootNavigator';

// Create React Query client
// Manages server state (data from API)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Don't retry failed requests automatically
      retry: 1,
    },
  },
});

/**
 * Root App component
 * Wraps:
 * - RootNavigator: Auth + Tab navigation
 * - QueryClientProvider: React Query server state
 * - No need to wrap Zustand (it's global state via hooks)
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}
