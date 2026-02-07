import { createBaseListingCard } from '../../../utils/helpers/card/createBaseListingCard.ts';
import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { displayListingStatus } from '../../../utils/helpers/listings/listingStatus.ts';

export function createBidsWonByUserCard(listing: Listing): HTMLDivElement {
  const { column, container, card } = createBaseListingCard(listing);

  container.style.maxWidth = '300px';

  const listingStatus: { status: string; className: string } =
    displayListingStatus(listing.endsAt);

  const listingStatusSpan: HTMLSpanElement = document.createElement('span');
  listingStatusSpan.className = 'rounded  px-1 me-auto my-1 small-text';
  listingStatusSpan.id = 'status-badge';
  listingStatus.className
    .split(' ')
    .forEach((cls: string): void => listingStatusSpan.classList.add(cls));
  listingStatusSpan.innerHTML = listingStatus.status;

  card.prepend(listingStatusSpan);

  const seller: HTMLDivElement = document.createElement('div');
  seller.id = 'seller';
  seller.className = 'text-left text-dark p-1 small-text';
  seller.innerHTML = `<strong>Sold by</strong> ${listing.seller.name}`;

  const winningBidContainer: HTMLDivElement = document.createElement('div');
  winningBidContainer.id = 'winning-bids';
  winningBidContainer.className = 'd-flex justify-content-left mx-1';

  const winningBidTitle: HTMLHeadingElement = document.createElement('p');
  winningBidTitle.innerHTML = '<strong>Winning Bid:</strong>';
  winningBidTitle.className = 'text-left text-dark py-1 small-text';
  winningBidContainer.appendChild(winningBidTitle);

  const winningBidAmount: HTMLParagraphElement = document.createElement('p');
  if (listing._count.bids > 0) {
    const numBids: number = listing.bids.length;
    winningBidAmount.textContent = `${listing.bids[numBids - 1].amount}`;
    winningBidAmount.className = 'text-left text-dark py-1 small-text';
  }
  winningBidContainer.appendChild(winningBidAmount);

  card.append(seller);
  card.append(winningBidContainer);

  container.addEventListener('click', (): void => {
    window.location.href = `listing.html?id=${listing.id}`;
  });

  return column;
}
