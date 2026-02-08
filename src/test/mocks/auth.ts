import { vi } from "vitest";

/**
 * Default mock values for the useAuth hook.
 * Override individual fields per test as needed.
 */
export const mockAuthValues = {
  user: null as Record<string, unknown> | null,
  session: null as Record<string, unknown> | null,
  loading: false,
  signUp: vi.fn().mockResolvedValue({ error: null }),
  signIn: vi.fn().mockResolvedValue({ error: null }),
  signOut: vi.fn().mockResolvedValue(undefined),
};

/**
 * Creates a mock authenticated user for testing.
 */
export function createMockUser(overrides = {}) {
  return {
    id: "test-user-id",
    email: "john@example.com",
    user_metadata: {
      firstName: "John",
      lastName: "Smith",
    },
    ...overrides,
  };
}

/**
 * Creates a mock session for testing.
 */
export function createMockSession(overrides = {}) {
  return {
    access_token: "mock-access-token",
    refresh_token: "mock-refresh-token",
    user: createMockUser(),
    ...overrides,
  };
}
