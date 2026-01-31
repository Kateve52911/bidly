export interface UpdatedListingData {
  title?: string;
  description?: string;
  tags?: ['string'];
  media?: Array<{
    url: string;
    alt: string;
  }>;
}
