import dotenv from 'dotenv';
if(process.env.NODE_ENV === 'development') {
  dotenv.config();
}
type env_t = {
  PORT: number;

  // only used in development for CORS purpose
  FRONTEND_URL: string;
  REDIS_URL: string | undefined;
}

const env: env_t = {
  PORT: (process.env.PORT && parseInt(process.env.PORT)) || 4000,
  FRONTEND_URL: process.env.NODE_ENV != 'production' ? "http://localhost:3000" : "",
  REDIS_URL: process.env.NODE_ENV != 'production' ? "redis://127.0.0.1:6379": process.env.REDIS_URL
}

export = env;
