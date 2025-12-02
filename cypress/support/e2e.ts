// Cypress E2E support file
// Add custom commands and global configuration here

// Example: Disable uncaught exception failures
Cypress.on('uncaught:exception', () => {
  return false;
});
