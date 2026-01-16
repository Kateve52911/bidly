import { loadUser } from '../../utils/storage/storage.ts';
import { fetchUser } from '../../api/user/fetchUser.ts';
import { createUserProfile } from '../../utils/helpers/userProfile/userProfileBanner.ts';
import { fetchUserListings } from '../../api/listings/fetch/fetchSingleUsersListings.ts';

export async function renderProfilePage() {
  const user = loadUser();

  if (!user) {
    throw new Error('No user found');
  }
  if (user) {
    const userName = user.name;
    const userData = await fetchUser(userName);

    await fetchUserListings(userName);

    const app = document.getElementById('app');
    if (app) {
      app.appendChild(createUserProfile(userData));
    }
  }
}
