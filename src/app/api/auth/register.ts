import { AUTH, BASE_URL, REGISTER } from '../constants/constants.ts';
import { UserData } from '../types/api.ts';

interface RegisterSuccess {
  success: true;
  data: UserData;
}

interface RegisterFailure {
  success: false;
  error: string;
  statusCode?: number;
}

type RegisterResult = RegisterSuccess | RegisterFailure;

export async function register(userData: object): Promise<RegisterResult> {
  try {
    const response: Response = await fetch(`${BASE_URL}${AUTH}${REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  } catch (error) {
    console.error('Could not register the account', error);
    return {
      success: false,
      error: 'Network error - please check your connection',
    };
  }
}
