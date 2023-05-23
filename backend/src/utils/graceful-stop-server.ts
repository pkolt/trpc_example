import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { type DataSource } from 'typeorm';

type TRPCServer = ReturnType<typeof createHTTPServer>;

interface Resources {
  server: TRPCServer;
  dataSource: DataSource;
}

const stopServer = async (signalName: string, { server, dataSource }: Resources) => {
  console.info(`Stopping server (on signal "${signalName}").`);

  try {
    console.info('Stop database...');
    await dataSource.destroy();
    console.info('Done! Stop database.');
  } catch (err) {
    console.error(err);
  }

  try {
    console.info('Stop Http server...');
    await new Promise((resolve, reject) => {
      server.server.close((err) => (err ? reject(err) : resolve(null)));
    });
    console.info('Done! Stop http server.');
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
};

/**
 * Enable graceful stop
 * https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html
 */
export const gracefulStopServer = (resources: Resources) => {
  ['SIGINT', 'SIGTERM'].forEach((signalName) => {
    process.on(signalName, () => stopServer(signalName, resources));
  });
};
