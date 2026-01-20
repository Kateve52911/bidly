import { fetchSingleListing } from '../../api/listings/fetch/fetchSingleListing.ts';
import { Listing } from '../../utils/helpers/card/type/listing.ts';

export async function renderSingleListing(
  listingId: Listing,
): Promise<HTMLElement> {
  const listingData = await fetchSingleListing(listingId);
  console.log(listingData);

  const container = document.createElement('div');
  container.className =
    'container mx-auto my-3 d-flex flex-column rounded py-5';
  container.id = 'listing-container';

  const title = document.createElement('h1');
  title.innerHTML = listingData.title;
  title.className = 'text-left';
  title.id = 'title';

  const infoDiv = document.createElement('div');
  infoDiv.id = 'info-div';
  infoDiv.className = 'info-div mx-4 d-flex flex-column shadow-lg p-2';

  const image = document.createElement('img');
  // if(listingData.media > 0) {
  //   listingData.media.forEach(media => {
  //     image.src = media.url;
  //   })
  // }
  image.src = listingData.media.length > 0 ? listingData.media[0].url : '';
  image.className = 'img-fluid w-25 rounded';

  const listingDescription = document.createElement('div');
  listingDescription.id = 'listingDescription';
  listingDescription.innerHTML = listingData.description;
  listingDescription.className = 'text-left text-dark';

  infoDiv.append(image, listingDescription);

  container.appendChild(title);
  container.appendChild(infoDiv);

  return container;
}
