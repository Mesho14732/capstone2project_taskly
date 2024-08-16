const express = require('express');
const taskRoutes = express.Router();
const taskController = require ('../Controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

taskRoutes.get('/', authMiddleware, taskController.getAllTasks);
taskRoutes.get('/:id', authMiddleware, taskController.getTaskById);
taskRoutes.post('/', authMiddleware, taskController.createTask);
taskRoutes.put('/:id', authMiddleware, taskController.updateTask);
taskRoutes.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = taskRoutes;
