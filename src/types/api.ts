// Base API types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User types (based on JSONPlaceholder structure)
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  // Additional fields for our app
  avatar?: string;
  role?: 'admin' | 'user' | 'moderator';
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  preferences?: UserPreferences;
  bio?: string;
  urls?: { value: string }[];
  dateOfBirth?: string;
  language?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
  };
}

export interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  address?: Partial<User['address']>;
  company?: Partial<User['company']>;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number;
  preferences?: Partial<UserPreferences>;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  website?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}



// ============================================================================
// PAGINATION AND SORTING
// ============================================================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// REACT QUERY OPTIONS
// ============================================================================

export interface BaseQueryOptions {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  retry?: boolean | number;
}

export interface UserQueryOptions extends BaseQueryOptions {
  search?: string;
  role?: 'admin' | 'user' | 'moderator';
  status?: 'active' | 'inactive';
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
  pagination?: PaginationParams;
}

// State management types
export interface LoadingState {
  isLoading: boolean;
  error: ApiError | null;
  lastUpdated?: Date;
}

export interface AuthState extends LoadingState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[];
}

export interface UserState extends LoadingState {
  currentUser: User | null;
  users: User[];
  selectedUser: User | null;
}

// Cache and persistence types
export interface CacheConfig {
  staleTime: number;
  cacheTime: number;
  refetchOnWindowFocus: boolean;
  refetchOnReconnect: boolean;
}

export interface PersistConfig {
  key: string;
  storage: 'localStorage' | 'sessionStorage';
  whitelist?: string[];
  blacklist?: string[];
}

// Utility types
export type ApiEndpoint = 
  | '/users'
  | '/users/:id'
  | '/posts'
  | '/posts/:id'
  | '/comments'
  | '/comments/:id'
  | '/auth/login'
  | '/auth/register'
  | '/auth/refresh'
  | '/auth/logout';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormState<T = any> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}