

const cache = require('../config/cacheConfig'); // Import the cache configuration

class CacheService {
    /**
     * Sets a key-value pair in the cache.
     * @param {string} key
     * @param {*} value 
     * @param {number} ttl .
     */
    async set(key, value, ttl = 3600) {
        try {
            await cache.set(key, JSON.stringify(value), 'EX', ttl); // Set key with expiry
        } catch (error) {
            console.error('Error setting cache:', error);
            throw error;
        }
    }

    /**
     * Retrieves a value from the cache by key.
     * @param {string} key - The key of the cached value.
     * @returns {*} - The cached value, or null if not found.
     */
    async get(key) {
        try {
            const value = await cache.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error getting cache:', error);
            throw error;
        }
    }

    /**
     * Deletes a value from the cache by key.
     * @param {string} key - The key of the cached value to delete.
     */
    async del(key) {
        try {
            await cache.del(key);
        } catch (error) {
            console.error('Error deleting cache:', error);
            throw error;
        }
    }

    /**
     * Clears all cache entries.
     */
    async clear() {
        try {
            await cache.flushAll();
        } catch (error) {
            console.error('Error clearing cache:', error);
            throw error;
        }
    }
}

module.exports = new CacheService();
