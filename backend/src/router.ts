import { router, publicProcedure } from './trpc-common.js';
import { authRouter } from './auth/routes.js';
import { userRouter } from './user/routes.js';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  test: publicProcedure.query((req) => {
    return 'Hello world!';
  }),
});

export type AppRouter = typeof appRouter;
