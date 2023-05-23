import { router } from '../trpc-common.js';
import { login, logout, updateToken } from './procedures.js';

export const authRouter = router({
  login,
  logout,
  updateToken,
});
