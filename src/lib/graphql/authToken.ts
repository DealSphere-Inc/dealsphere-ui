/**
 * Get the authentication token from localStorage
 * This will be used by the Apollo Client auth link to add auth headers
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return null;
  }

  try {
    // Get the user from localStorage (matches auth saga pattern)
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return null;

    const user = JSON.parse(savedUser);
    // Return token if it exists on user object
    // For now, we'll use email as identifier until backend provides real tokens
    return user.email || null;
  } catch (error) {
    console.error('Failed to get auth token', error);
    return null;
  }
}

/**
 * Set the authentication token (for future use when backend provides JWT)
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.setItem('auth-token', token);
  } catch (error) {
    console.error('Failed to set auth token', error);
  }
}

/**
 * Clear the authentication token
 */
export function clearAuthToken(): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem('auth-token');
  } catch (error) {
    console.error('Failed to clear auth token', error);
  }
}
