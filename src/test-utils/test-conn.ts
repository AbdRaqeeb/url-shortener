import { Sequelize } from 'sequelize-typescript';
import { Url } from '../database/models/Url';
import 'dotenv/config';

const conn = new Sequelize({
  database: process.env.DATABASE_TEST,
  dialect: 'postgres',
  username: process.env.DATABASE_USER_TEST,
  password: process.env.DATABASE_PASSWORD_TEST,
  host: process.env.DATABASE_HOST_TEST,
  models: [Url],
  logging: false,
});

export const connect = async (command: string): Promise<void> => {
  if (command === 'open') {
    await conn.sync({ force: true });
  }

  if (command === 'close') {
    await conn.close();
  }
};
