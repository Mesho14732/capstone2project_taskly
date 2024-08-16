

const mongoose = require('mongoose');
const logger = require('../utils/logger');

require('dotenv').config();

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        logger.info('Database connection successful');
    } catch (error) {
        logger.error('Database connection error:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;

