import { z } from 'zod';
import { UserSchema } from '../user/schemas.js';

export const UpdateTokenSchema = z.object({
  refreshToken: z.string().max(50),
});

export const LoginSchema = UserSchema.pick({ login: true, password: true });
