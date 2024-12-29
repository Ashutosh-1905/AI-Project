import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.SERVER_PORT,
  databaseUrl: process.env.MONGODB_URI,
  env: process.env.NODE_ENV,
  frontedUrl: process.env.FRONTEND_URL,
};

const config = Object.freeze(_config);

export default config;
