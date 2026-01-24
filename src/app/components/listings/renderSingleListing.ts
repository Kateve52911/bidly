import { fetchSingleListing } from '../../api/listings/fetch/fetchSingleListing.ts';
import { Listing } from '../../utils/helpers/card/type/listing.ts';
import { createUserInput } from '../../utils/helpers/forms/createInput.ts';
import { createSubmitButton } from '../../utils/helpers/forms/createButton.ts';
import { listingId } from '../../pages/singleListing.ts';
import { submitBid } from '../../api/listings/post/submitBid.ts';
import { appendAlert } from '../errorHandling/newAlert/newAlert.ts';
import { isAuthenticated } from '../../utils/auth/auth.ts';

export async function renderSingleListing(
  listingId: Listing,
): Promise<HTMLElement> {
  const listingData = await fetchSingleListing(listingId);
  console.log(listingData);

  const container = document.createElement('div');
  container.className =
    'container my-3 d-flex flex-column rounded justify-content-center w-75';
  container.id = 'listing-container';

  const title = document.createElement('h1');
  title.innerHTML = listingData.title;
  title.className = 'text-left';
  title.id = 'title';

  const infoDiv = document.createElement('div');
  infoDiv.id = 'info-div';
  infoDiv.className =
    'info-div mx-4 d-flex flex-column shadow-lg p-3 justify-content-center align-items-center';

  const imageContainer = document.createElement('div');
  console.log(typeof listingData.media);
  if (listingData.media.length > 0) {
    listingData.media.forEach((media) => {
      const img = document.createElement('img');
      img.src = media.url;
      img.alt = media.alt;
      img.id = media.id;
      img.className = 'img-fluid w-25 rounded';
      imageContainer.append(img);
    });
  }

  const allBidsContainer = document.createElement('div');
  /* allBidsContainer.id = 'all-bids';
 const allBids = listingData.bids;
 console.log(allBids);
 console.log(listingData.bids[0].bidder.name)
 for (let i  = 0; i < listingData.bids.length; i++) {

 }*/
  /*  if(allBids.length > 0) {
      allBids.forEach(bid => {
        const bidderDiv = document.createElement('div');
        bidderDiv.id = 'bidder-div';
        bidderDiv.innerHTML = `$listingData.bids[bids.length].bidder.name}`;
        allBidsContainer.append(bidderDiv);
        console.log(bidderDiv)

      })
    }*/

  const listingTagsDiv = document.createElement('div');
  listingTagsDiv.id = 'listing-tags-div text-success';
  if (listingData.tags.length > 0) {
    listingTagsDiv.innerHTML = listingData.tags.join(', ');
  } else {
    listingTagsDiv.innerHTML = '';
  }

  const listingDescription = document.createElement('p');
  listingDescription.id = 'listing-description';
  listingDescription.innerHTML = listingData.description;
  listingDescription.className = 'text-left text-dark my-2';

  const highestBidContainer = document.createElement('div');
  highestBidContainer.id = 'highest-bid-container';
  highestBidContainer.innerHTML = 'Highest Bid';
  highestBidContainer.className = 'bg-primary bg-opacity-10 p-3';

  const highestBid = document.createElement('div');
  highestBid.id = 'highest-bid';
  highestBid.className = ' p-2';
  const bids = listingData.bids;
  if (bids.length > 0) {
    const highestBidNumber = document.createElement('p');
    highestBidNumber.innerHTML = `${listingData.bids[bids.length - 1].amount}`;
    highestBidNumber.id = 'highest-bid-number';
    highestBid.appendChild(highestBidNumber);
  } else {
    highestBid.innerHTML = 'No bids found';
  }
  highestBidContainer.append(highestBid);

  const alertDiv = document.createElement('div');
  alertDiv.id = 'alert-placeholder-container';
  alertDiv.className = 'mt-3';

  infoDiv.append(
    imageContainer,
    listingTagsDiv,
    listingDescription,
    highestBidContainer,
    allBidsContainer,
    alertDiv,
  );

  if (isAuthenticated()) {
    const placeBidForm: HTMLFormElement = document.createElement('form');
    placeBidForm.id = 'place-bid-form';
    placeBidForm.className =
      ' form d-flex  justify-content-center gap-3 my-3 p-6';

    const inputBidDiv = document.createElement('div');
    inputBidDiv.id = 'input-bid-div';
    inputBidDiv.className = 'p-1';
    inputBidDiv.appendChild(
      createUserInput('Your bid amount', 'number', 'bid', 'bid'),
    );

    const placeBidButton = document.createElement('div');
    placeBidButton.id = 'place-bid-button';
    placeBidButton.className = 'btn-primary p-1';
    placeBidButton.appendChild(createSubmitButton('Place bid'));

    placeBidForm.append(inputBidDiv, placeBidButton);
    placeBidForm.addEventListener('submit', onSubmitBid);
    infoDiv.append(placeBidForm);
  } else {
    const loginDiv = document.createElement('div');
    loginDiv.id = 'login-div';
    loginDiv.innerHTML = 'To place bid, please log in!';
    infoDiv.append(loginDiv);
  }
  container.append(title, infoDiv);

  return container;
}

async function onSubmitBid(event: Event) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const bidString: FormDataEntryValue | null = formData.get('bid');
  const bid: number = Number(bidString);

  const currentBidElement = document.getElementById('highest-bid-number');
  const currentBidNumber = Number(currentBidElement?.innerHTML);
  console.log(currentBidNumber);

  if (!bid) {
    throw new Error('Bid not found');
  }

  if (currentBidNumber >= bid) {
    event.preventDefault();
    appendAlert('Bid needs to be higher than the current bid!', 'danger');
    return;
  } else {
    appendAlert('Bid has been registered!', 'success');
    const bidInput = document.getElementById('bid') as HTMLInputElement;
    bidInput.value = '';
  }

  await submitBid(listingId, bid);

  console.log(bid);
}
