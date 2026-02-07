import * as bootstrap from 'bootstrap';

import { fetchSingleListing } from '../../../api/listings/fetch/fetchSingleListing.ts';
import { Listing } from '../../../utils/helpers/card/type/listing.ts';
import { appendAlert } from '../../errorHandling/newAlert/newAlert.ts';
import { isAuthenticated } from '../../../utils/auth/auth.ts';
import { handleBidSubmission } from './handleBidSubmission.ts';
import { createBidsList } from './createBidList.ts';
import { createBidForm } from '../../forms/bidForm/createBidForm.ts';
import { createImageCarousel } from '../../../utils/helpers/listings/createImageCarousel.ts';

export async function renderSingleListing(
  listingId: string | null = null,
): Promise<HTMLElement> {
  if (!listingId) {
    appendAlert('No listing id', 'warning');
    return document.createElement('div');
  }

  const listingData: Listing | undefined = await fetchSingleListing(listingId);

  const container: HTMLDivElement = document.createElement('div');
  container.className =
    'container my-3 d-flex flex-column shadow-lg p-3 rounded w-75';
  container.id = 'listing-container';

  if (!listingData) {
    return container;
  }

  const flexContainer: HTMLDivElement = document.createElement('div');
  flexContainer.id = 'flexContainer';
  flexContainer.className = 'd-flex flex-column flex-lg-row gap-3';

  const title: HTMLHeadingElement = document.createElement('h1');
  title.innerHTML = listingData.title;
  title.className = 'text-left';
  title.id = 'title';

  const infoDiv: HTMLDivElement = document.createElement('div');
  infoDiv.id = 'info-div';
  infoDiv.className =
    'info-div d-flex flex-column justify-content-start flex-grow-1 ps-lg-4';

  const imageContainer: HTMLDivElement = document.createElement('div');
  imageContainer.className = 'image-fluid';
  imageContainer.style.maxWidth = '600px';
  imageContainer.style.width = '100%';
  if (listingData.media.length > 0) {
    const carousel: HTMLDivElement = createImageCarousel(listingData);
    imageContainer.appendChild(carousel);

    // Initialize after adding to DOM
    setTimeout(() => {
      const carouselElement = document.getElementById('listing-carousel');
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement);
      }
    }, 100);
  }

  const listingTagsDiv: HTMLDivElement = document.createElement('div');
  listingTagsDiv.id = 'listing-tags-div text-success';
  listingTagsDiv.className = 'text-left fst-italic text-success';
  if (listingData.tags.length > 0) {
    listingTagsDiv.innerHTML = listingData.tags.join(', ');
  } else {
    listingTagsDiv.innerHTML = '';
  }

  const listingDescription: HTMLParagraphElement = document.createElement('p');
  listingDescription.id = 'listing-description';
  listingDescription.innerHTML = listingData.description;
  listingDescription.className = 'text-left text-dark my-2 fw-bolder';

  const timeRemainingDiv: HTMLDivElement = document.createElement('div');
  timeRemainingDiv.id = 'time-remaining-div';
  timeRemainingDiv.className = 'text-left text-dark my-2';
  const endsAt: string = new Date(listingData.endsAt).toLocaleDateString();
  timeRemainingDiv.innerHTML = `Bid ends at: ${endsAt}`;

  const allBidsContainer: HTMLDivElement = createBidsList(listingData);

  const alertDiv: HTMLDivElement = document.createElement('div');
  alertDiv.id = 'alert-placeholder-container';
  alertDiv.className = 'mt-3';

  infoDiv.append(
    listingTagsDiv,
    listingDescription,
    timeRemainingDiv,
    allBidsContainer,
    alertDiv,
  );

  if (isAuthenticated()) {
    const placeBidForm: HTMLFormElement = createBidForm(
      (event: Event): Promise<void> => handleBidSubmission(event, listingId),
    );
    infoDiv.append(placeBidForm);
  } else {
    const loginDiv: HTMLDivElement = document.createElement('div');
    loginDiv.id = 'login-div';
    loginDiv.innerHTML = 'To place bid, please log in!';
    infoDiv.append(loginDiv);
  }

  flexContainer.appendChild(imageContainer);
  flexContainer.appendChild(infoDiv);
  container.append(title, flexContainer);

  return container;
}
