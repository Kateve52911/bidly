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
  seller: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
  };
  bids: boolean;
}
