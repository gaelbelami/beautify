import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/api';
import { queryKeys } from '@/react-query/provider';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiError,
  User,
} from '@/types/api';

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Hook to get current authenticated user
 */
export function useCurrentUser() {
  const { user, isAuthenticated } = useAuthStore();
  
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: async (): Promise<User | null> => {
      // Return user from store if authenticated
      if (isAuthenticated && user) {
        return user;
      }
      return null;
    },
    enabled: isAuthenticated,
    staleTime: Infinity, // User data is managed by auth store
    meta: {
      errorMessage: false, // Don't show error toast for this query
    },
  });
}

/**
 * Hook to get user permissions
 */
export function useUserPermissions() {
  const { permissions, isAuthenticated } = useAuthStore();
  
  return useQuery({
    queryKey: queryKeys.auth.permissions(),
    queryFn: async (): Promise<string[]> => {
      return permissions;
    },
    enabled: isAuthenticated,
    staleTime: Infinity, // Permissions are managed by auth store
    meta: {
      errorMessage: false,
    },
  });
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Hook to handle user login
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onMutate: () => {
      // Set loading state
      authStore.setLoading(true);
      authStore.clearError();
    },
    onSuccess: (authResponse: AuthResponse) => {
      // Update auth store
      authStore.setAuth(authResponse);
      
      // Update user store with current user
      userStore.setCurrentUser(authResponse.user);
      
      // Update React Query cache
      queryClient.setQueryData(queryKeys.auth.user(), authResponse.user);
      queryClient.setQueryData(
        queryKeys.auth.permissions(), 
        authResponse.user.role === 'admin' ? ['admin'] : ['user']
      );
      
      // Prefetch user-related data
      queryClient.prefetchQuery({
        queryKey: queryKeys.users.detail(authResponse.user.id),
        queryFn: () => Promise.resolve(authResponse.user),
        staleTime: 5 * 60 * 1000,
      });
    },
    onError: (error: ApiError) => {
      authStore.setError(error);
    },
    onSettled: () => {
      authStore.setLoading(false);
    },
    meta: {
      successMessage: 'Welcome back!',
      errorMessage: 'Login failed. Please check your credentials.',
    },
  });
}

/**
 * Hook to handle user registration
 */
export function useRegister() {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onMutate: () => {
      authStore.setLoading(true);
      authStore.clearError();
    },
    onSuccess: (authResponse: AuthResponse) => {
      // Update auth store
      authStore.setAuth(authResponse);
      
      // Update user store
      userStore.setCurrentUser(authResponse.user);
      
      // Update React Query cache
      queryClient.setQueryData(queryKeys.auth.user(), authResponse.user);
      queryClient.setQueryData(
        queryKeys.auth.permissions(), 
        authResponse.user.role === 'admin' ? ['admin'] : ['user']
      );
    },
    onError: (error: ApiError) => {
      authStore.setError(error);
    },
    onSettled: () => {
      authStore.setLoading(false);
    },
    meta: {
      successMessage: 'Account created successfully! Welcome!',
      errorMessage: 'Registration failed. Please try again.',
    },
  });
}

/**
 * Hook to handle user logout
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: () => authService.logout(),
    onMutate: () => {
      authStore.setLoading(true);
    },
    onSuccess: () => {
      // Clear auth store
      authStore.logout();
      
      // Clear user store
      userStore.setCurrentUser(null);
      
      // Clear all React Query cache
      queryClient.clear();
      
      // Remove specific auth data
      queryClient.removeQueries({ queryKey: queryKeys.auth.user() });
      queryClient.removeQueries({ queryKey: queryKeys.auth.permissions() });
    },
    onError: (error: ApiError) => {
      authStore.setError(error);
    },
    onSettled: () => {
      authStore.setLoading(false);
    },
    meta: {
      successMessage: 'Logged out successfully',
      errorMessage: false, // Don't show error toast for logout
    },
  });
}

/**
 * Hook to refresh authentication token
 */
export function useRefreshToken() {
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: (tokenData) => {
      // Update token in auth store
      authStore.refreshToken();
    },
    onError: (error: ApiError) => {
      // If refresh fails, logout user
      authStore.logout();
    },
    meta: {
      successMessage: false, // Don't show success toast
      errorMessage: 'Session expired. Please log in again.',
    },
  });
}

/**
 * Hook to update current user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: (userData: Partial<User>) => {
      const currentUser = authStore.user;
      if (!currentUser) {
        throw new Error('No authenticated user');
      }
      
      // Mock profile update
      return Promise.resolve({
        ...currentUser,
        ...userData,
        updatedAt: new Date().toISOString(),
      });
    },
    onMutate: async (userData) => {
      const currentUser = authStore.user;
      if (!currentUser) return;

      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.auth.user() });
      await queryClient.cancelQueries({ queryKey: queryKeys.users.detail(currentUser.id) });

      // Snapshot previous value
      const previousUser = queryClient.getQueryData(queryKeys.auth.user());

      // Optimistically update
      const updatedUser = { ...currentUser, ...userData };
      queryClient.setQueryData(queryKeys.auth.user(), updatedUser);
      queryClient.setQueryData(queryKeys.users.detail(currentUser.id), updatedUser);

      return { previousUser };
    },
    onError: (error: ApiError, userData, context) => {
      // Rollback on error
      if (context?.previousUser) {
        const currentUser = authStore.user;
        if (currentUser) {
          queryClient.setQueryData(queryKeys.auth.user(), context.previousUser);
          queryClient.setQueryData(queryKeys.users.detail(currentUser.id), context.previousUser);
        }
      }
    },
    onSuccess: (updatedUser) => {
      // Update stores
      authStore.updateUser(updatedUser);
      userStore.setCurrentUser(updatedUser);
    },
    meta: {
      successMessage: 'Profile updated successfully',
      errorMessage: 'Failed to update profile',
    },
  });
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook to check if user has specific permission
 */
export function useHasPermission() {
  const { permissions } = useAuthStore();
  
  return (permission: string): boolean => {
    return permissions.includes(permission);
  };
}

/**
 * Hook to check if user has any of the specified roles
 */
export function useHasRole() {
  const { user } = useAuthStore();
  
  return (roles: string | string[]): boolean => {
    if (!user?.role) return false;
    
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };
}

/**
 * Hook to get authentication status and user info
 */
export function useAuthStatus() {
  const { user, isAuthenticated, isLoading, error } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin: user?.role === 'admin',
    isModerator: user?.role === 'moderator',
    isUser: user?.role === 'user',
  };
}

/**
 * Hook to automatically refresh token before expiration
 */
export function useTokenRefresh() {
  const { token, isAuthenticated } = useAuthStore();
  const refreshMutation = useRefreshToken();
  
  // In a real app, you would decode the JWT token to get expiration time
  // and set up automatic refresh before expiration
  
  return {
    refreshToken: refreshMutation.mutate,
    isRefreshing: refreshMutation.isPending,
  };
}