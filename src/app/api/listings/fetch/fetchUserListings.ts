import { BASE_URL, USERS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';

export async function fetchUserListings(username: string) {
  const url = `${BASE_URL}${USERS}/${username}/listings?_seller=true&_bids=true`;
  const response: Response = await authFetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  return json.data;
}
