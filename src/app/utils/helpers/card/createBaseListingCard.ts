import { Listing } from './type/listing.ts';

export function createBaseListingCard(data: Listing) {
  const column: HTMLDivElement = document.createElement('div');
  column.className =
    'col-12 col-md-6 col-lg-3 mb-5 px-1 d-flex justify-content-center ';

  const container: HTMLDivElement = document.createElement('div');
  container.className = 'card shadow h-100';
  container.style.maxWidth = '100%';
  container.style.width = '100%';

  const card: HTMLDivElement = document.createElement('div');
  card.className = 'card-body d-flex flex-column  align-items-stretch p-3 ';

  const image: HTMLImageElement = document.createElement('img');
  image.className = 'card-img-top';
  image.style.objectFit = 'cover';
  image.style.height = '250px';
  image.style.width = '100%';
  image.src = data.media.length > 0 ? data.media[0].url : '';

  const title: HTMLHeadingElement = document.createElement('h5');
  title.innerHTML = data.title || 'No title given';
  title.className = 'card-title text-left text-success px-2';

  const description: HTMLParagraphElement = document.createElement('p');
  description.innerHTML = data.description;
  description.className = 'card-description text-left text-primary px-2';

  const bidEnds: HTMLDivElement = document.createElement('div');
  const endingDate = new Date(data.endsAt).toLocaleDateString();
  bidEnds.className = 'd-flex text-left text-dark p-2';
  bidEnds.innerHTML = `Bid ends ${endingDate}`;

  container.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(bidEnds);
  container.appendChild(card);
  column.appendChild(container);

  return { column, container, card };
}
