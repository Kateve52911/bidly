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
  _count: {
    bids: number;
  };
  seller: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
  };
  _bids: boolean;
  bids: Array<{
    id: string;
    amount: number;
    //bidder: Profile;
    created: Date;
  }>;
}

export interface Bid {
  id: string;
  amount: number;
  //bidder: Profile;
  created: Date;
}
