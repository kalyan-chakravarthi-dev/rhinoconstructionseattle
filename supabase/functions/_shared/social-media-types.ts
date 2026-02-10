// Future scope: Social media auto-posting types
// These types will be used when social media publishing is implemented.

export type SocialPlatform = "instagram" | "facebook" | "google_business";

export interface SocialMediaConfig {
  platform: SocialPlatform;
  enabled: boolean;
  accessToken?: string;
  accountId?: string;
}

export interface SocialMediaPost {
  platform: SocialPlatform;
  imageUrl: string;
  caption: string;
  postedAt?: string;
  postId?: string;
  error?: string;
}
