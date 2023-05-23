import { z } from 'zod';
import { Environment } from './types.js';
import { numberPreprocess, boolPreprocess } from './utils.js';

export const EnvSchema = z.object({
  NODE_ENV: z.nativeEnum(Environment),
  APP_DB_HOST: z.string(),
  APP_DB_PORT: z.preprocess(numberPreprocess, z.number()),
  APP_DB_USERNAME: z.string(),
  APP_DB_PASSWORD: z.string(),
  APP_DB_NAME: z.string(),
  APP_DB_SYNCHRONIZE: z.preprocess(boolPreprocess, z.boolean()),
  APP_DB_LOGGING: z.preprocess(boolPreprocess, z.boolean()),
  APP_SERVER_PORT: z.preprocess(numberPreprocess, z.number()),
  APP_ACCESS_TOKEN_EXPIRES_IN: z.string(),
  APP_REFRESH_TOKEN_EXPIRES_IN: z.string(),
  APP_REDIS_HOST: z.string(),
  APP_REDIS_PORT: z.preprocess(numberPreprocess, z.number()),
  APP_SITE_HTTPS: z.preprocess(boolPreprocess, z.boolean()),
  APP_SITE_HOST: z.string(),
  APP_SITE_PORT: z.preprocess(numberPreprocess, z.number()),
});
