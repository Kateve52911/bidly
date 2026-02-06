import { authFetch } from '../../config/authFetch.ts';
import { BASE_URL, LISTINGS } from '../../config/constants.ts';

export async function deleteListing(
  listingId: string,
): Promise<{ success: boolean }> {
  const response: Response = await authFetch(
    `${BASE_URL}${LISTINGS}/${listingId}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to delete listing: ${response.status} ${response.statusText}`,
    );
  }

  return { success: true };
}
