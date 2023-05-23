import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { createContext } from './context.js';
import { initDataSource } from './db.js';
import { appRouter } from './router.js';
import { config } from './config/index.js';
import { gracefulStopServer } from './utils/graceful-stop-server.js';

const startApp = async () => {
  // Initial database
  const dataSource = await initDataSource();

  const server = createHTTPServer({
    router: appRouter,
    createContext,
  });

  gracefulStopServer({ server, dataSource });

  server.listen(config.APP_SERVER_PORT);
  console.info(`Started http server on http://localhost:${config.APP_SERVER_PORT}`);
};

if (import.meta.url === import.meta.url) {
  startApp().catch((err) => console.error(err));
}
