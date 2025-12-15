import { loadKey } from '../storage/storage.ts';

export function isAuthenticated(): boolean {
  const token: string | null = loadKey('accessToken');
  return token !== null;
}
