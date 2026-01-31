import { fetchSearchBarInput } from '../../utils/helpers/searchBar/getSearchBarInput.ts';
import { createListingCard } from '../listings/card/createListingCard.ts';
import { Listing } from '../../utils/helpers/card/type/listing.ts';
import { createListingRow } from '../../utils/helpers/listings/createListingRow.ts';
import { appendAlert } from '../errorHandling/newAlert/newAlert.ts';

export function filterSearchResults(listings: Array<Listing>) {
  const searchInput: string | null = fetchSearchBarInput();
  const listingContainer: HTMLElement | null =
    document.getElementById('listings-Container');
  if (!listingContainer) {
    console.error('Could not find listing container'); // TODO: Throw error
  }

  const listingsRowContainer: NodeListOf<Element> =
    document.querySelectorAll('.listing-row');
  if (listingsRowContainer) {
    listingsRowContainer.forEach((el: Element): void => {
      el.remove();
    });
  }

  let currentRow: HTMLElement | null = null;
  let resultsToDisplay;

  if (searchInput) {
    resultsToDisplay = listings.filter((listing) => {
      return (
        (listing.title &&
          listing.title.toLowerCase().includes(searchInput.toLowerCase())) ||
        (listing.description &&
          listing.description
            .toLowerCase()
            .includes(searchInput.toLowerCase())) ||
        (listing.tags &&
          listing.tags.some((tag) =>
            tag.toLowerCase().includes(searchInput.toLowerCase()),
          )) ||
        (listing.media &&
          listing.media.some(
            (mediaItem) =>
              mediaItem.alt &&
              mediaItem.alt.toLowerCase().includes(searchInput.toLowerCase()),
          ))
      );
    });
  } else {
    resultsToDisplay = listings;
  }

  if (listingContainer && resultsToDisplay.length === 0) {
    appendAlert('No listing matches your search', 'light');
  }

  resultsToDisplay.forEach((listing: Listing, index: number) => {
    if (index % 3 === 0) {
      currentRow = createListingRow();
      currentRow.classList.add('listing-row');
      listingContainer?.appendChild(currentRow);
    }
    const child: HTMLDivElement = createListingCard(listing);
    currentRow?.appendChild(child);
  });
}
