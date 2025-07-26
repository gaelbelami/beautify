import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/api';
import { queryKeys, invalidateQueries } from '@/react-query/provider';
import { useUserStore } from '@/stores/userStore';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserQueryOptions,
  ApiError,
} from '@/types/api';

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Hook to fetch all users with filtering, sorting, and pagination
 */
export function useUsers(options: UserQueryOptions = {}) {
  return useQuery({
    queryKey: queryKeys.users.list(options),
    queryFn: () => userService.getUsers(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    meta: {
      errorMessage: 'Failed to fetch users',
    },
  });
}

/**
 * Hook to fetch a single user by ID
 */
export function useUser(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
    meta: {
      errorMessage: 'Failed to fetch user details',
    },
  });
}

/**
 * Hook to search users
 */
export function useUserSearch(query: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.users.search(query),
    queryFn: () => userService.getUsers({ search: query }),
    enabled: enabled && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    meta: {
      errorMessage: 'Failed to search users',
    },
  });
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Hook to create a new user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: (userData: CreateUserRequest) => userService.createUser(userData),
    onMutate: async (newUser) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.users.all() });

      // Snapshot previous value
      const previousUsers = queryClient.getQueryData(queryKeys.users.lists());

      // Optimistically update cache
      const optimisticUser: User = {
        id: Date.now(), // Temporary ID
        ...newUser,
        address: newUser.address || {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: { lat: '0', lng: '0' }
        },
        company: newUser.company || {
          name: '',
          catchPhrase: '',
          bs: ''
        },
        role: 'user',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          theme: 'system',
          language: 'en',
          notifications: {
            email: true,
            push: true,
            marketing: false
          },
          privacy: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false
          }
        }
      };

      queryClient.setQueryData(queryKeys.users.lists(), (old: User[] | undefined) => {
        return old ? [optimisticUser, ...old] : [optimisticUser];
      });

      return { previousUsers };
    },
    onError: (error: ApiError, newUser, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(queryKeys.users.lists(), context.previousUsers);
      }
    },
    onSuccess: (newUser) => {
      // Update store
      userStore.createUser({
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        website: newUser.website,
      });
    },
    onSettled: () => {
      // Always refetch after mutation
      invalidateQueries.users(queryClient);
    },
    meta: {
      successMessage: 'User created successfully',
      errorMessage: 'Failed to create user',
    },
  });
}

/**
 * Hook to update an existing user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: ({ id, ...userData }: UpdateUserRequest) => 
      userService.updateUser(id, userData),
    onMutate: async (updatedUser) => {
      const { id } = updatedUser;
      
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.users.detail(id) });
      await queryClient.cancelQueries({ queryKey: queryKeys.users.lists() });

      // Snapshot previous values
      const previousUser = queryClient.getQueryData(queryKeys.users.detail(id));
      const previousUsers = queryClient.getQueryData(queryKeys.users.lists());

      // Optimistically update user detail
      queryClient.setQueryData(queryKeys.users.detail(id), (old: User | undefined) => {
        return old ? { ...old, ...updatedUser, updatedAt: new Date().toISOString() } : undefined;
      });

      // Optimistically update users list
      queryClient.setQueryData(queryKeys.users.lists(), (old: User[] | undefined) => {
        return old?.map(user => 
          user.id === id 
            ? { ...user, ...updatedUser, updatedAt: new Date().toISOString() }
            : user
        );
      });

      return { previousUser, previousUsers };
    },
    onError: (error: ApiError, updatedUser, context) => {
      const { id } = updatedUser;
      
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(queryKeys.users.detail(id), context.previousUser);
      }
      if (context?.previousUsers) {
        queryClient.setQueryData(queryKeys.users.lists(), context.previousUsers);
      }
    },
    onSuccess: (updatedUser) => {
      // Update store
      userStore.updateUser(updatedUser.id, updatedUser);
    },
    onSettled: (data, error, variables) => {
      // Always refetch after mutation
      invalidateQueries.userDetail(queryClient, variables.id);
    },
    meta: {
      successMessage: 'User updated successfully',
      errorMessage: 'Failed to update user',
    },
  });
}

/**
 * Hook to delete a user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.users.all() });

      // Snapshot previous value
      const previousUsers = queryClient.getQueryData(queryKeys.users.lists());

      // Optimistically remove user
      queryClient.setQueryData(queryKeys.users.lists(), (old: User[] | undefined) => {
        return old?.filter(user => user.id !== id);
      });

      // Remove user detail from cache
      queryClient.removeQueries({ queryKey: queryKeys.users.detail(id) });

      return { previousUsers };
    },
    onError: (error: ApiError, id, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(queryKeys.users.lists(), context.previousUsers);
      }
    },
    onSuccess: (_, id) => {
      // Update store
      userStore.deleteUser(id);
    },
    onSettled: () => {
      // Always refetch after mutation
      invalidateQueries.users(queryClient);
    },
    meta: {
      successMessage: 'User deleted successfully',
      errorMessage: 'Failed to delete user',
    },
  });
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook to prefetch user data
 */
export function usePrefetchUser() {
  const queryClient = useQueryClient();

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.users.detail(id),
      queryFn: () => userService.getUserById(id),
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Hook to get cached user data without triggering a request
 */
export function useCachedUser(id: number) {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<User>(queryKeys.users.detail(id));
}

/**
 * Hook to invalidate user queries
 */
export function useInvalidateUsers() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => invalidateQueries.users(queryClient),
    invalidateUser: (id: number) => invalidateQueries.userDetail(queryClient, id),
  };
}