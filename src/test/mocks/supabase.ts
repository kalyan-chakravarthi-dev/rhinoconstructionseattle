import { vi } from "vitest";

/**
 * Comprehensive mock for the Supabase client.
 *
 * IMPORTANT: vi.mock factories are hoisted above imports, so you cannot
 * import these values and reference them in a vi.mock factory directly.
 *
 * Two approaches:
 *
 * 1) Use vi.hoisted() to inline the mocks (see useAuth.test.tsx for example)
 *
 * 2) Import this module in tests that DON'T use vi.mock for the supabase
 *    client (e.g., tests where the component already receives a mock via
 *    props or context), and use these helpers for assertions & reset:
 *
 *    import { mockSupabaseFunctions, resetSupabaseMocks } from "@/test/mocks/supabase";
 *    beforeEach(() => resetSupabaseMocks());
 */

// ── Auth ──────────────────────────────────────────────────────────────

type AuthCallback = (event: string, session: any) => void;

/** Stores the latest onAuthStateChange callback so tests can trigger auth events. */
let _authStateCallback: AuthCallback | null = null;

export const mockAuthSubscription = { unsubscribe: vi.fn() };

export const mockSupabaseAuth = {
  onAuthStateChange: vi.fn((callback: AuthCallback) => {
    _authStateCallback = callback;
    return { data: { subscription: mockAuthSubscription } };
  }),

  getSession: vi.fn().mockResolvedValue({
    data: { session: null },
  }),

  signUp: vi.fn().mockResolvedValue({
    data: { user: null, session: null },
    error: null,
  }),

  signInWithPassword: vi.fn().mockResolvedValue({
    data: { user: null, session: null },
    error: null,
  }),

  signOut: vi.fn().mockResolvedValue({ error: null }),
};

/**
 * Simulate an auth state change event in tests.
 *
 *   simulateAuthStateChange("SIGNED_IN", mockSession);
 */
export function simulateAuthStateChange(event: string, session: any) {
  if (_authStateCallback) {
    _authStateCallback(event, session);
  }
}

// ── Functions (Edge Functions) ────────────────────────────────────────

export const mockSupabaseFunctions = {
  invoke: vi.fn().mockResolvedValue({
    data: { success: true },
    error: null,
  }),
};

// ── Storage ──────────────────────────────────────────────────────────

export const mockStorageUpload = vi.fn().mockResolvedValue({ error: null });

export const mockSupabaseStorage = {
  from: vi.fn(() => ({
    upload: mockStorageUpload,
  })),
};

// ── Combined client mock ─────────────────────────────────────────────

export const mockSupabase = {
  auth: mockSupabaseAuth,
  functions: mockSupabaseFunctions,
  storage: mockSupabaseStorage,
};

// ── Reset helper ─────────────────────────────────────────────────────

/**
 * Reset all mock functions and internal state.
 * Call this in beforeEach to get a clean slate.
 */
export function resetSupabaseMocks() {
  _authStateCallback = null;

  // Auth
  mockAuthSubscription.unsubscribe.mockClear();
  mockSupabaseAuth.onAuthStateChange.mockClear();
  mockSupabaseAuth.onAuthStateChange.mockImplementation((callback: AuthCallback) => {
    _authStateCallback = callback;
    return { data: { subscription: mockAuthSubscription } };
  });
  mockSupabaseAuth.getSession.mockClear();
  mockSupabaseAuth.getSession.mockResolvedValue({ data: { session: null } });
  mockSupabaseAuth.signUp.mockClear();
  mockSupabaseAuth.signUp.mockResolvedValue({ data: { user: null, session: null }, error: null });
  mockSupabaseAuth.signInWithPassword.mockClear();
  mockSupabaseAuth.signInWithPassword.mockResolvedValue({ data: { user: null, session: null }, error: null });
  mockSupabaseAuth.signOut.mockClear();
  mockSupabaseAuth.signOut.mockResolvedValue({ error: null });

  // Functions
  mockSupabaseFunctions.invoke.mockClear();
  mockSupabaseFunctions.invoke.mockResolvedValue({ data: { success: true }, error: null });

  // Storage
  mockStorageUpload.mockClear();
  mockStorageUpload.mockResolvedValue({ error: null });
  mockSupabaseStorage.from.mockClear();
  mockSupabaseStorage.from.mockReturnValue({ upload: mockStorageUpload });
}
