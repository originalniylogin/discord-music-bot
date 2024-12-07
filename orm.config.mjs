import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const config = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadModels: true,
  synchronize: false,
  logging: process.env.ENABLE_ORM_LOGS || undefined,
};

export default config;
