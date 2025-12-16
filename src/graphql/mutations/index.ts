/**
 * GraphQL Mutations
 *
 * This file exports all GraphQL mutations used in the application.
 * Mutations are organized by domain and imported from separate files.
 *
 * Usage in services:
 * import { CREATE_DOCUMENT } from '@/graphql/mutations';
 * import { apolloClient } from '@/lib/graphql/client';
 *
 * const { data } = await apolloClient.mutate({
 *   mutation: CREATE_DOCUMENT,
 *   variables: { input },
 * });
 */

import { gql } from '@apollo/client';

// ============================================================================
// AUTH MUTATIONS
// ============================================================================

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

// ============================================================================
// DOCUMENTS MUTATIONS
// ============================================================================

export const CREATE_DOCUMENT = gql`
  mutation CreateDocument($input: CreateDocumentInput!) {
    createDocument(input: $input) {
      id
      name
      type
      size
      uploadDate
      url
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation DeleteDocument($id: ID!) {
    deleteDocument(id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_DOCUMENT_ACCESS = gql`
  mutation UpdateDocumentAccess($id: ID!, $accessLevel: AccessLevel!) {
    updateDocumentAccess(id: $id, accessLevel: $accessLevel) {
      id
      accessLevel
    }
  }
`;

// ============================================================================
// ALERTS MUTATIONS
// ============================================================================

export const MARK_ALERT_READ = gql`
  mutation MarkAlertRead($id: ID!) {
    markAlertRead(id: $id) {
      id
      unread
    }
  }
`;

// Add more mutations as needed...
