import { test, expect, Page } from "@playwright/test";

const PROJECT_REF = "xabppqjqqombndystdps";

const MOCK_USER = {
  id: "e2e-test-user-id",
  aud: "authenticated",
  role: "authenticated",
  email: "testuser@example.com",
  email_confirmed_at: "2024-01-01T00:00:00Z",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  user_metadata: { firstName: "Test", lastName: "User" },
  app_metadata: { provider: "email", providers: ["email"] },
};

/**
 * Seed a fake Supabase session into localStorage and intercept auth
 * endpoints so the app thinks a user is signed in.
 */
async function authenticateViaStorage(page: Page) {
  // Compute expires_at in the browser so clocks always agree
  await page.addInitScript(
    ({ key, user }) => {
      const session = {
        access_token: "e2e-mock-access-token",
        token_type: "bearer",
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        refresh_token: "e2e-mock-refresh-token",
        user,
      };
      localStorage.setItem(key, JSON.stringify(session));
    },
    { key: `sb-${PROJECT_REF}-auth-token`, user: MOCK_USER }
  );

  // Intercept Supabase auth API calls to prevent real network traffic
  await page.route(`**/${PROJECT_REF}.supabase.co/auth/**`, async (route) => {
    const url = route.request().url();

    if (url.includes("/token")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          access_token: "e2e-mock-access-token",
          token_type: "bearer",
          expires_in: 3600,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          refresh_token: "e2e-mock-refresh-token",
          user: MOCK_USER,
        }),
      });
    } else if (url.includes("/user")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_USER),
      });
    } else {
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    }
  });
}

test.describe("Dashboard", () => {
  test("redirects to sign-in when not authenticated", async ({ page }) => {
    await page.goto("/dashboard");

    await page.waitForURL("/sign-in");
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("loads dashboard when authenticated", async ({ page }) => {
    await authenticateViaStorage(page);
    await page.goto("/dashboard");

    // Dashboard heading visible
    await expect(
      page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();

    // Welcome message uses firstName from user_metadata
    await expect(
      page.getByRole("heading", { name: /Welcome back, Test!/i })
    ).toBeVisible();

    // Stats cards rendered
    await expect(page.getByText("Active Quotes")).toBeVisible();
    await expect(page.getByText("Scheduled Appointments")).toBeVisible();
    await expect(page.getByText("Completed Projects")).toBeVisible();

    // Recent activity section
    await expect(page.getByText("Recent Activity")).toBeVisible();
    await expect(page.getByText("Kitchen Remodeling")).toBeVisible();
    await expect(page.getByText("Bathroom Renovation")).toBeVisible();

    // Quick actions
    await expect(page.getByText("Quick Actions")).toBeVisible();
  });

  test("sidebar navigation items are present", async ({ page }) => {
    await authenticateViaStorage(page);
    await page.goto("/dashboard");

    const sidebar = page.locator("aside");
    await expect(sidebar.getByRole("button", { name: "My Quotes" })).toBeVisible();
    await expect(sidebar.getByRole("button", { name: "Appointments" })).toBeVisible();
    await expect(sidebar.getByRole("button", { name: "Projects" })).toBeVisible();
    await expect(sidebar.getByRole("button", { name: "Settings" })).toBeVisible();
  });
});
