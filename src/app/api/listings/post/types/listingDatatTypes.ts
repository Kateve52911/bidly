export interface ListingData {
  title: string;
  description: string;
  media: Array<{
    url: string;
    alt: string;
  }>;
  endsAt: string;
}
