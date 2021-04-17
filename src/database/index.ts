import { Sequelize } from 'sequelize-typescript';
import { Url } from './models/Url';
import 'dotenv/config';

const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: 'postgres',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  models: [Url],
  logging: false,
});

export default sequelize;
