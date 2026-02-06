import { Profile } from '../../api/user/types/profile.ts';
import { renderUserListings } from '../listings/userListings/renderUserListings.ts';
import { editProfileForm } from '../forms/editProfile/editProfileForm.ts';

export async function createUserProfile(
  user: Profile,
): Promise<HTMLDivElement> {
  const container: HTMLDivElement = document.createElement('div');
  container.className = 'container';
  container.id = 'profile-container';

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
  avatar.style.objectFit = 'cover';
  avatar.style.width = '120px';
  avatar.style.height = '120px';
  avatar.id = 'avatar';
  avatar.src = user.avatar.url;
  avatar.alt = user.name;

  const textContent: HTMLDivElement = document.createElement('div');

  const username: HTMLHeadingElement = document.createElement('h1');
  username.className = 'h2 mb-1 text-white';
  username.textContent = user.name;

  const bio: HTMLParagraphElement = document.createElement('p');
  bio.className = 'mb-0 text-white text-opacity-75';
  bio.textContent = user.bio || 'No bio has been provided';

  const credits: HTMLParagraphElement = document.createElement('p');
  credits.className = 'mb-0 text-white text-opacity-75';
  credits.innerHTML = `<i class="bi bi-wallet-fill text-white text-opacity-75"></i> Credits: ${user.credits}`;

  const editProfileButton: HTMLButtonElement = document.createElement('button');
  editProfileButton.className = 'btn btn-dark btn-sm my-1';
  editProfileButton.id = 'edit-profile';
  editProfileButton.textContent = 'Edit Profile';

  editProfileButton.addEventListener('click', (): void => {
    const userPostContainer: HTMLElement | null =
      document.getElementById('user-content');
    if (!userPostContainer) {
      return;
    }
    userPostContainer.innerHTML = '';
    const editForm: HTMLDivElement = editProfileForm(user);
    userPostContainer.appendChild(editForm);
  });

  textContent.append(username, bio, credits, editProfileButton);

  profileContent.appendChild(avatar);
  profileContent.appendChild(textContent);
  profileOverlay.appendChild(profileContent);

  bannerContainer.append(banner, profileOverlay);

  const userContent: HTMLDivElement = document.createElement('div');
  userContent.className = 'mx-auto py-4 px-3 px-md-4';
  userContent.id = 'user-content';

  const userListingsContainer: HTMLDivElement = document.createElement('div');
  userListingsContainer.id = 'user-posts-container';

  const userListingsTitle: HTMLHeadingElement = document.createElement('h2');
  userListingsTitle.className = 'h4 mb-3';
  userListingsTitle.textContent = `${user.name}'s listings`;

  const userListings: HTMLDivElement = document.createElement('div');
  userListings.id = 'user-posts';

  if (user.listings.length > 0) {
    await renderUserListings(user.name, userListings);
  } else {
    userListings.className = 'text-muted';
    userListings.textContent =
      "User has no listings. Click 'Create Listings' to create a listing.";
  }

  userListingsContainer.appendChild(userListingsTitle);
  userListingsContainer.appendChild(userListings);

  userContent.appendChild(userListingsContainer);

  container.appendChild(bannerContainer);
  container.appendChild(userContent);

  return container;
}
