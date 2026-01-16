import { API_KEY, BASE_URL, USERS } from '../../config/constants.ts';
import { loadKey } from '../../../utils/storage/storage.ts';

export async function fetchUserListings(username: string) {
  try {
    const accessToken = loadKey('accessToken');
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
    };
    const response: Response = await fetch(
      `${BASE_URL}${USERS}/${username}/listings`,
      fetchOptions,
    );
    const json = await response.json();
    console.log(json.data);
    return json.data;
  } catch (error) {
    console.error(error);
  }
}
