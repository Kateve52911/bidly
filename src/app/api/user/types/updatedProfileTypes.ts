export interface UpdatedProfile {
  bio?: string;
  avatar?: Array<{
    url: string;
    alt: string;
  }>;
}
