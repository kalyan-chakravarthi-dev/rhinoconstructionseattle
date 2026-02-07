import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, screen } from "@/test/test-utils";
import Footer from "@/components/Footer";
import { COMPANY_INFO } from "@/lib/constants";

// Mock the logo import
vi.mock("@/assets/rhino-logo-footer.png", () => ({ default: "mock-footer-logo.png" }));

describe("Footer", () => {
  it("displays the company phone number", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(COMPANY_INFO.phone)).toBeInTheDocument();
  });

  it("displays the company email", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(COMPANY_INFO.email)).toBeInTheDocument();
  });

  it("displays the company address", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(new RegExp(COMPANY_INFO.address.street))).toBeInTheDocument();
  });

  it("displays the license number", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(new RegExp(COMPANY_INFO.license))).toBeInTheDocument();
  });

  it("displays the current copyright year", () => {
    renderWithProviders(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it("has a phone link with correct tel: href", () => {
    renderWithProviders(<Footer />);

    const phoneLink = screen.getByText(COMPANY_INFO.phone).closest("a");
    expect(phoneLink).toHaveAttribute("href", `tel:${COMPANY_INFO.phoneRaw}`);
  });

  it("has an email link with correct mailto: href", () => {
    renderWithProviders(<Footer />);

    const emailLink = screen.getByText(COMPANY_INFO.email).closest("a");
    expect(emailLink).toHaveAttribute("href", `mailto:${COMPANY_INFO.email}`);
  });

  it("renders quick links section with navigation links", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  it("renders service links", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText("Kitchen Remodeling")).toBeInTheDocument();
    expect(screen.getByText("Bathroom Renovation")).toBeInTheDocument();
    expect(screen.getByText("Roofing Services")).toBeInTheDocument();
    expect(screen.getByText("Electrical Work")).toBeInTheDocument();
    expect(screen.getByText("Plumbing")).toBeInTheDocument();
    expect(screen.getByText("General Repairs")).toBeInTheDocument();
    expect(screen.getByText("Flooring")).toBeInTheDocument();
  });

  it("renders service links with correct hrefs", () => {
    renderWithProviders(<Footer />);

    const kitchenLink = screen.getByText("Kitchen Remodeling").closest("a");
    expect(kitchenLink).toHaveAttribute("href", "/services/kitchen-remodeling");

    const bathroomLink = screen.getByText("Bathroom Renovation").closest("a");
    expect(bathroomLink).toHaveAttribute("href", "/services/bathroom-renovation");
  });

  it("renders social media links with proper aria labels", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
  });

  it("renders payment method icons", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByLabelText("Visa")).toBeInTheDocument();
    expect(screen.getByLabelText("Mastercard")).toBeInTheDocument();
    expect(screen.getByLabelText("American Express")).toBeInTheDocument();
    expect(screen.getByLabelText("Discover")).toBeInTheDocument();
  });

  it("renders the footer logo", () => {
    renderWithProviders(<Footer />);

    const logos = screen.getAllByAltText("Rhino Remodeler");
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });
});
