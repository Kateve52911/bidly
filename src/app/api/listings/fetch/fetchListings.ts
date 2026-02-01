import { BASE_URL, LISTINGS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';

export async function fetchListings(limit: number, page: number) {
  try {
    const response: Response = await authFetch(
      `${BASE_URL}${LISTINGS}?_seller=true&_bids=true&sort=created&limit=${limit}&page=${page}`,
      {},
    );
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  }
}
