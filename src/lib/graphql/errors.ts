import { GraphQLError } from 'graphql';

/**
 * Type guard to check if error has GraphQL structure
 */
function isGraphQLErrorObject(error: any): error is {
  graphQLErrors?: readonly GraphQLError[];
  networkError?: Error | null;
  message?: string;
} {
  return error && (error.graphQLErrors !== undefined || error.networkError !== undefined);
}

/**
 * Custom error class for GraphQL errors
 */
export class GraphQLServiceError extends Error {
  public graphQLErrors: readonly GraphQLError[];
  public networkError: Error | null;

  constructor(error: any) {
    super(error?.message || 'GraphQL error occurred');
    this.name = 'GraphQLServiceError';
    this.graphQLErrors = error?.graphQLErrors || [];
    this.networkError = error?.networkError || null;
  }
}

/**
 * Extract user-friendly error message from Apollo/GraphQL errors
 */
export function getErrorMessage(error: unknown): string {
  if (isGraphQLErrorObject(error)) {
    // Return first GraphQL error message if available
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      return error.graphQLErrors[0]?.message || 'GraphQL error occurred';
    }

    // Return network error message if available
    if (error.networkError) {
      return `Network error: ${error.networkError.message}`;
    }

    // Fallback to generic error message
    return error.message || 'An error occurred';
  }

  // Handle regular Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback for unknown error types
  return 'An unknown error occurred';
}

/**
 * Check if error is a network error (no internet connection, timeout, etc.)
 */
export function isNetworkError(error: unknown): boolean {
  if (isGraphQLErrorObject(error)) {
    return error.networkError !== null && error.networkError !== undefined;
  }
  return false;
}

/**
 * Check if error is an authentication/authorization error
 */
export function isAuthError(error: unknown): boolean {
  if (isGraphQLErrorObject(error) && error.graphQLErrors) {
    return error.graphQLErrors.some(
      (err) =>
        err.extensions?.code === 'UNAUTHENTICATED' ||
        err.extensions?.code === 'FORBIDDEN'
    );
  }
  return false;
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error: unknown): boolean {
  if (isGraphQLErrorObject(error) && error.graphQLErrors) {
    return error.graphQLErrors.some(
      (err) => err.extensions?.code === 'BAD_USER_INPUT'
    );
  }
  return false;
}
