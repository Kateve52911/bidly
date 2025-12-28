import { API_KEY, BASE_URL, USERS } from '../config/constants.ts';
import { loadKey } from '../../utils/storage/storage.ts';

export async function fetchAllUsers(): Promise<void> {
  try {
    const accessToken = loadKey('accessToken');
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    };

    const response: Response = await fetch(`${BASE_URL}${USERS}`, fetchOptions);
    const json = await response.json();
    console.log(json);
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

await fetchAllUsers();
