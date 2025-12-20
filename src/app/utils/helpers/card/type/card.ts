export interface Data {
  id: string;
  title: string;
  description: string;
  tags: Array<string>;
  media: Array<{
    url: string;
    alt: string;
  }>;
  created: string;
  updated: string;
  endsAt: string;
  _count: object;
  seller: object;
  bids: boolean;
}
