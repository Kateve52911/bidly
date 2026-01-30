import { BASE_URL, LISTINGS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';
import { UpdatedListingData } from './types/updatedListingData.ts';

export async function updateListing(
  listingId: string,
  updatedListingData: UpdatedListingData,
): Promise<void> {
  const URL = `${BASE_URL}${LISTINGS}/${listingId}`;
  const response = await authFetch(URL, {
    method: 'POST',
    body: JSON.stringify(updatedListingData),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
}
