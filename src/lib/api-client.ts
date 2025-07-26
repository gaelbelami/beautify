// Removed sonner dependency - using console logging instead

// Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface RequestConfig extends RequestInit {
  skipAuth?: boolean;
  skipErrorToast?: boolean;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.baseURL = baseURL;
    this.loadTokenFromStorage();
  }

  private loadTokenFromStorage(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private saveTokenToStorage(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
    this.token = token;
  }

  private removeTokenFromStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    this.token = null;
  }

  setToken(token: string): void {
    this.saveTokenToStorage(token);
  }

  clearToken(): void {
    this.removeTokenFromStorage();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'An unexpected error occurred',
      }));
      
      const apiError: ApiError = {
        message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        code: errorData.code,
      };
      
      throw apiError;
    }

    return response.json();
  }

  private getHeaders(config?: RequestConfig): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...config?.headers,
    };

    if (this.token && !config?.skipAuth) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  async request<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { skipErrorToast, ...requestConfig } = config;
    
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...requestConfig,
        headers: this.getHeaders(config),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      const apiError = error as ApiError;
      
      // Show error in console unless explicitly skipped
      if (!skipErrorToast && typeof window !== 'undefined') {
        console.error(apiError.message || 'An error occurred');
      }
      
      // Handle token expiration
      if (apiError.status === 401) {
        this.clearToken();
        // Trigger logout in auth store
        window.dispatchEvent(new CustomEvent('auth:token-expired'));
      }
      
      throw apiError;
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();
export default apiClient;