/**
 * GraphQL Fragments
 *
 * This file exports reusable GraphQL fragments.
 * Fragments help avoid repeating field selections across queries.
 *
 * Usage:
 * import { FUND_FIELDS } from '@/graphql/fragments';
 *
 * const GET_FUNDS = gql`
 *   ${FUND_FIELDS}
 *   query GetFunds {
 *     funds {
 *       ...FundFields
 *     }
 *   }
 * `;
 */

import { gql } from '@apollo/client';

// ============================================================================
// FUND FRAGMENTS
// ============================================================================

export const FUND_FIELDS = gql`
  fragment FundFields on Fund {
    id
    name
    aum
    vintage
    status
    commitments
    called
    distributed
    nav
    tvpi
    dpi
    irr
  }
`;

export const FUND_DETAILS = gql`
  fragment FundDetails on Fund {
    ...FundFields
    createdAt
    updatedAt
    managementFee
    carriedInterest
    hurdle
  }
`;

// ============================================================================
// USER FRAGMENTS
// ============================================================================

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    email
    name
    role
  }
`;

// ============================================================================
// DOCUMENT FRAGMENTS
// ============================================================================

export const DOCUMENT_FIELDS = gql`
  fragment DocumentFields on Document {
    id
    name
    type
    size
    uploadDate
    url
    isFavorite
    accessLevel
    folderId
  }
`;

// ============================================================================
// ALERT FRAGMENTS
// ============================================================================

export const ALERT_FIELDS = gql`
  fragment AlertFields on Alert {
    id
    type
    title
    message
    time
    unread
  }
`;

// Add more fragments as needed...
