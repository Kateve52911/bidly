import { loadCurrentUser } from '../../utils/storage/storage.ts';
import { fetchUser } from '../../api/user/fetchUser.ts';
import { createUserProfile } from '../../utils/helpers/userProfile/userProfileBanner.ts';
import { fetchUserListings } from '../../api/listings/fetch/fetchUserListings.ts';

export async function renderProfilePage() {
  const user = loadCurrentUser();

  if (!user) {
    throw new Error('No user found');
  }
  if (user) {
    const userName = user.name;
    const userData = await fetchUser(userName);

    await fetchUserListings(userName);

    const app = document.getElementById('app');
    if (app) {
      app.appendChild(await createUserProfile(userData));
    }
  }
}
