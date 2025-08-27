import dotenv from 'dotenv';
import path from 'path';

const envName = process.env.NODE_ENV || "development";

dotenv.config({path: path.resolve(process.cwd(), `.env.${envName}`)})

interface Config {
  port: number;
  nodeEnv: string;
  useMocks: boolean;
}

const rawUseMocks = process.env.USE_MOCKS == "true";

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  useMocks: rawUseMocks && envName !== "production"
};

export default config;
