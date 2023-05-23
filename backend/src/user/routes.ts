import { router } from '../trpc-common.js';
import { current, registration, changePassword } from './procedures.js';

export const userRouter = router({
  current,
  registration,
  changePassword,
});
