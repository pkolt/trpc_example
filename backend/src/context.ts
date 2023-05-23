import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { getDataBase } from './db.js';
import { getAuthFromRequest } from './auth/context.js';

export const createContext = async (opts: CreateHTTPContextOptions) => {
  const db = getDataBase();
  const auth = await getAuthFromRequest(opts.req, db);
  return {
    db,
    auth,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
