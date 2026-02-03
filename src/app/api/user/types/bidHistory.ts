import { Listing } from '../../../utils/helpers/card/type/listing.ts';

export interface BidHistory {
  id: string;
  amount: number;
  bidder: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
  };
  listing: Listing;
}
