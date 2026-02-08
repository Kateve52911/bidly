import { removeKey } from '../../utils/storage/storage.ts';

export function logout(): void {
  removeKey('accessToken');
  removeKey('currentUser');

  window.location.href = '/login';
}
