import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads with hero heading", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Seattle's Trusted/i }).first()).toBeVisible();
  });

  test("homepage has Get Free Quote CTA", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("button", { name: /Get Free Quote/i })).toBeVisible();
  });

  test("navbar renders navigation links", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Home" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Services" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "About Us" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact" }).first()).toBeVisible();
  });

  test("footer displays company phone and email", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "(206) 487-9677" })).toBeVisible();
    await expect(footer.getByText("francisco@rhinoremodeler.com")).toBeVisible();
  });

  test("navigate to Services page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Services" }).first().click();
    await page.waitForURL("/services");

    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("About page loads", async ({ page }) => {
    await page.goto("/about");

    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("Contact page loads", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("FAQ page loads", async ({ page }) => {
    await page.goto("/faq");

    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("Request Quote page loads", async ({ page }) => {
    await page.goto("/request-quote");

    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("404 page for invalid route", async ({ page }) => {
    await page.goto("/this-does-not-exist");

    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Page not found")).toBeVisible();
    await expect(page.getByRole("link", { name: /Return to Home/i })).toBeVisible();
  });
});
