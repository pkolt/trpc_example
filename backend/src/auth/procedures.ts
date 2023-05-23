import { TRPCError } from '@trpc/server';
import { publicProcedure, protectedProcedure } from '../trpc-common.js';
import { getTokenResponse } from './responses.js';
import { LoginSchema, UpdateTokenSchema } from './schemas.js';

export const login = publicProcedure.input(LoginSchema).mutation(async ({ input, ctx }) => {
  const user = await ctx.db.users.findOne({ where: { login: input.login } });
  if (user && user.isAllowAuth()) {
    const isValidPassword = await user.checkPassword(input.password);
    if (isValidPassword) {
      const token = ctx.db.tokens.create({ user });
      await token.updateToken();
      await ctx.db.tokens.save(token);
      return getTokenResponse(token);
    }
  }
  throw new TRPCError({ code: 'BAD_REQUEST', message: 'Not valid login or password.' });
});

export const logout = protectedProcedure.mutation(async ({ ctx }) => {
  const { token } = ctx.auth;
  await ctx.db.tokens.remove(token);
  return null;
});

export const updateToken = publicProcedure.input(UpdateTokenSchema).mutation(async ({ input, ctx }) => {
  const token = await ctx.db.tokens.findOne({ where: { refreshToken: input.refreshToken }, relations: ['user'] });
  if (token && token.isValidRefreshToken()) {
    const user = token.user;
    if (user && user.isAllowAuth()) {
      await token.updateToken();
      await ctx.db.tokens.save(token);
      return getTokenResponse(token);
    }
  }
  throw new TRPCError({ code: 'BAD_REQUEST' });
});
