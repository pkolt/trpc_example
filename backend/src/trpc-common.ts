import { trpc } from './trpc.js';
import { isAuth } from './auth/middleware.js';
import { Logger } from './logger/middleware.js';
import { Environment, config } from './config/index.js';

const isDevelopment = config.NODE_ENV === Environment.Development;
const trpcProcedure = isDevelopment ? trpc.procedure.use(Logger) : trpc.procedure;

export const middleware = trpc.middleware;
export const router = trpc.router;
export const publicProcedure = trpcProcedure;
export const protectedProcedure = trpcProcedure.use(isAuth);
