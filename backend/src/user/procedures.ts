import { publicProcedure, protectedProcedure } from '../trpc-common.js';
import { RegistrationSchema, ChangePasswordSchema } from './schemas.js';
import { pick } from '../utils/pick.js';
import { TRPCError } from '@trpc/server';

export const current = protectedProcedure.query(async ({ ctx }) => {
  // Get yours user profile.
  const { user } = ctx.auth;
  return pick(user, 'id', 'login', 'email', 'username');
});

export const registration = publicProcedure.input(RegistrationSchema).mutation(async ({ input, ctx }) => {
  await ctx.db.users.save(ctx.db.users.create(input));
});

export const changePassword = protectedProcedure.input(ChangePasswordSchema).mutation(async ({ input, ctx }) => {
  const { user } = ctx.auth;
  const isValidPassword = await user.checkPassword(input.oldPassword);
  if (isValidPassword) {
    user.password = input.newPassword;
    await ctx.db.users.save(user);
    return true;
  }
  throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid password' });
});
