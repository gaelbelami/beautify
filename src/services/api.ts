import { apiClient } from '@/lib/api-client';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  CreateUserRequest,
  UpdateUserRequest,
  PaginationParams,
  SortParams,
  ApiResponse,
  UserQueryOptions,
} from '@/types/api';

// ============================================================================
// AUTH SERVICES
// ============================================================================

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Mock login for testing
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
    
    return {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now(),
      expiresIn: 3600
    };
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
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
    
    return {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now(),
      expiresIn: 3600
    };
  },

  async logout(): Promise<void> {
    // In real app: await apiClient.post('/auth/logout');
    return Promise.resolve();
  },

  async refreshToken(): Promise<{ token: string; expiresIn: number }> {
    // Mock token refresh
    return {
      token: 'refreshed-mock-jwt-token-' + Date.now(),
      expiresIn: 3600
    };
  },
};

// ============================================================================
// USER SERVICES
// ============================================================================

export const userService = {
  async getUsers(options: UserQueryOptions = {}): Promise<User[]> {
    // Using JSONPlaceholder API for testing
    const users = await apiClient.get<User[]>('/users');
    
    // Apply client-side filtering
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
    
    return filteredUsers;
  },

  async getUserById(id: number): Promise<User> {
    return apiClient.get<User>(`/users/${id}`);
  },

  async createUser(userData: CreateUserRequest): Promise<User> {
    // Mock creation since JSONPlaceholder doesn't persist
    const newUser: User = {
      id: Date.now(),
      ...userData,
      address: userData.address || {
        street: 'Unknown Street',
        suite: 'Unknown Suite',
        city: 'Unknown City',
        zipcode: '00000',
        geo: { lat: '0', lng: '0' }
      },
      company: userData.company || {
        name: 'Unknown Company',
        catchPhrase: 'Unknown Catchphrase',
        bs: 'Unknown Business'
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
    
    return newUser;
  },

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    // Mock update since JSONPlaceholder doesn't persist
    const existingUser = await this.getUserById(id);
    const updatedUser: User = {
      ...existingUser,
      ...userData,
      address: {
        street: userData.address?.street || existingUser.address.street,
        suite: userData.address?.suite || existingUser.address.suite,
        city: userData.address?.city || existingUser.address.city,
        zipcode: userData.address?.zipcode || existingUser.address.zipcode,
        geo: {
          lat: userData.address?.geo?.lat || existingUser.address.geo.lat,
          lng: userData.address?.geo?.lng || existingUser.address.geo.lng,
        },
      },
      company: {
        name: userData.company?.name || existingUser.company.name,
        catchPhrase: userData.company?.catchPhrase || existingUser.company.catchPhrase,
        bs: userData.company?.bs || existingUser.company.bs,
      },
      updatedAt: new Date().toISOString(),
    }
    
    return updatedUser
  },

  async deleteUser(id: number): Promise<void> {
    // Mock deletion
    return Promise.resolve();
  },
};



// ============================================================================
// COMBINED API SERVICE
// ============================================================================

export const api = {
  auth: authService,
  users: userService,
};

export default api;