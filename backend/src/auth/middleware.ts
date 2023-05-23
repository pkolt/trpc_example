import { TRPCError } from '@trpc/server';
import { trpc } from '../trpc.js';

export const isAuth = trpc.middleware(({ next, ctx }) => {
  if (ctx.auth?.user) {
    return next({ ctx: { ...ctx, auth: ctx.auth } });
  }
  throw new TRPCError({
    code: 'UNAUTHORIZED',
  });
});
