const express = require('express');
const { json, urlencoded } = require('express');
const connectDB = require('./src/config/dbConfig');
const { rateLimiter } = require('./src/middlewares/ratelimiter');
const { errorHandler } = require('./src/middlewares/errorHandler');
const authRoutes = require('./src/routes/authRoutes');
const boardRoutes = require('./src/routes/boardRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');

const app = express();

// Middleware setup

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(express.static('public'));

// Connect to the database
connectDB();

// Define routes
app.use('/auth', authRoutes);
app.use('/ boards', boardRoutes);
app.use('/tasks', taskRoutes);
app.use('/notifications', notificationRoutes);
app.use('/analytics', analyticsRoutes);

app.use(errorHandler);

module.exports = app;
