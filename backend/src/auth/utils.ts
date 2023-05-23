import crypto from 'crypto';
import { promisify } from 'util';

const asyncRandomBytes = promisify(crypto.randomBytes);

// https://github.com/oauthjs/node-oauth2-server/blob/master/lib/utils/token-util.js
export const getRandomToken = async (): Promise<string> => {
  const buffer = await asyncRandomBytes(256);
  return crypto.createHash('sha1').update(buffer).digest('hex');
};

export const getToken = (authHeader: string): string => {
  return authHeader.match(/^Bearer\s+(?<exid>[\w-]+)$/)?.groups?.exid ?? '';
};
