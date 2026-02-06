import { API_KEY } from './constants.ts';
import { loadKey } from '../../utils/storage/storage.ts';

export function headers(hasBody = false): Headers {
  const headers = new Headers();
  const token: string | null = loadKey('accessToken');

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  if (API_KEY) {
    headers.append('X-Noroff-API-Key', API_KEY);
  }

  if (hasBody) {
    headers.append('Content-Type', 'application/json');
  }
  return headers;
}
