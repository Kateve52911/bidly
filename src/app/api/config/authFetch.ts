import { headers } from './headers.ts';

export async function authFetch(
  url: string | URL,
  options?: RequestInit,
): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: headers(Boolean(options?.body)),
  });
}
