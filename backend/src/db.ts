import { DataSource } from 'typeorm';
import { Token } from './auth/entity/token.js';
import { User } from './user/entity/user.js';
import { config } from './config/index.js';

// https://typeorm.io/data-source-options#mysql--mariadb-data-source-options
export const dataSource = new DataSource({
  type: 'mariadb',
  host: config.APP_DB_HOST,
  port: config.APP_DB_PORT,
  username: config.APP_DB_USERNAME,
  password: config.APP_DB_PASSWORD,
  database: config.APP_DB_NAME,
  synchronize: config.APP_DB_SYNCHRONIZE,
  logging: config.APP_DB_LOGGING,
  entities: [User, Token],
  timezone: 'Z',
});

export const initDataSource = async (): Promise<DataSource> => {
  if (!dataSource.isInitialized) {
    try {
      await dataSource.initialize();
    } catch (err) {
      console.log((err as Error).message);
      throw new Error(`Unable to connect to database (${config.APP_DB_HOST}:${config.APP_DB_PORT}).`);
    }
  }
  return dataSource;
};

export const getDataBase = () => {
  const users = dataSource.getRepository(User);
  const tokens = dataSource.getRepository(Token);
  return {
    users,
    tokens,
    dataSource,
  };
};

export type DataBase = ReturnType<typeof getDataBase>;
