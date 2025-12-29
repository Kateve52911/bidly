import { BASE_URL, LISTINGS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';

export async function fetchAllListings() {
  try {
    const response: Response = await authFetch(
      `${BASE_URL}${LISTINGS}?_seller=true&_bids=true&sort=created&`,
      {},
    );
    const json = await response.json();
    console.log(json.data[0]);
    console.log(json.data);
    console.log(json.data.bids);
    return json.data;
  } catch (error) {
    console.error(error);
  }
}
