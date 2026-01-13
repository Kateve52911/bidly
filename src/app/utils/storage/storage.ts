import { Profile } from '../../api/user/types/profile.ts';

export function saveKey(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function loadKey(key: string): string | null {
  return localStorage.getItem(key);
}

export function removeKey(key: string): void {
  localStorage.removeItem(key);
}

export function storeUser(user: Profile): void {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function loadUser(): Profile | null {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}
