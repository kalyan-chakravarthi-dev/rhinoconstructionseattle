import { describe, it, expect, vi, beforeEach } from "vitest";
import { Routes, Route } from "react-router-dom";
import { renderWithProviders, screen } from "@/test/test-utils";
import ProtectedRoute from "@/components/ProtectedRoute";
import { mockAuthValues, createMockUser } from "@/test/mocks/auth";

// Mock the useAuth hook
vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => mockAuthValues,
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    // Reset to unauthenticated by default
    mockAuthValues.user = null;
    mockAuthValues.session = null;
    mockAuthValues.loading = false;
  });

  it("shows loading spinner while auth is loading", () => {
    mockAuthValues.loading = true;

    renderWithProviders(
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>Dashboard</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    );

    // Spinner is present (animated div)
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("redirects to /sign-in when user is not authenticated", () => {
    mockAuthValues.user = null;

    renderWithProviders(
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div>Dashboard</div>
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in" element={<div>Sign In Page</div>} />
      </Routes>,
      { route: "/dashboard" }
    );

    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    expect(screen.getByText("Sign In Page")).toBeInTheDocument();
  });

  it("renders children when user is authenticated", () => {
    mockAuthValues.user = createMockUser();

    renderWithProviders(
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div>Dashboard Content</div>
            </ProtectedRoute>
          }
        />
      </Routes>,
      { route: "/dashboard" }
    );

    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
  });

  it("does not show spinner when loading is false", () => {
    mockAuthValues.loading = false;
    mockAuthValues.user = createMockUser();

    renderWithProviders(
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>Content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    );

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).not.toBeInTheDocument();
  });
});
