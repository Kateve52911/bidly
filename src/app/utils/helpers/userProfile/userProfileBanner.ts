import { Profile } from '../../../api/user/types/profile.ts';
import { renderUserListings } from '../../../components/listings/userListings/renderUserListings.ts';

export async function createUserProfile(
  user: Profile,
): Promise<HTMLDivElement> {
  const container: HTMLDivElement = document.createElement('div');
  container.className = 'container';

  const bannerContainer: HTMLDivElement = document.createElement('div');
  bannerContainer.className = 'position-relative mb-4';

  const banner: HTMLImageElement = document.createElement('img');
  banner.className = 'w-100 object-fit-cover';
  banner.style.height = '300px';
  banner.id = 'banner';
  banner.alt = user.name;
  banner.src = user.banner.url;

  const profileOverlay: HTMLDivElement = document.createElement('div');
  profileOverlay.className =
    'position-absolute bottom-0 start-0 w-100 p-3 p-md-4';

  const profileContent: HTMLDivElement = document.createElement('div');
  profileContent.className =
    'd-flex flex-column flex-md-row align-items-center align-items-md-end gap-3';

  const avatar: HTMLImageElement = document.createElement('img');
  avatar.className = 'rounded-circle border border-3 border-white shadow';
  avatar.style.width = '120px';
  avatar.style.height = '120px';
  avatar.id = 'avatar';
  avatar.src = user.avatar.url;
  avatar.alt = user.name;

  const textContent: HTMLDivElement = document.createElement('div');
  textContent.className = 'text-white text-center text-md-start';

  const username: HTMLHeadingElement = document.createElement('h1');
  username.className = 'h2 mb-1 text-white';
  username.textContent = user.name;

  const bio: HTMLParagraphElement = document.createElement('p');
  bio.className = 'mb-0 text-white-50';
  bio.textContent = user.bio || 'No bio has been provided';

  textContent.append(username, bio);

  profileContent.appendChild(avatar);
  profileContent.appendChild(textContent);
  profileOverlay.appendChild(profileContent);

  bannerContainer.append(banner, profileOverlay);

  const userListingsContainer: HTMLDivElement = document.createElement('div');
  userListingsContainer.className = 'py-4 px-3 px-md-4';
  userListingsContainer.id = 'user-posts-container';

  const userListingsTitle: HTMLHeadingElement = document.createElement('h2');
  userListingsTitle.className = 'h4 mb-3';
  userListingsTitle.textContent = `${user.name}'s listings`;

  const userListings: HTMLDivElement = document.createElement('div');
  userListings.id = 'user-posts';

  if (user.listings.length > 0) {
    await renderUserListings(user.name, userListings);
    const userListingCard = document.getElementById('card-body');
    console.log(userListingCard);
  } else {
    userListings.className = 'text-muted';
    userListings.textContent =
      "User has no listings. Click 'Create Listings' to create a listing.";
  }

  userListingsContainer.appendChild(userListingsTitle);
  userListingsContainer.appendChild(userListings);

  container.appendChild(bannerContainer);
  container.appendChild(userListingsContainer);

  return container;
}
