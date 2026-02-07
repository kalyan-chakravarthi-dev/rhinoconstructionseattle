import { describe, it, expect, beforeEach } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/test/test-utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import i18n from "@/i18n";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    i18n.changeLanguage("en");
  });

  it("renders a button trigger", () => {
    renderWithProviders(<LanguageSwitcher />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("shows English label in default variant", () => {
    renderWithProviders(<LanguageSwitcher variant="default" />);

    expect(screen.getByText(/English/)).toBeInTheDocument();
  });

  it("renders in compact variant without crashing", () => {
    renderWithProviders(<LanguageSwitcher variant="compact" />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("opens dropdown and shows language options when clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LanguageSwitcher variant="default" />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    // Radix renders menu items with role="menuitem"
    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems.length).toBe(2);

    // Check text content of menu items
    const texts = menuItems.map((item) => item.textContent);
    expect(texts).toContain("🇺🇸English");
    expect(texts).toContain("🇪🇸Español");
  });

  it("switches language to Spanish when Español option is clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LanguageSwitcher variant="default" />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const menuItems = screen.getAllByRole("menuitem");
    const spanishOption = menuItems.find((item) => item.textContent?.includes("Español"));
    expect(spanishOption).toBeDefined();

    await user.click(spanishOption!);

    expect(i18n.language).toBe("es");
  });

  it("accepts className prop", () => {
    renderWithProviders(<LanguageSwitcher className="custom-class" />);

    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
  });
});
