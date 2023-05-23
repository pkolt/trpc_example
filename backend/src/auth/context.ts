import { IncomingMessage } from 'http';
import { type DataBase } from '../db.js';
import { getToken } from './utils.js';

export const getAuthFromRequest = async (req: IncomingMessage, db: DataBase) => {
  const accessToken: string = getToken(req.headers.authorization ?? '');
  if (accessToken) {
    //! Запрашивать только нужные данные пользователя.
    const token = await db.tokens.findOne({ where: { accessToken }, relations: ['user'] });
    if (token && token.isValidAccessToken()) {
      const user = token.user;
      if (user && user.isAllowAuth()) {
        return { token, user };
      }
    }
  }
};
