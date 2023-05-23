import { pick } from '../utils/pick.js';
import { Token } from './entity/token.js';

export const getTokenResponse = (token: Token) => pick(token, 'accessToken', 'refreshToken', 'userId');
