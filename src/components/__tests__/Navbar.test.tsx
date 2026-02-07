import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/test/test-utils";
import Navbar from "@/components/Navbar";
import { COMPANY_INFO } from "@/lib/constants";

// Mock the logo imports to avoid asset loading issues in tests
vi.mock("@/assets/rhino-logo-new.png", () => ({ default: "mock-logo.png" }));

describe("Navbar", () => {
  it("renders navigation links", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Services").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About Us").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });

  it("displays the company phone number", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText(COMPANY_INFO.phone)).toBeInTheDocument();
  });

  it("has a phone link with correct tel: href", () => {
    renderWithProviders(<Navbar />);

    const phoneLink = screen.getByText(COMPANY_INFO.phone).closest("a");
    expect(phoneLink).toHaveAttribute("href", `tel:${COMPANY_INFO.phoneRaw}`);
  });

  it("renders the Request Quote CTA button", () => {
    renderWithProviders(<Navbar />);

    const ctaButtons = screen.getAllByText("Request Quote");
    expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the logo with correct alt text", () => {
    renderWithProviders(<Navbar />);

    const logos = screen.getAllByAltText("Rhino Remodeler");
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it("highlights Home link as active when on homepage", () => {
    renderWithProviders(<Navbar />, { route: "/" });

    // Desktop nav: the Home link should have the active color class
    const homeLinks = screen.getAllByText("Home");
    const desktopHomeLink = homeLinks[0];
    expect(desktopHomeLink.className).toContain("text-secondary");
  });

  it("highlights Services link as active when on /services", () => {
    renderWithProviders(<Navbar />, { route: "/services" });

    const servicesLinks = screen.getAllByText("Services");
    const desktopServicesLink = servicesLinks[0];
    expect(desktopServicesLink.className).toContain("text-secondary");
  });

  it("has an Open menu button for mobile", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("has a Close menu button in the mobile drawer", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  it("renders Request Quote link pointing to /request-quote", () => {
    renderWithProviders(<Navbar />);

    const ctaLinks = screen.getAllByText("Request Quote");
    const link = ctaLinks[0].closest("a");
    expect(link).toHaveAttribute("href", "/request-quote");
  });
});
