import { isMockMode } from '@/config/data-mode';
import {
  mockFilingDeadline,
  mockPortfolioTax,
  mockTaxDocuments,
  mockTaxSummaries,
} from '@/data/mocks/back-office/tax-center';

export function getTaxFilingDeadline() {
  if (isMockMode()) return mockFilingDeadline;
  throw new Error('Tax center API not implemented yet');
}

export function getTaxDocuments() {
  if (isMockMode()) return mockTaxDocuments;
  throw new Error('Tax center API not implemented yet');
}

export function getTaxSummaries() {
  if (isMockMode()) return mockTaxSummaries;
  throw new Error('Tax center API not implemented yet');
}

export function getPortfolioTax() {
  if (isMockMode()) return mockPortfolioTax;
  throw new Error('Tax center API not implemented yet');
}
