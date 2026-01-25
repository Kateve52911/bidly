import { BASE_URL, LISTINGS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';
import { Listing } from '../../../utils/helpers/card/type/listing.ts';

export async function fetchSingleListing(
  listingId: string,
): Promise<Listing | undefined> {
  try {
    const response: Response = await authFetch(
      `${BASE_URL}${LISTINGS}/${listingId}?_seller=true&_bids=true`,
      {},
    );
    const json = await response.json();
    console.log(json.data);
    return json.data;
  } catch (error) {
    console.error(error);
  }
}
