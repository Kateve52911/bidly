import { BASE_URL, LISTINGS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';

export async function fetchAllListings() {
  try {
    const response: Response = await authFetch(
      `${BASE_URL}${LISTINGS}?_seller=true&_bids=true&sort=created`,
      {},
    );
    const json = await response.json();
    console.log(typeof json.data[0].id);
    console.log(json.data);
    return json.data;
  } catch (error) {
    console.error(error);
  }
}
