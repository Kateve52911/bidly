import { BASE_URL, USERS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';
import { BidHistory } from '../types/bidHistory.ts';

export async function fetchUserBidHistory(
  username: string,
): Promise<BidHistory[]> {
  const URL = `${BASE_URL}${USERS}/${username}/bids?_listings=true`;
  const response = await authFetch(URL, {});

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  return json.data;
}
