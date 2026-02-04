import { appendAlert } from '../errorHandling/newAlert/newAlert.ts';
import { createListingRow } from '../../utils/helpers/listings/createListingRow.ts';
import { createListingCard } from '../listings/card/createListingCard.ts';
import { Listing } from '../../utils/helpers/card/type/listing.ts';
import { fetchSearchBarInput } from '../../utils/helpers/searchBar/getSearchBarInput.ts';

export function filterSearchResults(listings: Array<Listing>): void {
  const searchInput: string | null = fetchSearchBarInput();
  const rowContainer: HTMLElement | null =
    document.querySelector('.row-container');

  if (!rowContainer) {
    console.error('Could not find row container');
    return;
  }

  rowContainer.innerHTML = '';

  let currentRow: HTMLElement | null = null;
  let resultsToDisplay;

  if (searchInput) {
    resultsToDisplay = listings.filter((listing: Listing): boolean => {
      return (
        (listing.title &&
          listing.title.toLowerCase().includes(searchInput.toLowerCase())) ||
        (listing.description &&
          listing.description
            .toLowerCase()
            .includes(searchInput.toLowerCase())) ||
        (listing.tags &&
          listing.tags.some((tag: string): boolean =>
            tag.toLowerCase().includes(searchInput.toLowerCase()),
          )) ||
        (listing.media &&
          listing.media.some(
            (mediaItem: { url: string; alt: string }): boolean | '' =>
              mediaItem.alt &&
              mediaItem.alt.toLowerCase().includes(searchInput.toLowerCase()),
          ))
      );
    });
  } else {
    resultsToDisplay = listings;
  }

  if (resultsToDisplay.length === 0) {
    appendAlert('No listing matches your search', 'light');
  }

  resultsToDisplay.forEach((listing: Listing, index: number): void => {
    if (index % 3 === 0) {
      currentRow = createListingRow();
      currentRow.classList.add('listing-row');
      rowContainer.appendChild(currentRow);
    }
    const child: HTMLDivElement = createListingCard(listing);
    currentRow?.appendChild(child);
  });
}
