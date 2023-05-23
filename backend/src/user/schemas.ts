import { z } from 'zod';

const PasswordSchema = z.string().min(8).max(20);

export const UserSchema = z.object({
  id: z.string().uuid(),
  login: z.string().min(3).max(20),
  password: PasswordSchema,
  email: z.string().email(),
  username: z.string().min(3).max(20),
});

export const RegistrationSchema = UserSchema.pick({ login: true, password: true, email: true, username: true });

export const ChangePasswordSchema = z
  .object({
    oldPassword: PasswordSchema,
    newPassword: PasswordSchema,
    confirmNewPassword: PasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New password and confirm new password not equal.',
    path: ['newPassword'],
  });
