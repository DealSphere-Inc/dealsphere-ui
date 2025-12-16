/**
 * Common GraphQL types and utilities
 */

/**
 * Standard pagination input for GraphQL queries
 */
export interface PaginationInput {
  limit?: number;
  offset?: number;
  cursor?: string;
}

/**
 * Standard pagination info returned from GraphQL
 */
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
  totalCount?: number;
}

/**
 * Standard connection type for paginated results
 */
export interface Connection<T> {
  edges: Array<{
    node: T;
    cursor: string;
  }>;
  pageInfo: PageInfo;
}

/**
 * Standard filter input for queries
 */
export interface FilterInput {
  field: string;
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte' | 'in';
  value: any;
}

/**
 * Standard sort input for queries
 */
export interface SortInput {
  field: string;
  direction: 'ASC' | 'DESC';
}

/**
 * Query options that can be passed to GraphQL queries
 */
export interface QueryOptions {
  pagination?: PaginationInput;
  filters?: FilterInput[];
  sort?: SortInput[];
}

/**
 * Mutation response type
 */
export interface MutationResponse {
  success: boolean;
  message?: string;
  code?: string;
}
