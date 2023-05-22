// Import Redis for cache storage
import { createClient } from 'redis'
import env from './env';


// Connect to Redis
const redisClient = createClient({
  url: env.REDIS_URL
});

redisClient.connect();


redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

export default redisClient;