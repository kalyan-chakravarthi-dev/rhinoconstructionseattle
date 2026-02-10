import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type GalleryImage = Tables<"gallery_images">;

interface UseGalleryImagesOptions {
  limit?: number;
  category?: string;
  featured?: boolean;
}

export function useGalleryImages(options: UseGalleryImagesOptions = {}) {
  const { limit, category, featured } = options;

  return useQuery({
    queryKey: ["gallery-images", { limit, category, featured }],
    queryFn: async () => {
      let query = supabase
        .from("gallery_images")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }

      if (featured !== undefined) {
        query = query.eq("featured", featured);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as GalleryImage[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });
}

export function useRecentProjects(limit = 8) {
  return useGalleryImages({ limit });
}

export function useGalleryCategories() {
  return useQuery({
    queryKey: ["gallery-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("category, category_display_name")
        .eq("published", true);

      if (error) throw error;

      // Deduplicate categories
      const categoryMap = new Map<string, string>();
      for (const row of data || []) {
        if (!categoryMap.has(row.category)) {
          categoryMap.set(row.category, row.category_display_name);
        }
      }

      return Array.from(categoryMap.entries()).map(([slug, displayName]) => ({
        slug,
        displayName,
      }));
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
