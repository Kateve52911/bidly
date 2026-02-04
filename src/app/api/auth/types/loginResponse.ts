export interface Avatar {
  url: string;
  alt: string;
}

export interface Banner {
  url: string;
  alt: string;
}

export interface UserData {
  name: string;
  email: string;
  avatar: Avatar;
  banner: Banner;
  accessToken: string;
}

export interface LoginResponse {
  data: UserData;
  meta: Record<string, unknown>; // or {} if meta is always empty
}
