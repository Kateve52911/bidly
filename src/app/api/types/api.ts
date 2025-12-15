interface MediaItem {
  url: string;
  alt: string;
}

export interface UserData {
  name: string;
  email: string;
  avatar: MediaItem;
  banner: MediaItem;
}
