export function saveKey(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function loadKey(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function removeKey(key: string) {
  localStorage.removeItem(key);
}