import { UpdatedProfile } from '../types/updatedProfileTypes.ts';
import { BASE_URL, USERS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';

export async function updateProfile(
  username: string,
  updatedProfile: UpdatedProfile,
): Promise<void> {
  const URL = `${BASE_URL}${USERS}/${username}`;
  const response = await authFetch(URL, {
    method: 'PUT',
    body: JSON.stringify(updatedProfile),
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
}
