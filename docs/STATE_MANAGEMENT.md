# State Management Guide

This guide explains how to use the comprehensive state management solution implemented in this starter kit. The system combines Zustand for client state, React Query for server state, and provides a unified API layer for seamless data management.

## Architecture Overview

### Core Technologies

- **Zustand**: Global client state management with persistence
- **React Query (TanStack Query)**: Server state caching and synchronization
- **TypeScript**: Full type safety throughout the application
- **JSONPlaceholder**: Mock API for testing and development

### Key Features

- ✅ **Unified State Management**: Single source of truth for user data
- ✅ **Type Safety**: Comprehensive TypeScript types for all API interactions
- ✅ **Persistence**: Automatic state persistence with Zustand persist middleware
- ✅ **Optimistic Updates**: Immediate UI updates with automatic rollback on errors
- ✅ **Error Handling**: Global error handling with toast notifications
- ✅ **Cache Management**: Intelligent caching with React Query
- ✅ **Authentication Flow**: Complete auth system with token management
- ✅ **Developer Experience**: DevTools integration for debugging

## File Structure

```
src/
├── lib/
│   └── api-client.ts          # Centralized API client with auth
├── types/
│   └── api.ts                  # TypeScript types for API
├── stores/
│   ├── authStore.ts           # Authentication state (Zustand)
│   └── userStore.ts           # User management state (Zustand)
├── services/
│   └── api.ts                 # API service layer
├── hooks/
│   └── api/
│       ├── useAuth.ts         # Authentication hooks
│       └── useUsers.ts        # User management hooks
├── react-query/
│   └── provider.tsx           # React Query configuration
└── components/
    └── examples/
        └── UserManagementExample.tsx  # Complete usage example
```

## Quick Start

### 1. Setup React Query Provider

The React Query provider is already configured in your app. Make sure it wraps your application:

```tsx
// In your layout.tsx or _app.tsx
import { ReactQueryProvider } from '@/react-query/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
```

### 2. Authentication

#### Login
```tsx
import { useLogin, useAuthStatus } from '@/hooks/api/useAuth';

function LoginForm() {
  const { isAuthenticated, user } = useAuthStatus();
  const loginMutation = useLogin();

  const handleLogin = (credentials: LoginRequest) => {
    loginMutation.mutate(credentials);
  };

  if (isAuthenticated) {
    return <div>Welcome, {user?.name}!</div>;
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin({ email: 'user@example.com', password: 'password' });
    }}>
      {/* Your form fields */}
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

#### Registration
```tsx
import { useRegister } from '@/hooks/api/useAuth';

function RegisterForm() {
  const registerMutation = useRegister();

  const handleRegister = (userData: RegisterRequest) => {
    registerMutation.mutate(userData);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleRegister({
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        phone: '+1234567890',
        website: 'https://johndoe.com'
      });
    }}>
      {/* Your form fields */}
      <button type="submit" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? 'Creating account...' : 'Register'}
      </button>
    </form>
  );
}
```

#### Logout
```tsx
import { useLogout } from '@/hooks/api/useAuth';

function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <button 
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

### 3. User Management

#### Fetch Users
```tsx
import { useUsers } from '@/hooks/api/useUsers';

function UsersList() {
  const { data, isLoading, error } = useUsers({
    pagination: { page: 1, limit: 10 },
    sort: { field: 'name', order: 'asc' }
  });

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      {data?.data.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Create User
```tsx
import { useCreateUser } from '@/hooks/api/useUsers';

function CreateUserForm() {
  const createUserMutation = useCreateUser();

  const handleSubmit = (userData: CreateUserRequest) => {
    createUserMutation.mutate(userData, {
      onSuccess: (newUser) => {
        console.log('User created:', newUser);
        // Form will be reset automatically
      },
      onError: (error) => {
        console.error('Failed to create user:', error);
      }
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        phone: '+1234567890',
        website: 'https://janedoe.com'
      });
    }}>
      {/* Your form fields */}
      <button type="submit" disabled={createUserMutation.isPending}>
        {createUserMutation.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

#### Update User
```tsx
import { useUpdateUser } from '@/hooks/api/useUsers';

function EditUserForm({ userId }: { userId: number }) {
  const updateUserMutation = useUpdateUser();

  const handleUpdate = (userData: UpdateUserRequest) => {
    updateUserMutation.mutate(
      { userId, userData },
      {
        onSuccess: (updatedUser) => {
          console.log('User updated:', updatedUser);
        }
      }
    );
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleUpdate({ name: 'Updated Name' });
    }}>
      {/* Your form fields */}
      <button type="submit" disabled={updateUserMutation.isPending}>
        {updateUserMutation.isPending ? 'Updating...' : 'Update User'}
      </button>
    </form>
  );
}
```

#### Search Users
```tsx
import { useUserSearch } from '@/hooks/api/useUsers';
import { useState } from 'react';

function UserSearch() {
  const [query, setQuery] = useState('');
  const { data: searchResults, isLoading } = useUserSearch(query, {
    enabled: query.length > 2 // Only search when query is longer than 2 characters
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {isLoading && <div>Searching...</div>}
      
      {searchResults && (
        <div>
          {searchResults.data.map(user => (
            <div key={user.id}>{user.name} - {user.email}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Advanced Usage

### Custom API Client

The API client is configured to work with JSONPlaceholder by default. To use your own API:

```tsx
// In src/lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-api.com/api';
```

### Error Handling

Global error handling is configured in the React Query provider. You can customize it:

```tsx
// In src/react-query/provider.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Custom retry logic
        if (error.status === 404) return false;
        return failureCount < 3;
      },
    },
    mutations: {
      onError: (error) => {
        // Custom global error handling
        if (error.status === 401) {
          // Handle unauthorized
          authStore.getState().logout();
        }
      },
    },
  },
});
```

### Cache Management

Use the provided utility functions for cache management:

```tsx
import { useInvalidateUsers, usePrefetchUser } from '@/hooks/api/useUsers';

function UserActions() {
  const { invalidateAll, invalidateUser } = useInvalidateUsers();
  const prefetchUser = usePrefetchUser();

  return (
    <div>
      <button onClick={() => invalidateAll()}>
        Refresh All Users
      </button>
      <button onClick={() => prefetchUser(123)}>
        Prefetch User 123
      </button>
    </div>
  );
}
```

### Permission-Based Access

Use the authentication hooks for permission checks:

```tsx
import { useHasRole, useHasPermission } from '@/hooks/api/useAuth';

function AdminPanel() {
  const hasAdminRole = useHasRole('admin');
  const hasUserManagement = useHasPermission('user:manage');

  if (!hasAdminRole) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {hasUserManagement && (
        <UserManagementSection />
      )}
    </div>
  );
}
```

## Best Practices

### 1. Type Safety
Always use the provided TypeScript types:

```tsx
import type { User, CreateUserRequest, ApiError } from '@/types/api';

// Good
const handleCreateUser = (userData: CreateUserRequest) => {
  // TypeScript will ensure userData has the correct shape
};

// Avoid
const handleCreateUser = (userData: any) => {
  // No type safety
};
```

### 2. Error Handling
Handle errors gracefully in your components:

```tsx
const { data, error, isLoading } = useUsers();

if (error) {
  return (
    <div className="error">
      <p>Failed to load users: {error.message}</p>
      <button onClick={() => refetch()}>Try Again</button>
    </div>
  );
}
```

### 3. Loading States
Provide feedback during async operations:

```tsx
const createUserMutation = useCreateUser();

return (
  <button 
    onClick={() => createUserMutation.mutate(userData)}
    disabled={createUserMutation.isPending}
  >
    {createUserMutation.isPending ? (
      <>
        <Spinner /> Creating...
      </>
    ) : (
      'Create User'
    )}
  </button>
);
```

### 4. Optimistic Updates
The system includes optimistic updates by default. For custom optimistic updates:

```tsx
const updateUserMutation = useUpdateUser();

// The mutation automatically handles optimistic updates
// and rollback on error
updateUserMutation.mutate({ userId: 1, userData: { name: 'New Name' } });
```

### 5. Cache Invalidation
Invalidate related caches when data changes:

```tsx
const createUserMutation = useCreateUser();
const { invalidateList } = useInvalidateUsers();

createUserMutation.mutate(userData, {
  onSuccess: () => {
    // Cache is automatically invalidated
    // Manual invalidation only needed for custom scenarios
    invalidateList();
  }
});
```

## Testing

The system is designed to be easily testable. Mock the hooks in your tests:

```tsx
// In your test file
jest.mock('@/hooks/api/useAuth', () => ({
  useAuthStatus: () => ({
    isAuthenticated: true,
    user: { id: 1, name: 'Test User', email: 'test@example.com' },
    isLoading: false,
    error: null
  }),
  useLogin: () => ({
    mutate: jest.fn(),
    isPending: false,
    error: null
  })
}));
```

## Migration Guide

If you're migrating from a different state management solution:

1. **From Redux**: Replace Redux actions/reducers with Zustand stores and React Query hooks
2. **From SWR**: Replace SWR hooks with the provided React Query hooks
3. **From Context API**: Replace context providers with Zustand stores for global state

## Troubleshooting

### Common Issues

1. **"Query key not found"**: Ensure you're using the correct query keys from `queryKeys`
2. **"Unauthorized" errors**: Check if the auth token is properly set in the API client
3. **Stale data**: Use `invalidateQueries` to refresh data when needed
4. **Type errors**: Ensure you're importing types from `@/types/api`

### Debug Tools

- **React Query DevTools**: Enabled in development mode
- **Zustand DevTools**: Available in browser dev tools
- **Network Tab**: Monitor API calls in browser dev tools

## Example Implementation

See `src/components/examples/UserManagementExample.tsx` for a complete implementation example that demonstrates all features of the state management system.

## Contributing

When extending the state management system:

1. Add new types to `src/types/api.ts`
2. Extend the API client in `src/lib/api-client.ts`
3. Create service functions in `src/services/api.ts`
4. Build React Query hooks in `src/hooks/api/`
5. Update Zustand stores if needed
6. Add query keys to the provider
7. Update this documentation

This state management solution provides a solid foundation for building scalable React applications with excellent developer experience and type safety.