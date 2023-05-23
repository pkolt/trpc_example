import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { EnvSchema } from './schema.js';
import { Environment } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let envData: object = process.env;

if (process.env.NODE_ENV === Environment.Development) {
  const envFilePath = path.join(__dirname, '..', '..', '..', '.env.development');
  const result = dotenv.config({ path: envFilePath });
  if (result.error) {
    throw result.error;
  }
  envData = { ...result.parsed, NODE_ENV: process.env.NODE_ENV };
}

export const config = EnvSchema.parse(envData);
