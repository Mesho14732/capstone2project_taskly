
const taskService = require('../services/taskService');
const { ErrorHandler } = require('../middlewares/errorHandler');


const createTask = async (req, res, next) => {
    try {
        const { title, description, dueDate, assignedTo, boardId } = req.body;
        const newTask = await taskService.createTask({
            title,
            description,
            dueDate,
            assignedTo,
            boardId
        });
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        next(new ErrorHandler(500, 'Failed to create task'));
    }
};

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await taskService.getTasks(req.query);
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        next(new ErrorHandler(500, 'Failed to fetch tasks'));
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) {
            return next(new ErrorHandler(404, 'Task not found'));
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(new ErrorHandler(500, 'Failed to fetch task'));
    }
};
const updateTask = async (req, res, next) => {
    try {
        const updatedTask = await taskService.updateTask(req.params.id, req.body);
        if (!updatedTask) {
            return next(new ErrorHandler(404, 'Task not found'));
        }
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        next(new ErrorHandler(500, 'Failed to update task'));
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await taskService.deleteTask(req.params.id);
        if (!deletedTask) {
            return next(new ErrorHandler(404, 'Task not found'));
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        next(new ErrorHandler(500, 'Failed to delete task'));
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}