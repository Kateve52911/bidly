import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { createBaseListingCard } from '../../../utils/helpers/card/createBaseListingCard.ts';
import { displayListingStatus } from '../../../utils/helpers/listings/listingStatus.ts';

export function createListingCard(data: Listing): HTMLDivElement {
  const { column, container, card } = createBaseListingCard(data);

  const listingStatus: { status: string; className: string } =
    displayListingStatus(data.endsAt);
  const listingStatusSpan: HTMLSpanElement = document.createElement('span');
  listingStatusSpan.className = 'rounded  px-1 me-auto my-1 small-text';
  listingStatusSpan.id = 'status-badge';
  listingStatusSpan.classList.add(listingStatus.className);
  listingStatusSpan.innerHTML = listingStatus.status;

  card.prepend(listingStatusSpan);

  const seller: HTMLDivElement = document.createElement('div');
  seller.id = 'seller';
  seller.className = 'text-left text-dark p-1 small-text';
  seller.innerHTML = `<strong>Sold by</strong> ${data.seller.name}`;

  const bidsContainer: HTMLDivElement = document.createElement('div');
  bidsContainer.className = 'd-flex justify-content-between mx-2';

  const currentBids: HTMLDivElement = document.createElement('div');
  currentBids.className = 'd-flex flex-column';

  const currentBidTitle: HTMLHeadingElement = document.createElement('h6');
  currentBidTitle.innerHTML = 'Current Bid';
  currentBidTitle.className = 'text-left text-dark p-1 small-text';
  currentBids.appendChild(currentBidTitle);

  const highestBidAmount: HTMLParagraphElement = document.createElement('p');
  if (data._count.bids > 0) {
    const numBids: number = data.bids.length;
    highestBidAmount.textContent = `${data.bids[numBids - 1].amount}`;
  } else {
    highestBidAmount.textContent = '0';
  }
  highestBidAmount.className = 'text-center text-dark p-1 small-text';
  currentBids.appendChild(highestBidAmount);

  const numberOfBids: HTMLDivElement = document.createElement('div');
  numberOfBids.className = 'd-flex flex-column';

  const numberOfBidsTitle: HTMLHeadingElement = document.createElement('h6');
  numberOfBidsTitle.innerHTML = 'Bids:';
  numberOfBidsTitle.className = 'text-left text-dark p-1 small-text';
  numberOfBids.appendChild(numberOfBidsTitle);

  const currentNumberBids: HTMLDivElement = document.createElement('div');
  currentNumberBids.textContent = `${data._count.bids}`;
  currentNumberBids.className = 'text-center text-dark p-1 small-text';
  numberOfBids.appendChild(currentNumberBids);

  bidsContainer.appendChild(currentBids);
  bidsContainer.appendChild(numberOfBids);

  card.append(seller);
  card.append(bidsContainer);

  container.addEventListener('click', () => {
    window.location.href = `listing.html?id=${data.id}`;
  });

  return column;
}
