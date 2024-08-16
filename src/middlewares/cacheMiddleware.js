const redis = require('redis');
const client = redis.createClient(); 
client.on('error', (err) => console.error('Redis error: ', err));


const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url;

    // Check if response is cached
    client.get(key, (err, cachedData) => {
        if (err) return next(err);

        if (cachedData) {
            return res.send(JSON.parse(cachedData));
        }

        // If not cached, proceed to next middleware
        res.sendResponse = res.send;
        res.send = (body) => {
            // Cache response in Redis
            client.setex(key, 3600, JSON.stringify(body)); // Cache for 1 hour
            res.sendResponse(body);
        };

        next();
    });
};

module.exports = cacheMiddleware;
