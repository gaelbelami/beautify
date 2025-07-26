import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api-client';
import type { User, CreateUserRequest, UpdateUserRequest, ApiError, UserQueryOptions } from '@/types/api';

interface UserState {
  // State
  users: User[];
  selectedUser: User | null;
  currentUser: User | null;
  isLoading: boolean;
  error: ApiError | null;
  lastFetch: Date | null;
  totalUsers: number;
  
  // Actions
  fetchUsers: (options?: UserQueryOptions) => Promise<void>;
  fetchUserById: (id: number) => Promise<User>;
  createUser: (userData: CreateUserRequest) => Promise<User>;
  updateUser: (id: number, userData: UpdateUserRequest) => Promise<User>;
  deleteUser: (id: number) => Promise<void>;
  selectUser: (user: User | null) => void;
  setCurrentUser: (user: User | null) => void;
  clearError: () => void;
  
  // Utility actions
  getUserById: (id: number) => User | undefined;
  searchUsers: (query: string) => User[];
  filterUsers: (predicate: (user: User) => boolean) => User[];
}

export const useUserStore = create<UserState>()(devtools(
  persist(
    (set, get) => ({
      // Initial state
      users: [],
      selectedUser: null,
      currentUser: null,
      isLoading: false,
      error: null,
      lastFetch: null,
      totalUsers: 0,
      
      // Actions
      fetchUsers: async (options: UserQueryOptions = {}) => {
        set({ isLoading: true, error: null });
        try {
          // Using JSONPlaceholder API for testing
          const users = await apiClient.get<User[]>('/users');
          
          // Apply client-side filtering if options provided
          let filteredUsers = users;
          
          if (options.search) {
            const searchLower = options.search.toLowerCase();
            filteredUsers = users.filter(user => 
              user.name.toLowerCase().includes(searchLower) ||
              user.email.toLowerCase().includes(searchLower) ||
              user.username.toLowerCase().includes(searchLower)
            );
          }
          
          if (options.role) {
            filteredUsers = filteredUsers.filter(user => user.role === options.role);
          }
          
          if (options.isActive !== undefined) {
            filteredUsers = filteredUsers.filter(user => user.isActive === options.isActive);
          }
          
          // Apply sorting
          if (options.sortBy) {
            filteredUsers.sort((a, b) => {
              const aValue = (a as any)[options.sortBy!];
              const bValue = (b as any)[options.sortBy!];
              const order = options.sortOrder === 'desc' ? -1 : 1;
              
              if (typeof aValue === 'string') {
                return aValue.localeCompare(bValue) * order;
              }
              return (aValue - bValue) * order;
            });
          }
          
          // Apply pagination
          if (options.page && options.limit) {
            const startIndex = (options.page - 1) * options.limit;
            filteredUsers = filteredUsers.slice(startIndex, startIndex + options.limit);
          }
          
          set({ 
            users: filteredUsers, 
            totalUsers: users.length,
            isLoading: false, 
            lastFetch: new Date() 
          });
        } catch (error) {
          set({ error: error as ApiError, isLoading: false });
          throw error;
        }
      },
      
      fetchUserById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const user = await apiClient.get<User>(`/users/${id}`);
          
          // Update user in the users array if it exists
          const users = get().users.map(u => u.id === id ? user : u);
          set({ users, isLoading: false });
          
          return user;
        } catch (error) {
          set({ error: error as ApiError, isLoading: false });
          throw error;
        }
      },
      
      createUser: async (userData: CreateUserRequest) => {
        set({ isLoading: true, error: null });
        try {
          // Mock creation since JSONPlaceholder doesn't persist
          const newUser: User = {
            id: Date.now(), // Mock ID
            ...userData,
            address: userData.address || {
              street: '',
              suite: '',
              city: '',
              zipcode: '',
              geo: { lat: '0', lng: '0' }
            },
            company: userData.company || {
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
          
          const users = [newUser, ...get().users];
          set({ users, totalUsers: get().totalUsers + 1, isLoading: false });
          
          return newUser;
        } catch (error) {
          set({ error: error as ApiError, isLoading: false });
          throw error;
        }
      },
      
      updateUser: async (id: number, userData: UpdateUserRequest) => {
        set({ isLoading: true, error: null });
        try {
          // Mock update since JSONPlaceholder doesn't persist
          const users = get().users.map(user => 
            user.id === id 
              ? { ...user, ...userData, updatedAt: new Date().toISOString() }
              : user
          );
          
          const updatedUser = users.find(u => u.id === id);
          if (!updatedUser) {
            throw new Error('User not found');
          }
          
          set({ users, isLoading: false });
          
          // Update selected user if it's the same
          if (get().selectedUser?.id === id) {
            set({ selectedUser: updatedUser });
          }
          
          return updatedUser;
        } catch (error) {
          set({ error: error as ApiError, isLoading: false });
          throw error;
        }
      },
      
      deleteUser: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          // Mock deletion
          const users = get().users.filter(user => user.id !== id);
          set({ 
            users, 
            totalUsers: get().totalUsers - 1,
            isLoading: false,
            selectedUser: get().selectedUser?.id === id ? null : get().selectedUser
          });
        } catch (error) {
          set({ error: error as ApiError, isLoading: false });
          throw error;
        }
      },
      
      selectUser: (user: User | null) => {
        set({ selectedUser: user });
      },
      
      setCurrentUser: (user: User | null) => {
        set({ currentUser: user });
      },
      
      clearError: () => {
        set({ error: null });
      },
      
      // Utility actions
      getUserById: (id: number) => {
        return get().users.find(user => user.id === id);
      },
      
      searchUsers: (query: string) => {
        const searchLower = query.toLowerCase();
        return get().users.filter((user: User) => 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower)
        );
      },
      
      filterUsers: (predicate: (user: User) => boolean) => {
        return get().users.filter(predicate);
      }
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        users: state.users,
        selectedUser: state.selectedUser,
        currentUser: state.currentUser,
        lastFetch: state.lastFetch,
        totalUsers: state.totalUsers
      })
    }
  ),
  { name: 'user-store' }
));