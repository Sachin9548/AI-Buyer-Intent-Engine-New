import Redis from 'ioredis';

const redis = new Redis(process.env.UPSTASH_REDIS_URL!, {
  tls: {},
  retryStrategy: (times) => {
    if (times > 5) return null;
    return 1000;
  },
});

redis.on('connect', () => console.log('✅ Connected to Upstash Redis'));
redis.on('error', (err) => console.error('❌ Redis Error:', err));

export default redis;
