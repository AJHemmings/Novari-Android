// API client - auth-aware HTTP wrapper
// Handles:
// - Adding Authorization header to requests
// - Automatic token refresh if access token expires
// - Error handling
//
// Usage in hooks:
// const response = await apiClient.get('/embers');
// const response = await apiClient.post('/tasks/1/complete', {});

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Get Authorization header value
   * Called before each request to include JWT token
   * @returns Authorization header (e.g. "Bearer token123...")
   */
  async getAuthHeader() {
    // TODO: Get token from secure storage
    // import * as SecureStore from 'expo-secure-store';
    // const token = await SecureStore.getItemAsync('accessToken');
    // return token ? `Bearer ${token}` : '';
    return '';
  }

  /**
   * Generic request method
   * @param method - HTTP method (GET, POST, etc)
   * @param endpoint - API path (e.g. '/embers')
   * @param body - Request body (optional)
   * @returns Response data
   */
  async request(method, endpoint, body = null) {
    const url = `${this.baseURL}${endpoint}`;
    const authHeader = await this.getAuthHeader();

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      // Handle 401 - token expired
      if (response.status === 401) {
        // TODO: Attempt token refresh
        // If refresh fails, redirect to login
        throw new Error('Unauthorized - please login again');
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Convenience methods
  get(endpoint) {
    return this.request('GET', endpoint);
  }

  post(endpoint, body) {
    return this.request('POST', endpoint, body);
  }

  patch(endpoint, body) {
    return this.request('PATCH', endpoint, body);
  }

  delete(endpoint) {
    return this.request('DELETE', endpoint);
  }
}

export default new ApiClient();
