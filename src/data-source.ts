import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Users } from './model/users/users.entity';
import { Sessions } from './model/sessions/sessions.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql', // or 'postgres'
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Users, Sessions],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
