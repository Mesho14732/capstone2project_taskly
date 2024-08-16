const redis = require('redis');


const cacheConfig = {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
};

const client = redis.createClient({
    url: `redis://${cacheConfig.redisHost}:${cacheConfig.redisPort}`,
    legacyMode: true,
});


client.on('error', (err) => {
    console.error('Redis error: ', err);
});

module.exports = {
    client,
    cacheConfig,
};
