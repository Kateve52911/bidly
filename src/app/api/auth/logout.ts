import { removeKey } from '../../utils/storage/storage.ts';

export function logout() {
  removeKey('accessToken');
  removeKey('currentUser');

  window.location.href = '/login';
}
