import { DateTime } from 'luxon';
import { trpc } from '../trpc.js';

export const Logger = trpc.middleware(async ({ next, path, type, ctx }) => {
  const startDate = DateTime.utc();
  const result = await next({ ctx });
  const finishDate = DateTime.utc();
  const durationMs = finishDate.toMillis() - startDate.toMillis();
  console.log(`[${startDate.toSQL()}]: ${type} ---> ${path} (${durationMs} ms)`);
  return result;
});
