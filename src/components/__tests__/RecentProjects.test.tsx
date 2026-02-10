import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders, screen, waitFor } from "@/test/test-utils";

// Mock data
const mockImages = [
  {
    id: "img-1",
    drive_file_id: "drive-1",
    drive_file_name: "kitchen-1.jpg",
    drive_modified_time: "2026-01-15T10:00:00Z",
    category: "kitchen-remodeling",
    category_display_name: "Kitchen Remodeling",
    storage_path: "kitchen-remodeling/drive-1.jpg",
    storage_url: "https://example.com/kitchen-1.jpg",
    thumbnail_path: null,
    thumbnail_url: null,
    title: "Modern Kitchen Remodel",
    description: "A beautiful kitchen transformation",
    width: 1920,
    height: 1080,
    file_size_bytes: 500000,
    mime_type: "image/jpeg",
    published: true,
    featured: false,
    social_posted_at: {},
    synced_at: "2026-01-15T10:05:00Z",
    created_at: "2026-01-15T10:05:00Z",
    updated_at: "2026-01-15T10:05:00Z",
  },
  {
    id: "img-2",
    drive_file_id: "drive-2",
    drive_file_name: "bathroom-1.jpg",
    drive_modified_time: "2026-01-16T10:00:00Z",
    category: "bathroom-renovation",
    category_display_name: "Bathroom Renovation",
    storage_path: "bathroom-renovation/drive-2.jpg",
    storage_url: "https://example.com/bathroom-1.jpg",
    thumbnail_path: null,
    thumbnail_url: null,
    title: "Spa Bathroom",
    description: null,
    width: 1920,
    height: 1080,
    file_size_bytes: 600000,
    mime_type: "image/jpeg",
    published: true,
    featured: true,
    social_posted_at: {},
    synced_at: "2026-01-16T10:05:00Z",
    created_at: "2026-01-16T10:05:00Z",
    updated_at: "2026-01-16T10:05:00Z",
  },
];

// vi.hoisted mocks for the useGalleryImages module
const { mockUseRecentProjects } = vi.hoisted(() => {
  return {
    mockUseRecentProjects: vi.fn(),
  };
});

vi.mock("@/hooks/useGalleryImages", () => ({
  useRecentProjects: mockUseRecentProjects,
}));

import RecentProjects from "@/components/RecentProjects";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("RecentProjects", () => {
  it("shows loading spinner while data is loading", () => {
    mockUseRecentProjects.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { container } = renderWithProviders(<RecentProjects />);

    // Section should render with a spinner
    expect(container.querySelector(".animate-spin")).toBeTruthy();
  });

  it("renders nothing when there is an error", () => {
    mockUseRecentProjects.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const { container } = renderWithProviders(<RecentProjects />);

    // Should render nothing
    expect(container.innerHTML).toBe("");
  });

  it("renders nothing when data is empty", () => {
    mockUseRecentProjects.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    const { container } = renderWithProviders(<RecentProjects />);

    expect(container.innerHTML).toBe("");
  });

  it("renders project cards when data is available", async () => {
    mockUseRecentProjects.mockReturnValue({
      data: mockImages,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<RecentProjects />);

    // Section header should be visible
    expect(screen.getByText("Our Recent Projects")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Browse the latest projects completed by our expert team"
      )
    ).toBeInTheDocument();

    // Project titles
    expect(screen.getByText("Modern Kitchen Remodel")).toBeInTheDocument();
    expect(screen.getByText("Spa Bathroom")).toBeInTheDocument();

    // Category badges
    expect(screen.getByText("Kitchen Remodeling")).toBeInTheDocument();
    expect(screen.getByText("Bathroom Renovation")).toBeInTheDocument();

    // Description
    expect(
      screen.getByText("A beautiful kitchen transformation")
    ).toBeInTheDocument();

    // CTA button
    expect(screen.getByText("View All Projects")).toBeInTheDocument();
  });

  it("renders images with correct src and alt", () => {
    mockUseRecentProjects.mockReturnValue({
      data: mockImages,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<RecentProjects />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute(
      "src",
      "https://example.com/kitchen-1.jpg"
    );
    expect(images[0]).toHaveAttribute("alt", "Modern Kitchen Remodel");
    expect(images[1]).toHaveAttribute(
      "src",
      "https://example.com/bathroom-1.jpg"
    );
    expect(images[1]).toHaveAttribute("alt", "Spa Bathroom");
  });

  it("falls back to drive_file_name when title is null", () => {
    const imagesWithNullTitle = [
      {
        ...mockImages[0],
        title: null,
      },
    ];

    mockUseRecentProjects.mockReturnValue({
      data: imagesWithNullTitle,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<RecentProjects />);

    expect(screen.getByText("kitchen-1.jpg")).toBeInTheDocument();
  });

  it("links to the recent projects page", () => {
    mockUseRecentProjects.mockReturnValue({
      data: mockImages,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<RecentProjects />);

    const viewAllLink = screen.getByText("View All Projects").closest("a");
    expect(viewAllLink).toHaveAttribute("href", "/recent-projects");
  });
});
