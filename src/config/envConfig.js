

require('dotenv').config();

const envConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || 'localhost',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    API_RATE_LIMIT: process.env.API_RATE_LIMIT || 100,  // Requests per minute
};

module.exports = { envConfig };
