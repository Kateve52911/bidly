import { AUTH, BASE_URL, LOGIN } from '../config/constants.ts';
import { saveKey } from '../../utils/storage/storage.ts';
import type { UserData } from '../types/api.ts';
import { authFetch } from '../config/authFetch.ts';

interface LoginSuccess {
  success: true;
  data: UserData;
}

interface LoginFailure {
  success: false;
  error: string;
  statusCode?: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}

type LoginResult = LoginSuccess | LoginFailure;

export async function login(userData: LoginCredentials): Promise<LoginResult> {
  try {
    const response: Response = await authFetch(`${BASE_URL}${AUTH}${LOGIN}`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      return {
        success: false,
        error: json.errors?.[0]?.message || 'Unable to login',
        statusCode: response.status,
      };
    }

    const accessToken = json.data.accessToken;
    const userDetails = json.data;

    saveKey('accessToken', accessToken);
    saveKey('currentUser', JSON.stringify(userDetails));

    return {
      success: true,
      data: userDetails,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Network error - please check your connection',
    };
  }
}
