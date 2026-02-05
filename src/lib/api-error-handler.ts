export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
  statusCode: number;
  validationErrors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Backend error structure
interface BackendErrorResponse {
  success: number;
  errors?: Array<{
    message: string;
    errors?: Record<string, string[]>;
  }>;
}

export class ApiErrorHandler {
  /**
   * Format validation errors into a readable message
   */
  private static formatValidationErrors(errors: Record<string, string[]>): string {
    const messages: string[] = [];
    
    for (const [field, fieldErrors] of Object.entries(errors)) {
      // Capitalize field name and replace underscores with spaces
      const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      fieldErrors.forEach((error) => {
        messages.push(`${fieldName}: ${error}`);
      });
    }
    
    return messages.join('\n');
  }

  static normalize(error: unknown): ApiError {
    // Check if error is an object with response property
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: {
          data?: BackendErrorResponse | {
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
        const responseData = axiosError.response.data;
        
        // Check if it's the backend error format with validation errors
        if (
          responseData &&
          'success' in responseData &&
          responseData.success === 0 &&
          'errors' in responseData &&
          Array.isArray(responseData.errors) &&
          responseData.errors.length > 0
        ) {
          const backendError = responseData.errors[0];
          const validationErrors = backendError.errors;
          
          // If there are validation errors, format them nicely
          if (validationErrors && Object.keys(validationErrors).length > 0) {
            return {
              code: 'VALIDATION_ERROR',
              message: this.formatValidationErrors(validationErrors),
              validationErrors,
              statusCode: axiosError.response.status || 422,
            };
          }
          
          // Otherwise use the general message
          return {
            code: 'API_ERROR',
            message: backendError.message || 'An error occurred',
            statusCode: axiosError.response.status || 400,
          };
        }
        
        // Fallback to old format
        return {
          code: (responseData as any)?.code || 'API_ERROR',
          message: (responseData as any)?.message || 'An error occurred',
          field: (responseData as any)?.field,
          details: (responseData as any)?.details,
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
