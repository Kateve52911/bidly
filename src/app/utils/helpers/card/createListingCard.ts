import { Data } from './type/card.ts';

export function createListingCard(data: Data) {
  const container = document.createElement('div');
  container.className = 'card col';
  container.id = 'card-container';
  container.style = '18rem;';

  const card = document.createElement('div');
  card.className = 'card-body';

  const image = document.createElement('img');
  image.className = 'card-image img-fluid mh-50';
  image.src = data?.media[0]?.url || '.src/app/assets/images/logo-icon.png';

  // console.log(data.media[0].url)

  const title = document.createElement('h5');
  title.innerHTML = data.title;
  title.className = 'card-title text-center text-primary';

  /*const created = document.createElement('h5')
  created.innerHTML = data.created*/

  card.appendChild(image);
  card.appendChild(title);

  container.appendChild(card);

  return container;
}
