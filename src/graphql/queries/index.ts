/**
 * GraphQL Queries
 *
 * This file exports all GraphQL queries used in the application.
 * Queries are organized by domain and imported from separate files.
 *
 * Usage in services:
 * import { GET_FUNDS } from '@/graphql/queries';
 * import { apolloClient } from '@/lib/graphql/client';
 *
 * const { data } = await apolloClient.query({ query: GET_FUNDS });
 */

import { gql } from '@apollo/client';

// ============================================================================
// FUNDS QUERIES
// ============================================================================

export const GET_FUNDS = gql`
  query GetFunds {
    funds {
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
  }
`;

export const GET_FUND_BY_ID = gql`
  query GetFundById($id: ID!) {
    fund(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;

// ============================================================================
// ALERTS QUERIES
// ============================================================================

export const GET_ALERTS = gql`
  query GetAlerts {
    alerts {
      id
      type
      title
      message
      time
      unread
    }
  }
`;

// ============================================================================
// DOCUMENTS QUERIES
// ============================================================================

export const GET_DOCUMENTS = gql`
  query GetDocuments {
    documents {
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
    folders {
      id
      name
      color
      parentId
    }
  }
`;

// ============================================================================
// PORTFOLIO QUERIES
// ============================================================================

export const GET_PORTFOLIO_COMPANIES = gql`
  query GetPortfolioCompanies {
    portfolioCompanies {
      id
      name
      industry
      stage
      investmentDate
      amount
      ownership
      currentValue
      performance
    }
  }
`;

// ============================================================================
// PIPELINE QUERIES
// ============================================================================

export const GET_PIPELINE_DEALS = gql`
  query GetPipelineDeals {
    pipelineDeals {
      id
      name
      stage
      amount
      sector
      lead
      lastActivity
      score
    }
  }
`;

// Add more queries as needed...
