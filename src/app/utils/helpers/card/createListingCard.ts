import { Data } from './type/card.ts';

export function createListingCard(data: Data) {
  const container: HTMLDivElement = document.createElement('div');
  container.className = 'card col shadow';
  container.id = 'card-container';
  container.style = '18rem;';

  const card: HTMLDivElement = document.createElement('div');
  card.className = 'card-body';

  const image: HTMLImageElement = document.createElement('img');
  image.className = 'card-image img-fluid mh-50 rounded mt-0';
  image.src = data?.media[0]?.url || '.src/app/assets/images/logo-icon.png';

  // console.log(data.media[0].url)

  const title: HTMLHeadingElement = document.createElement('h5');
  title.innerHTML = data.title || 'No title given';
  title.className = 'card-title text-left text-success';

  const description: HTMLParagraphElement = document.createElement('p');
  description.innerHTML = data.description;
  description.className = 'card-description text-left text-primary';

  /*const created = document.createElement('h5')
  created.innerHTML = data.created*/

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);

  container.appendChild(card);

  return container;
}
