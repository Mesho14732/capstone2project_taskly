const express = require('express');
const authRoutes = express.Router();
const  authController = require ('../Controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to register a new user
authRoutes.post('/register', authController.register);

// Route to log in a user
authRoutes.post('/login', authController.login);

// Route to get the current user (protected route)
authRoutes.get('/me', authMiddleware.verifyToken, authController.getCurrentUser);

// Route to refresh the access token
authRoutes.post('/refresh-token', authController.refreshToken);

module.exports = authRoutes;
