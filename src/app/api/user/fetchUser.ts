import { isAuthenticated } from '../../utils/auth/auth.ts';
import { API_KEY, BASE_URL, USERS } from '../config/constants.ts';
import { loadKey } from '../../utils/storage/storage.ts';

export async function fetchUser(username: string | null) {
  try {
    const accessToken: string | null = isAuthenticated()
      ? loadKey('accessToken')
      : null;

    const headers: HeadersInit = {
      'X-Noroff-API-Key': API_KEY,
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(
      `${BASE_URL}${USERS}/${username}?_listings=true&_wins=true`,
      fetchOptions,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json.data;
  } catch (error) {
    throw new Error(`HTTP error: ${error}`);
  }
}
