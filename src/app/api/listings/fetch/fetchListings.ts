import { BASE_URL, LISTINGS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';

export async function fetchListings(limit: number, page: number) {
  const response: Response = await authFetch(
    `${BASE_URL}${LISTINGS}?_seller=true&_bids=true&sort=created&limit=${limit}&page=${page}`,
    {},
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  return json.data;
}
