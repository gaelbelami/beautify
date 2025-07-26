import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api-client';
import type { User, AuthResponse, LoginRequest, RegisterRequest, ApiError } from '@/types/api';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ApiError | null;
  permissions: string[];
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshToken: () => Promise<void>;
  clearError: () => void;
  
  // Internal actions
  setAuth: (authData: AuthResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: ApiError | null) => void;
}

export const useAuthStore = create<AuthState>()(devtools(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      permissions: [],

      // Actions
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          // Mock login with JSONPlaceholder data
          // In real app, this would be: const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
          const mockUser: User = {
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            email: credentials.email,
            address: {
              street: 'Kulas Light',
              suite: 'Apt. 556',
              city: 'Gwenborough',
              zipcode: '92998-3874',
              geo: { lat: '-37.3159', lng: '81.1496' }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
              name: 'Romaguera-Crona',
              catchPhrase: 'Multi-layered client-server neural-net',
              bs: 'harness real-time e-markets'
            },
            role: 'user',
            isActive: true,
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
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          const authResponse: AuthResponse = {
            user: mockUser,
            token: mockToken,
            expiresIn: 3600
          };
          
          get().setAuth(authResponse);
        } catch (error) {
          set({ error: error as ApiError, isLoading: false });
          throw error;
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          // Mock registration
          const mockUser: User = {
            id: Date.now(),
            name: userData.name,
            username: userData.username,
            email: userData.email,
            address: {
              street: '',
              suite: '',
              city: '',
              zipcode: '',
              geo: { lat: '0', lng: '0' }
            },
            phone: '',
            website: '',
            company: {
              name: '',
              catchPhrase: '',
              bs: ''
            },
            role: 'user',
            isActive: true,
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
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          const authResponse: AuthResponse = {
            user: mockUser,
            token: mockToken,
            expiresIn: 3600
          };
          
          get().setAuth(authResponse);
        } catch (error) {
          set({ error: error as ApiError, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          // Clear API client token
          apiClient.clearToken();
          
          // Reset state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            permissions: []
          });
        } catch (error) {
          set({ error: error as ApiError, isLoading: false });
        }
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
        }
      },

      refreshToken: async () => {
        const currentToken = get().token;
        if (!currentToken) return;
        
        try {
          // Mock token refresh
          const newToken = 'refreshed-mock-jwt-token-' + Date.now();
          apiClient.setToken(newToken);
          set({ token: newToken });
        } catch (error) {
          // If refresh fails, logout user
          get().logout();
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      // Internal actions
      setAuth: (authData: AuthResponse) => {
        apiClient.setToken(authData.token);
        set({
          user: authData.user,
          token: authData.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          permissions: authData.user.role === 'admin' ? ['admin'] : ['user']
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: ApiError | null) => {
        set({ error, isLoading: false });
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        permissions: state.permissions
      }),
      onRehydrateStorage: () => (state) => {
        // Restore token to API client on rehydration
        if (state?.token) {
          apiClient.setToken(state.token);
        }
      }
    }
  ),
  { name: 'auth-store' }
));

// Listen for token expiration events
if (typeof window !== 'undefined') {
  window.addEventListener('auth:token-expired', () => {
    useAuthStore.getState().logout();
  });
}