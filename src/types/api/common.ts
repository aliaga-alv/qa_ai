/**
 * Shared API types and interfaces
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Error response from API
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string | string[]>;
    field?: string;
  };
  statusCode: number;
}

/**
 * Pagination parameters for list requests
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * Filter parameters for list requests
 */
export interface FilterParams {
  search?: string;
  status?: string;
  type?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Generic success response
 */
export interface SuccessResponse {
  success: true;
  message: string;
}
