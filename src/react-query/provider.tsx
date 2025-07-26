'use client';

import { QueryClient, QueryClientProvider, MutationCache, QueryCache } from '@tanstack/react-query';
import { useState } from 'react';
import type { ApiError } from '@/types/api';
import { useAuthStore } from '@/stores/authStore';

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

// Create query client with enhanced configuration
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Cache for 5 minutes
        staleTime: 5 * 60 * 1000,
        // Keep in cache for 10 minutes
        gcTime: 10 * 60 * 1000,
        // Retry failed requests 3 times with exponential backoff
        retry: (failureCount, error) => {
          const apiError = error as ApiError;
          // Don't retry on 4xx errors (client errors)
          if (apiError.status >= 400 && apiError.status < 500) {
            return false;
          }
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Refetch on window focus for important data
        refetchOnWindowFocus: true,
        // Refetch on reconnect
        refetchOnReconnect: true,
        // Don't refetch on mount if data is fresh
        refetchOnMount: 'always',
      },
      mutations: {
        // Retry mutations once
        retry: 1,
        retryDelay: 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        const apiError = error as unknown as ApiError;
        
        // Handle authentication errors globally
        if (apiError?.status === 401) {
          useAuthStore.getState().logout();
          console.error('Session expired. Please log in again.');
          return;
        }
        
        // Handle forbidden errors
        if (apiError?.status === 403) {
          console.error('You do not have permission to access this resource.');
          return;
        }
        
        // Handle server errors
        if (apiError?.status >= 500) {
          console.error('Server error. Please try again later.');
          return;
        }
        
        // Show generic error for other cases
        if (query.meta?.errorMessage !== false) {
          console.error(apiError?.message || 'An unexpected error occurred');
        }
      },
      onSuccess: (data, query) => {
        // Handle global success actions if needed
        if (query.meta?.successMessage) {
          console.log(query.meta.successMessage as string);
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, variables, context, mutation) => {
        const apiError = error as unknown as ApiError;
        
        // Handle authentication errors
        if (apiError?.status === 401) {
          useAuthStore.getState().logout();
          console.error('Session expired. Please log in again.');
          return;
        }
        
        // Show error toast unless explicitly disabled
        if (mutation.meta?.errorMessage !== false) {
          const errorMessage = mutation.meta?.errorMessage as string || apiError?.message || 'Operation failed';
          console.error(errorMessage);
        }
      },
      onSuccess: (data, variables, context, mutation) => {
        // Show success toast if specified
        if (mutation.meta?.successMessage) {
          console.log(mutation.meta.successMessage as string);
        }
      },
    }),
  });
}

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// Export query client instance for use in stores or utilities
export { createQueryClient };

// Query key factory for consistent cache management
export const queryKeys = {
  // Auth keys
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
  },
  // User keys
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: any) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.users.details(), id] as const,
    search: (query: string) => [...queryKeys.users.all, 'search', query] as const,
  },
};

// Utility function to invalidate related queries
export const invalidateQueries = {
  users: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.users.all() });
  },
  userDetail: (queryClient: QueryClient, userId: number) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
  },

};

// Cache management utilities
export const cacheUtils = {
  // Clear all cache
  clearAll: (queryClient: QueryClient) => {
    queryClient.clear();
  },
  // Clear specific cache
  clearUsers: (queryClient: QueryClient) => {
    queryClient.removeQueries({ queryKey: queryKeys.users.all() });
  },

  // Prefetch data
  prefetchUsers: async (queryClient: QueryClient) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.users.lists(),
      staleTime: 5 * 60 * 1000,
    });
  },
};
