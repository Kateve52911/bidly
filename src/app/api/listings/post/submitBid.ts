import { BASE_URL, LISTINGS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';

export async function submitBid(listingId: string, bid: number): Promise<void> {
  const URL = `${BASE_URL}${LISTINGS}/${listingId}/bids`;
  const response = await authFetch(URL, {
    method: 'POST',
    body: JSON.stringify({ amount: bid }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error status ${response.status}`);
  }
}
