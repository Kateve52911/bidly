export function saveKey(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function loadKey(key: string): string | null {
  return localStorage.getItem(key);
}

export function removeKey(key: string): void {
  localStorage.removeItem(key);
}
