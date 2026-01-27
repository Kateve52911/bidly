import { fetchUserListings } from '../../../api/listings/fetch/fetchUserListings.ts';
import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createListingRow } from '../../../utils/helpers/listings/createListingRow.ts';
import { createDashboardListingCard } from '../card/createDashboardListingCard.ts';

export async function renderUserListings(
  username: string,
  listingsContainer: HTMLElement,
): Promise<HTMLElement | null> {
  const userListings: Array<Listing> = await fetchUserListings(username);
  console.log(listingsContainer);
  if (!listingsContainer) {
    console.error('No user listing container found');
    return listingsContainer;
  } else {
    let currentRow: HTMLDivElement | null = null;

    userListings.forEach((listing, index) => {
      if (index % 3 === 0) {
        currentRow = createListingRow();
        listingsContainer.appendChild(currentRow);
      }
      const child = createDashboardListingCard(listing);
      currentRow?.appendChild(child);
    });
  }
  return listingsContainer;
}
