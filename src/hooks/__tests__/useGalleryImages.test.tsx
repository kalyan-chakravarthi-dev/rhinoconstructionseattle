import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Mock data
const mockGalleryImages = [
  {
    id: "img-1",
    drive_file_id: "drive-1",
    drive_file_name: "kitchen-1.jpg",
    drive_modified_time: "2026-01-15T10:00:00Z",
    category: "kitchen-remodeling",
    category_display_name: "Kitchen Remodeling",
    storage_path: "kitchen-remodeling/drive-1.jpg",
    storage_url: "https://example.com/storage/kitchen-remodeling/drive-1.jpg",
    thumbnail_path: null,
    thumbnail_url: null,
    title: "Kitchen 1",
    description: "A beautiful kitchen remodel",
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
    storage_url: "https://example.com/storage/bathroom-renovation/drive-2.jpg",
    thumbnail_path: null,
    thumbnail_url: null,
    title: "Bathroom 1",
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

// Use vi.hoisted for mock values used inside vi.mock factory
const { mockSelect, mockFrom } = vi.hoisted(() => {
  const mockSelect = vi.fn();
  const mockFrom = vi.fn();
  return { mockSelect, mockFrom };
});

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: mockFrom,
  },
}));

import {
  useGalleryImages,
  useRecentProjects,
  useGalleryCategories,
} from "@/hooks/useGalleryImages";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

/**
 * Creates a chainable + awaitable mock that mimics Supabase's PostgREST builder.
 * Every method returns the same chain, and `await chain` resolves to { data, error }.
 */
function createChain(data: unknown, error: unknown = null) {
  const resolved = { data, error };
  const chain: Record<string, unknown> = {};

  // Every builder method returns the chain itself
  for (const method of ["select", "eq", "order", "limit"]) {
    chain[method] = vi.fn().mockReturnValue(chain);
  }

  // Make it awaitable (PromiseLike)
  chain.then = (resolve: (v: unknown) => void) => Promise.resolve(resolved).then(resolve);

  return chain as Record<string, ReturnType<typeof vi.fn>> & PromiseLike<typeof resolved>;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useGalleryImages", () => {
  it("fetches published gallery images", async () => {
    const chain = createChain(mockGalleryImages);
    mockFrom.mockReturnValue(chain);

    const { result } = renderHook(() => useGalleryImages(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFrom).toHaveBeenCalledWith("gallery_images");
    expect(chain.select).toHaveBeenCalledWith("*");
    expect(chain.eq).toHaveBeenCalledWith("published", true);
    expect(result.current.data).toEqual(mockGalleryImages);
  });

  it("filters by category when provided", async () => {
    const chain = createChain([mockGalleryImages[0]]);
    mockFrom.mockReturnValue(chain);

    const { result } = renderHook(
      () => useGalleryImages({ category: "kitchen-remodeling" }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(chain.eq).toHaveBeenCalledWith("category", "kitchen-remodeling");
  });

  it("applies limit when provided", async () => {
    const chain = createChain([mockGalleryImages[0]]);
    mockFrom.mockReturnValue(chain);

    const { result } = renderHook(() => useGalleryImages({ limit: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(chain.limit).toHaveBeenCalledWith(1);
  });

  it("throws on supabase error", async () => {
    const chain = createChain(null, { message: "DB error" });
    mockFrom.mockReturnValue(chain);

    const { result } = renderHook(() => useGalleryImages(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useRecentProjects", () => {
  it("uses a default limit of 8", async () => {
    const chain = createChain(mockGalleryImages);
    mockFrom.mockReturnValue(chain);

    const { result } = renderHook(() => useRecentProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(chain.limit).toHaveBeenCalledWith(8);
  });
});

describe("useGalleryCategories", () => {
  it("returns deduplicated categories", async () => {
    const categoryData = [
      { category: "kitchen-remodeling", category_display_name: "Kitchen Remodeling" },
      { category: "kitchen-remodeling", category_display_name: "Kitchen Remodeling" },
      { category: "bathroom-renovation", category_display_name: "Bathroom Renovation" },
    ];

    const chain = createChain(categoryData);
    mockFrom.mockReturnValue(chain);

    const { result } = renderHook(() => useGalleryCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([
      { slug: "kitchen-remodeling", displayName: "Kitchen Remodeling" },
      { slug: "bathroom-renovation", displayName: "Bathroom Renovation" },
    ]);
  });
});
