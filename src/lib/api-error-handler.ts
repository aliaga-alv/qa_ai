export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class ApiErrorHandler {
  static normalize(error: unknown): ApiError {
    // Check if error is an object with response property
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: {
          data?: {
            code?: string;
            message?: string;
            field?: string;
            details?: Record<string, unknown>;
          };
          status?: number;
        };
        request?: unknown;
      };
      if (axiosError.response) {
        return {
          code: axiosError.response.data?.code || 'API_ERROR',
          message: axiosError.response.data?.message || 'An error occurred',
          field: axiosError.response.data?.field,
          details: axiosError.response.data?.details,
          statusCode: axiosError.response.status || 500,
        };
      }

      if (axiosError.request) {
        return {
          code: 'NETWORK_ERROR',
          message: 'Network error. Please check your connection.',
          statusCode: 0,
        };
      }
    }

    // Handle other error types
    const message =
      error && typeof error === 'object' && 'message' in error && typeof error.message === 'string'
        ? error.message
        : 'An unexpected error occurred';
    return {
      code: 'UNKNOWN_ERROR',
      message,
      statusCode: 500,
    };
  }

  static handle(error: ApiError) {
    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('API Error:', error);
    }

    // TODO: Add toast notification when implemented
    // if (showToast) {
    //   toast.error(error.message);
    // }

    return error;
  }
}
