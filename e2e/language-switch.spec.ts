import { test, expect } from "@playwright/test";

test.describe("Language Switch", () => {
  test("switches UI from English to Spanish and back", async ({ page }) => {
    await page.goto("/");

    // ── Verify default English ────────────────────────────────────
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "Home" }).first()).toBeVisible();
    // Services is a mega menu trigger (button), not a direct link
    await expect(nav.getByRole("button", { name: /Services/i }).first()).toBeVisible();
    await expect(nav.getByRole("link", { name: "About Us" }).first()).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contact" }).first()).toBeVisible();

    // ── Switch to Spanish ─────────────────────────────────────────
    const langTrigger = page.getByRole("button").filter({ hasText: "🇺🇸" }).first();
    await langTrigger.click();
    await page.getByRole("menuitem", { name: /Español/ }).click();

    // Nav links update to Spanish
    await expect(nav.getByRole("link", { name: "Inicio" }).first()).toBeVisible();
    await expect(nav.getByRole("button", { name: /Servicios/i }).first()).toBeVisible();
    await expect(nav.getByRole("link", { name: "Sobre Nosotros" }).first()).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contacto" }).first()).toBeVisible();

    // Hero heading updates to Spanish
    await expect(
      page.getByRole("heading", { name: /Expertos de Confianza/i }).first()
    ).toBeVisible();

    // ── Switch back to English ────────────────────────────────────
    const langTriggerEs = page.getByRole("button").filter({ hasText: "🇪🇸" }).first();
    await langTriggerEs.click();
    await page.getByRole("menuitem", { name: /English/ }).click();

    // Nav links revert to English
    await expect(nav.getByRole("link", { name: "Home" }).first()).toBeVisible();
    await expect(nav.getByRole("button", { name: /Services/i }).first()).toBeVisible();

    // Hero heading reverts to English
    await expect(
      page.getByRole("heading", { name: /Seattle's Trusted/i }).first()
    ).toBeVisible();
  });
});
