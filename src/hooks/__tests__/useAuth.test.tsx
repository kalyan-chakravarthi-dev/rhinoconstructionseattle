import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { ReactNode } from "react";

// Use vi.hoisted so mock values are available before vi.mock factory runs
const { mockAuth, mockSubscription, simulateAuthChange, resetMocks } = vi.hoisted(() => {
  type AuthCallback = (event: string, session: any) => void;
  let _callback: AuthCallback | null = null;

  const subscription = { unsubscribe: vi.fn() };

  const auth = {
    onAuthStateChange: vi.fn((cb: AuthCallback) => {
      _callback = cb;
      return { data: { subscription } };
    }),
    getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    signUp: vi.fn().mockResolvedValue({ data: { user: null, session: null }, error: null }),
    signInWithPassword: vi.fn().mockResolvedValue({ data: { user: null, session: null }, error: null }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
  };

  function simulateAuthChange(event: string, session: any) {
    if (_callback) _callback(event, session);
  }

  function resetMocks() {
    _callback = null;
    subscription.unsubscribe.mockClear();
    auth.onAuthStateChange.mockClear();
    auth.onAuthStateChange.mockImplementation((cb: AuthCallback) => {
      _callback = cb;
      return { data: { subscription } };
    });
    auth.getSession.mockClear();
    auth.getSession.mockResolvedValue({ data: { session: null } });
    auth.signUp.mockClear();
    auth.signUp.mockResolvedValue({ data: { user: null, session: null }, error: null });
    auth.signInWithPassword.mockClear();
    auth.signInWithPassword.mockResolvedValue({ data: { user: null, session: null }, error: null });
    auth.signOut.mockClear();
    auth.signOut.mockResolvedValue({ error: null });
  }

  return { mockAuth: auth, mockSubscription: subscription, simulateAuthChange, resetMocks };
});

// Now the mock factory can safely reference hoisted values
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: mockAuth },
}));

// Import after mock is set up
import { AuthProvider, useAuth } from "@/hooks/useAuth";

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe("useAuth", () => {
  beforeEach(() => {
    resetMocks();
    localStorage.clear();
  });

  it("throws when used outside AuthProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used within an AuthProvider");

    spy.mockRestore();
  });

  it("starts in a loading state", () => {
    mockAuth.getSession.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
  });

  it("resolves to unauthenticated when no session exists", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
  });

  it("resolves to authenticated when a session exists", async () => {
    const mockSession = {
      access_token: "token",
      user: { id: "u1", email: "test@example.com" },
    };

    mockAuth.getSession.mockResolvedValue({
      data: { session: mockSession },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockSession.user);
    expect(result.current.session).toEqual(mockSession);
  });

  it("sets up an auth state listener on mount", () => {
    renderHook(() => useAuth(), { wrapper });

    expect(mockAuth.onAuthStateChange).toHaveBeenCalledTimes(1);
    expect(mockAuth.onAuthStateChange).toHaveBeenCalledWith(expect.any(Function));
  });

  it("unsubscribes from auth state listener on unmount", () => {
    const { unmount } = renderHook(() => useAuth(), { wrapper });
    unmount();

    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });

  it("updates user/session when onAuthStateChange fires SIGNED_IN", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const newSession = {
      access_token: "new-token",
      user: { id: "u2", email: "signed-in@example.com" },
    };

    act(() => {
      simulateAuthChange("SIGNED_IN", newSession);
    });

    expect(result.current.user).toEqual(newSession.user);
    expect(result.current.session).toEqual(newSession);
  });

  it("clears user/session when onAuthStateChange fires SIGNED_OUT", async () => {
    const existingSession = {
      access_token: "token",
      user: { id: "u1", email: "test@example.com" },
    };

    mockAuth.getSession.mockResolvedValue({
      data: { session: existingSession },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).toEqual(existingSession.user);
    });

    act(() => {
      simulateAuthChange("SIGNED_OUT", null);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
  });

  // ── signUp ──────────────────────────────────────────────────────────

  it("signUp calls supabase.auth.signUp with correct params", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.signUp("test@example.com", "password123", {
        firstName: "Jane",
        lastName: "Doe",
      });
    });

    expect(mockAuth.signUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      options: {
        emailRedirectTo: window.location.origin,
        data: { firstName: "Jane", lastName: "Doe" },
      },
    });
  });

  it("signUp returns error: null on success", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let response: { error: Error | null } | undefined;
    await act(async () => {
      response = await result.current.signUp("test@example.com", "pass123");
    });

    expect(response!.error).toBeNull();
  });

  it("signUp returns the error from Supabase on failure", async () => {
    mockAuth.signUp.mockResolvedValue({
      error: new Error("Email already in use"),
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let response: { error: Error | null } | undefined;
    await act(async () => {
      response = await result.current.signUp("existing@example.com", "pass");
    });

    expect(response!.error).toBeInstanceOf(Error);
    expect(response!.error!.message).toBe("Email already in use");
  });

  it("signUp catches thrown exceptions", async () => {
    mockAuth.signUp.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let response: { error: Error | null } | undefined;
    await act(async () => {
      response = await result.current.signUp("test@example.com", "pass");
    });

    expect(response!.error).toBeInstanceOf(Error);
    expect(response!.error!.message).toBe("Network error");
  });

  // ── signIn ──────────────────────────────────────────────────────────

  it("signIn calls supabase.auth.signInWithPassword", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.signIn("test@example.com", "password123");
    });

    expect(mockAuth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("signIn returns error: null on success", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let response: { error: Error | null } | undefined;
    await act(async () => {
      response = await result.current.signIn("test@example.com", "pass");
    });

    expect(response!.error).toBeNull();
  });

  it("signIn returns the error from Supabase on failure", async () => {
    mockAuth.signInWithPassword.mockResolvedValue({
      error: new Error("Invalid credentials"),
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let response: { error: Error | null } | undefined;
    await act(async () => {
      response = await result.current.signIn("wrong@example.com", "bad");
    });

    expect(response!.error).toBeInstanceOf(Error);
    expect(response!.error!.message).toBe("Invalid credentials");
  });

  it("signIn catches thrown exceptions", async () => {
    mockAuth.signInWithPassword.mockRejectedValue(new Error("Timeout"));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let response: { error: Error | null } | undefined;
    await act(async () => {
      response = await result.current.signIn("test@example.com", "pass");
    });

    expect(response!.error).toBeInstanceOf(Error);
    expect(response!.error!.message).toBe("Timeout");
  });

  // ── signOut ─────────────────────────────────────────────────────────

  it("signOut calls supabase.auth.signOut", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.signOut();
    });

    expect(mockAuth.signOut).toHaveBeenCalledTimes(1);
  });

  it("signOut clears legacy localStorage items", async () => {
    localStorage.setItem("rhinoUser", "data");
    localStorage.setItem("signInData", "data");
    localStorage.setItem("signUpData", "data");

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.signOut();
    });

    expect(localStorage.getItem("rhinoUser")).toBeNull();
    expect(localStorage.getItem("signInData")).toBeNull();
    expect(localStorage.getItem("signUpData")).toBeNull();
  });
});
