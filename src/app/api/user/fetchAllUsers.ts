import { API_KEY, BASE_URL, USERS } from '../config/constants.ts';
import { loadKey } from '../../utils/storage/storage.ts';

export async function fetchAllUsers(): Promise<void> {
  const accessToken: string | null = loadKey('accessToken');
  const fetchOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  };

  const response: Response = await fetch(`${BASE_URL}${USERS}`, fetchOptions);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json();
  return json.data;
}

await fetchAllUsers();
