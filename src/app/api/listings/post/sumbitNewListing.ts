import { BASE_URL, LISTINGS } from '../../config/constants.ts';
import { authFetch } from '../../config/authFetch.ts';
import { ListingData } from './types/listingDatatTypes.ts';

export async function submitListing(listingData: ListingData): Promise<void> {
  try {
    const URL = `${BASE_URL}${LISTINGS}`;
    const response = await authFetch(URL, {
      method: 'POST',
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error status ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
