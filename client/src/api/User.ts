import { validateResponse } from './../utils/validateResponse';
import {
  User,
  ResponseFetchMe,
  ResponseFetchMeSchema,
} from './../schemas/UserSchema';

export function registerUser(user: User): Promise<void> {
  return fetch('api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('ошибка регистрации');
    }
  });
}

export function loginUser(email: string, password: string): Promise<void> {
  return fetch('api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchMe(): Promise<ResponseFetchMe> {
  return fetch('api/users/me')
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => ResponseFetchMeSchema.parse(data));
}

export function logoutUser(): Promise<void> {
  return fetch('api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(validateResponse)
    .then(() => undefined);
}
