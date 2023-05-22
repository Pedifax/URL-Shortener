type env_t = {
  BASE_URL: string;
}

const env: env_t = {
  BASE_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:4000",
}

export default env;
