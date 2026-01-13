import { loadUser } from '../../utils/storage/storage.ts';
import { fetchUser } from '../../api/user/fetchUser.ts';

export async function renderProfilePage() {
  const user = loadUser();
  if (user) {
    const userName = user.name;
    await fetchUser(userName);
    console.log(user);
  }
}
