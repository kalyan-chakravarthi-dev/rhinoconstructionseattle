import { test, expect } from "@playwright/test";

test.describe("Hero layout – desktop (≥1024px)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("desktop hero section is visible and full-height", async ({ page }) => {
    const desktopHero = page.locator("section.relative > div.hidden.lg\\:flex");
    await expect(desktopHero).toBeVisible();

    const box = await desktopHero.boundingBox();
    expect(box).not.toBeNull();
    // Must be at least 90% of viewport height (min-h-screen)
    expect(box!.height).toBeGreaterThanOrEqual(800 * 0.9);
  });

  test("mobile hero section is hidden on desktop", async ({ page }) => {
    const mobileHero = page.locator("section.relative > div.lg\\:hidden");
    await expect(mobileHero).toBeHidden();
  });

  test("background image is absolutely positioned (full-bleed)", async ({
    page,
  }) => {
    const imgContainer = page.locator(
      "section.relative > div.hidden.lg\\:flex > div.absolute.inset-0"
    );
    await expect(imgContainer).toBeAttached();

    const position = await imgContainer.evaluate(
      (el) => getComputedStyle(el).position
    );
    expect(position).toBe("absolute");

    const img = imgContainer.locator("img");
    await expect(img).toBeAttached();
  });

  test("dark gradient overlay exists on desktop", async ({ page }) => {
    const gradient = page.locator(
      "section.relative > div.hidden.lg\\:flex > div.absolute.inset-0 > div.absolute.inset-0"
    );
    await expect(gradient).toBeAttached();
  });

  test("content overlays the image (z-10, not below it)", async ({ page }) => {
    const heroSection = page.locator("section.relative > div.hidden.lg\\:flex");
    const content = heroSection.locator("div.relative.z-10");
    await expect(content).toBeVisible();

    const heroBox = await heroSection.boundingBox();
    const contentBox = await content.boundingBox();
    expect(heroBox).not.toBeNull();
    expect(contentBox).not.toBeNull();

    // Content must be within the hero bounds (overlaid, not below)
    expect(contentBox!.y).toBeGreaterThanOrEqual(heroBox!.y);
    expect(contentBox!.y + contentBox!.height).toBeLessThanOrEqual(
      heroBox!.y + heroBox!.height + 1
    );
  });

  test("h1 heading is visible on desktop", async ({ page }) => {
    const desktopHero = page.locator("section.relative > div.hidden.lg\\:flex");
    const heading = desktopHero.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });

  test("CTAs are side-by-side on desktop", async ({ page }) => {
    const desktopHero = page.locator("section.relative > div.hidden.lg\\:flex");
    const ctas = desktopHero.locator("div.flex.flex-row a");
    const count = await ctas.count();
    expect(count).toBe(2);

    const firstBox = await ctas.nth(0).boundingBox();
    const secondBox = await ctas.nth(1).boundingBox();
    expect(firstBox).not.toBeNull();
    expect(secondBox).not.toBeNull();

    // Side-by-side: same vertical position (within 5px tolerance)
    expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(5);
  });

  test("trust badges are in 4-column grid on desktop", async ({ page }) => {
    const desktopHero = page.locator("section.relative > div.hidden.lg\\:flex");
    const badges = desktopHero.locator("div.grid.grid-cols-4 > div");
    await expect(badges).toHaveCount(4);

    // All 4 badges should be on the same row
    const boxes = await Promise.all(
      [0, 1, 2, 3].map((i) => badges.nth(i).boundingBox())
    );
    for (const box of boxes) expect(box).not.toBeNull();

    // Same vertical position (within 5px)
    for (let i = 1; i < boxes.length; i++) {
      expect(Math.abs(boxes[i]!.y - boxes[0]!.y)).toBeLessThan(5);
    }
  });

  test("scroll indicator is visible on desktop", async ({ page }) => {
    const scrollIndicator = page.locator(
      "section.relative > div.hidden.lg\\:flex > div.absolute.bottom-8.animate-bounce"
    );
    await expect(scrollIndicator).toBeVisible();
  });
});

test.describe("Hero layout – mobile (<1024px)", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("mobile hero section is visible", async ({ page }) => {
    const mobileHero = page.locator("section.relative > div.lg\\:hidden");
    await expect(mobileHero).toBeVisible();
  });

  test("desktop hero section is hidden on mobile", async ({ page }) => {
    const desktopHero = page.locator("section.relative > div.hidden.lg\\:flex");
    await expect(desktopHero).toBeHidden();
  });

  test("image is a banner above content (not full-bleed background)", async ({
    page,
  }) => {
    const mobileHero = page.locator("section.relative > div.lg\\:hidden");

    // Image container should be in normal flow (relative, not absolute)
    const imgContainer = mobileHero.locator("div.relative.aspect-\\[16\\/10\\]");
    await expect(imgContainer).toBeVisible();

    const position = await imgContainer.evaluate(
      (el) => getComputedStyle(el).position
    );
    expect(position).toBe("relative");
  });

  test("content section has dark background below image", async ({ page }) => {
    const mobileHero = page.locator("section.relative > div.lg\\:hidden");
    const content = mobileHero.locator("div.bg-foreground");
    await expect(content).toBeVisible();

    const imgContainer = mobileHero.locator("div.relative.aspect-\\[16\\/10\\]");
    const imgBox = await imgContainer.boundingBox();
    const contentBox = await content.boundingBox();
    expect(imgBox).not.toBeNull();
    expect(contentBox).not.toBeNull();

    // Content must be below the image
    expect(contentBox!.y).toBeGreaterThanOrEqual(imgBox!.y + imgBox!.height - 1);
  });

  test("h1 heading is visible on mobile", async ({ page }) => {
    const mobileHero = page.locator("section.relative > div.lg\\:hidden");
    const heading = mobileHero.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });

  test("CTAs are stacked vertically on mobile", async ({ page }) => {
    const mobileHero = page.locator("section.relative > div.lg\\:hidden");
    const ctas = mobileHero.locator("div.flex.flex-col a");
    const count = await ctas.count();
    expect(count).toBe(2);

    const firstBox = await ctas.nth(0).boundingBox();
    const secondBox = await ctas.nth(1).boundingBox();
    expect(firstBox).not.toBeNull();
    expect(secondBox).not.toBeNull();

    // Stacked: second CTA below first
    expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height - 1);
  });

  test("trust badges are in 2-column grid on mobile", async ({ page }) => {
    const mobileHero = page.locator("section.relative > div.lg\\:hidden");
    const badges = mobileHero.locator("div.grid.grid-cols-2 > div");
    await expect(badges).toHaveCount(4);

    // First two badges on same row
    const box0 = await badges.nth(0).boundingBox();
    const box1 = await badges.nth(1).boundingBox();
    expect(box0).not.toBeNull();
    expect(box1).not.toBeNull();
    expect(Math.abs(box0!.y - box1!.y)).toBeLessThan(5);

    // Third badge on next row (below first)
    const box2 = await badges.nth(2).boundingBox();
    expect(box2).not.toBeNull();
    expect(box2!.y).toBeGreaterThan(box0!.y + box0!.height - 1);
  });
});
