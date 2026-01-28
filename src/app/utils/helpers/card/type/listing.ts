import { Profile } from '../../../../api/user/types/profile.ts';

export interface Listing {
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
  bids: Bid[];
}

export interface Bid {
  id: string;
  amount: number;
  bidder: Profile;
  created: Date;
}
