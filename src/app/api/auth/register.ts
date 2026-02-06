import { AUTH, BASE_URL, REGISTER } from '../config/constants.ts';
import { UserData } from '../types/api.ts';
import { authFetch } from '../config/authFetch.ts';

interface RegisterSuccess {
  success: true;
  data: UserData;
}

interface RegisterFailure {
  success: false;
  error: string;
  statusCode?: number;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

type RegisterResult = RegisterSuccess | RegisterFailure;

export async function register(
  userData: RegisterCredentials,
): Promise<RegisterResult> {
  const response: Response = await authFetch(`${BASE_URL}${AUTH}${REGISTER}`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    return {
      success: false,
      error: data.errors?.[0]?.message || 'Registration failed',
      statusCode: response.status,
    };
  }
  return {
    success: true,
    data: data.data,
  };
}
