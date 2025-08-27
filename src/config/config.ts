import dotenv from 'dotenv';
import path from 'path';

const envName = process.env.NODE_ENV || "development";

dotenv.config({path: path.resolve(process.cwd(), `.env.${envName}`)})

interface Config {
  port: number;
  nodeEnv: string;
  useMocks: boolean;
  corsOrigin?: string;
}

const isProd = envName === "production";
const corsOrigin = isProd ? process.env.CORS_ORIGIN : (process.env.CORS_ORIGIN || `http://localhost:${process.env.CORS_PORT}`)
const rawUseMocks = process.env.USE_MOCKS == "true";

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  useMocks: rawUseMocks && envName !== "production",
  ...(corsOrigin ? { corsOrigin} : {}),
};

export default config;
