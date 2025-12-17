import { BASE_URL, LISTINGS } from '../../config/constants.ts';
//import { headers } from '../../config/headers.ts';
import { authFetch } from '../../config/authFetch.ts';

export async function fetchAllListings() {
  try {
    const response = await authFetch(`${BASE_URL}${LISTINGS}`, {});
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
