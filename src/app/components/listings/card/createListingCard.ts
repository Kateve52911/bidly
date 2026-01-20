import { Data } from '../../../utils/helpers/card/type/card.ts';
import { createBidButton } from '../../../utils/helpers/card/createBidButton.ts';

export function createListingCard(data: Data) {
  const column: HTMLDivElement = document.createElement('div');
  column.className = 'col-12 col-md-6 col-lg-4 mb-4';

  const container: HTMLDivElement = document.createElement('div');
  container.className = 'card shadow h-100';
  container.id = 'card-container';
  container.style.maxWidth = '340px';
  container.style.margin = '0 auto';

  const card: HTMLDivElement = document.createElement('div');
  card.className = 'card-body d-flex flex-column p-2 ';

  const image: HTMLImageElement = document.createElement('img');
  image.className = 'card-img-top';
  image.src = data.media.length > 0 ? data.media[0].url : '';

  const title: HTMLHeadingElement = document.createElement('h5');
  title.innerHTML = data.title || 'No title given';
  title.className = 'card-title text-left text-success px-2';

  const description: HTMLParagraphElement = document.createElement('p');
  description.innerHTML = data.description;
  description.className = 'card-description text-left text-primary px-2';

  const bidsContainer: HTMLDivElement = document.createElement('div');
  bidsContainer.className = 'd-flex justify-content-between p-2';

  const currentBids: HTMLDivElement = document.createElement('div');
  currentBids.className = 'd-flex flex-column';

  const currentBidTitle: HTMLHeadingElement = document.createElement('h6');
  currentBidTitle.innerHTML = 'Current Bid';
  currentBidTitle.className = 'text-left text--dark px-2';
  currentBids.appendChild(currentBidTitle);

  const highestBidAmount: HTMLParagraphElement = document.createElement('p');
  if (data._count.bids > 0) {
    const numBids: number = data.bids.length;
    console.log(data.bids);
    highestBidAmount.textContent = `${data.bids[numBids - 1].amount}`;
  } else {
    highestBidAmount.textContent = '0';
  }
  highestBidAmount.className = 'text-center text--dark px-2';
  currentBids.appendChild(highestBidAmount);

  const numberOfBids: HTMLDivElement = document.createElement('div');
  numberOfBids.className = 'd-flex flex-column';

  const numberOfBidsTitle: HTMLHeadingElement = document.createElement('h6');
  numberOfBidsTitle.innerHTML = 'Bids:';
  numberOfBidsTitle.className = 'text-left text--dark px-2';
  numberOfBids.appendChild(numberOfBidsTitle);

  const currentNumberBids: HTMLDivElement = document.createElement('div');
  currentNumberBids.textContent = `${data._count.bids}`;
  currentNumberBids.className = 'text-center text--dark px-2';
  numberOfBids.appendChild(currentNumberBids);

  bidsContainer.appendChild(currentBids);
  bidsContainer.appendChild(numberOfBids);

  const bidEnds: HTMLDivElement = document.createElement('div');
  const endingDate = new Date(data.endsAt).toLocaleDateString();
  bidEnds.className = 'd-flex text-left text-dark p-2';
  bidEnds.innerHTML = `Bid ends ${endingDate}`;

  const placeBidButton: HTMLDivElement = document.createElement('div');
  placeBidButton.appendChild(createBidButton('Place Bid!'));
  placeBidButton.className = 'd-grid mt-auto';

  container.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(bidEnds);
  card.appendChild(bidsContainer);
  card.appendChild(placeBidButton);
  container.appendChild(card);

  column.appendChild(container);

  return column;
}
