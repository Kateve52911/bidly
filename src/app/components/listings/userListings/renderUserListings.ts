import { fetchUserListings } from '../../../api/listings/fetch/fetchUserListings.ts';
import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createListingRow } from '../../../utils/helpers/listings/createListingRow.ts';
import { createDashboardListingCard } from '../card/createDashboardListingCard.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';

export async function renderUserListings(
  username: string,
  listingsContainer: HTMLElement,
): Promise<HTMLElement | null> {
  const userListings: Array<Listing> = await fetchUserListings(username);
  if (!listingsContainer) {
    appendAlert('No user listing container found', 'danger');
    return listingsContainer;
  } else {
    let currentRow: HTMLDivElement | null = null;

    userListings.forEach((listing: Listing, index: number): void => {
      if (index % 3 === 0) {
        currentRow = createListingRow();
        currentRow.classList.remove('justify-content-center');
        currentRow.classList.add('justify-content-start');
        listingsContainer.appendChild(currentRow);
      }
      const child: HTMLDivElement = createDashboardListingCard(listing);
      currentRow?.appendChild(child);
    });
  }
  return listingsContainer;
}
