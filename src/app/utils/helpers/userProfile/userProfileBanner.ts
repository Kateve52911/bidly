import { Profile } from '../../../api/user/types/profile.ts';
import { renderUserListings } from '../../../components/listings/userListings/renderUserListings.ts';
//import { renderAllListings } from '../../../pages';
//import { createListingCard } from '../../../components/listings/card/createListingCard.ts';

export async function createUserProfile(user: Profile) {
  const container: HTMLDivElement = document.createElement('div');
  container.classList = 'container d-flex flex-column justify-content-center ';

  const profileInfo = document.createElement('div');
  profileInfo.className = 'd-flex flex-column justify-content-center mx-2';

  const bannerContainer = document.createElement('div');
  bannerContainer.classList = 'position-relative';

  const banner: HTMLImageElement = document.createElement('img');
  banner.classList = 'banner w-100';
  banner.id = 'banner';
  banner.alt = user.name;
  banner.src = user.banner.url;

  const username: HTMLHeadingElement = document.createElement('h1');
  username.innerHTML = `<span class="text-white position-absolute bottom-30 mb-5 start-30">${user.name}</span>`;
  username.id = 'username';

  const avatarContainer: HTMLDivElement = document.createElement('div');
  avatarContainer.classList = 'avatar position-absolute top-15';

  const avatar: HTMLImageElement = document.createElement('img');
  avatar.classList = 'avatar w-75 mt-2 ms-4 rounded-circle';
  avatar.id = 'avatar';
  avatar.src = user.avatar.url;
  avatar.alt = user.name;
  avatarContainer.appendChild(avatar);

  const infoContainer: HTMLDivElement = document.createElement('div');
  infoContainer.classList = 'info position-absolute bottom-30 start-30';
  infoContainer.id = 'info';

  const infoText: HTMLDivElement = document.createElement('div');
  infoText.classList = 'info-text';
  infoText.id = 'info-text';
  infoText.innerHTML = user.bio || 'No bio has been provided';
  infoContainer.appendChild(infoText);

  const userListingsContainer: HTMLDivElement = document.createElement('div');
  userListingsContainer.classList = 'user-posts';
  userListingsContainer.id = 'user-posts-container';

  const userListingsTitle: HTMLDivElement = document.createElement('h2');
  userListingsTitle.className = 'user-title text-dark';
  userListingsTitle.innerHTML = `${user.name}'s listings:`;
  userListingsContainer.appendChild(userListingsTitle);

  const userListings: HTMLDivElement = document.createElement('div');
  userListings.classList = 'user-posts';
  userListings.id = 'user-posts';
  if (user.listings.length > 0) {
    await renderUserListings(user.name);
  } else
    userListings.innerHTML =
      "User has no listings. Click 'Create Listings' to create a listing ";
  userListingsContainer.appendChild(userListings);

  bannerContainer.appendChild(banner);
  bannerContainer.appendChild(username);
  bannerContainer.appendChild(avatarContainer);
  bannerContainer.appendChild(infoContainer);
  container.appendChild(bannerContainer);
  container.appendChild(userListingsContainer);

  return container;
}
