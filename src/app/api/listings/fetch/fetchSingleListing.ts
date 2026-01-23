import { BASE_URL, LISTINGS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';

export async function fetchSingleListing(listingId: string) {
  try {
    const response: Response = await authFetch(
      `${BASE_URL}${LISTINGS}/${listingId}?_seller=true&_bids=true`,
      {},
    );
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  }
}
