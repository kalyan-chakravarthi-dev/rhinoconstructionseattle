import { test, expect } from "@playwright/test";

const TRACKING_ID = "RQT-2026-0042";

test.describe("Quote Request Flow", () => {
  test("submit a quote request from homepage through to confirmation", async ({ page }) => {
    // Track uncaught errors
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    // Intercept the Supabase edge function — never hit real backend
    await page.route("**/functions/v1/submit-quote", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, trackingId: TRACKING_ID }),
      });
    });

    // ── 1. Homepage ───────────────────────────────────────────────
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Seattle's Trusted/i }).first()
    ).toBeVisible();

    // Click the hero CTA to start a quote
    await page.getByRole("button", { name: /Get Free Quote/i }).first().click();
    await page.waitForURL("/request-quote");

    // ── 2. Step 1: Project Details ────────────────────────────────
    await expect(
      page.getByRole("heading", { name: /Tell us about your project/i })
    ).toBeVisible();

    // Select service (Radix Select)
    await page.getByLabel("Service Requested").click();
    await page.getByRole("option", { name: "Kitchen Remodeling" }).click();

    // Select project size (Radix Select)
    await page.getByLabel("Project Size").click();
    await page.getByRole("option", { name: /Medium/i }).click();

    // Enter city (state defaults to "WA")
    await page.getByLabel("City").fill("Seattle");

    // Continue to step 2
    await page.getByRole("button", { name: /Continue/i }).click();

    // ── 3. Step 2: Photos — skip ──────────────────────────────────
    await expect(
      page.getByRole("heading", { name: /Upload photos/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /Skip this step/i }).click();

    // ── 4. Step 3: Contact Info & Submit ──────────────────────────
    await expect(
      page.getByRole("heading", { name: /How can we reach you/i })
    ).toBeVisible();

    await page.getByLabel("Full Name").fill("Jane Doe");
    await page.getByLabel("Email").fill("jane@example.com");
    await page.getByLabel("Phone").fill("2065551234");

    // Verify inline summary shows our selections
    await expect(page.getByText("Kitchen Remodeling").last()).toBeVisible();
    await expect(page.getByText("Seattle, WA")).toBeVisible();

    // Submit the form
    await page.getByRole("button", { name: /Get Free Quote/i }).click();

    // ── 5. Confirmation Page ──────────────────────────────────────
    await page.waitForURL(/\/request-quote\/confirmation/);

    await expect(
      page.getByRole("heading", { name: /Request Submitted Successfully/i })
    ).toBeVisible();

    // Tracking ID is displayed and matches RQT-YYYY-XXXX format
    const trackingText = page.getByText(TRACKING_ID);
    await expect(trackingText).toBeVisible();
    const idValue = await trackingText.textContent();
    expect(idValue).toMatch(/^RQT-\d{4}-\d{4}$/);

    // "What Happens Next" section present
    await expect(page.getByText("What Happens Next")).toBeVisible();

    // ── 6. No uncaught errors ─────────────────────────────────────
    expect(pageErrors).toEqual([]);
  });
});
