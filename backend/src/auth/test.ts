import assert from 'node:assert';
import { describe, it } from 'node:test';

describe('auth routes', () => {
  it.todo('login', () => {});
  it.todo('logout', () => {});
  it.todo('updateToken', () => {});
});

// import { FastifyInstance } from 'fastify';
// import { createApp } from '../app';
// import { AuthApi } from '@wisdom/common';
// import { Token, User } from './types';

// const authorize = async (app: FastifyInstance) => {
//   const response = await app.inject({
//     method: 'POST',
//     url: AuthApi.Login,
//     payload: { login: 'admin', password: 'admin' },
//   });
//   const token: Token = response.json();
//   return { response, token };
// };

// describe('auth routes', () => {
//   let app: FastifyInstance;

//   beforeAll(async () => {
//     app = await createApp();
//   });

//   test(`POST ${AuthApi.Login}`, async () => {
//     const { response, token } = await authorize(app);
//     expect(token).not.toBeNull();
//     expect(response.statusCode).toEqual(200);
//   });

//   test(`GET ${AuthApi.getCurrentUser}`, async () => {
//     const { token } = await authorize(app);
//     const response = await app.inject({
//       method: 'GET',
//       url: AuthApi.getCurrentUser,
//       headers: { authorization: `Bearer: ${token.accessToken}` },
//     });
//     const user: User = response.json();
//     expect(user.login === 'admin');
//     expect(response.statusCode).toEqual(200);
//   });

//   test(`POST ${AuthApi.Logout}`, async () => {
//     const { token } = await authorize(app);
//     const response = await app.inject({
//       method: 'POST',
//       url: AuthApi.Logout,
//       headers: { authorization: `Bearer: ${token.accessToken}` },
//     });
//     expect(response.statusCode).toEqual(200);
//   });
// });
