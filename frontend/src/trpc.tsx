import { useCallback, useMemo } from 'react';
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, httpLink, loggerLink, createTRPCProxyClient, type CreateTRPCProxyClient } from '@trpc/client';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter as _AppRouter } from '@wisdom/backend/src/router.js';
import { useAuthStore } from './store/auth.js';
import { FetchEsque } from '@trpc/client/dist/internals/types';

//! How reexport right?
export type AppRouter = _AppRouter;
export type RouterInput = inferRouterInputs<_AppRouter>;
export type RouterOutput = inferRouterOutputs<_AppRouter>;

export const trpc = createTRPCReact<AppRouter>();

type TrpcVanilla = CreateTRPCProxyClient<AppRouter>;
type TrpcProviderProps = React.PropsWithChildren;

const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const TrpcProvider: React.FC<TrpcProviderProps> = ({ children }) => {
  const auth = useAuthStore();
  const trpcVanilla = useMemo<TrpcVanilla>(
    () =>
      createTRPCProxyClient<AppRouter>({
        links: [
          httpLink({
            url: '/api',
          }),
        ],
      }),
    [],
  );

  const getHeaders = useCallback(() => {
    if (auth.data?.accessToken) {
      return getAuthHeader(auth.data.accessToken);
    }
    return {};
  }, [auth.data?.accessToken]);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
    [],
  );

  const fetchFunc = useCallback<FetchEsque>(
    async (url, opts) => {
      const response = await fetch(url, opts as RequestInit);
      if (response.status === 401) {
        const refreshToken = auth.data?.refreshToken;
        if (refreshToken) {
          try {
            const data = await trpcVanilla.auth.updateToken.mutate({ refreshToken });
            auth.setData(data);
            const repeatResponse = await fetch(url, {
              ...opts,
              headers: { ...opts?.headers, ...getAuthHeader(data.accessToken) },
            } as RequestInit);
            if (repeatResponse.ok) {
              return repeatResponse;
            }
          } catch (err) {
            // ...
          }
        }
        auth.reset();
      }
      return response;
    },
    [auth, trpcVanilla.auth.updateToken],
  );

  const trpcClient = useMemo(() => {
    return trpc.createClient({
      links: [
        loggerLink({ enabled: () => process.env.NODE_ENV === 'development' }),
        httpBatchLink({
          url: '/api',
          headers: getHeaders,
          fetch: fetchFunc,
        }),
      ],
    });
  }, [getHeaders, fetchFunc]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
