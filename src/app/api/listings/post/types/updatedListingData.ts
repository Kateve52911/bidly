export interface UpdatedListingData {
  title: string;
  description: string;
  tags: ['string'];
  media: [
    {
      url: string;
      alt: string;
    },
  ];
}
