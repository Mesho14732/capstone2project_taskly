// src/services/taskService.js

const Task = require('../models/taskModel');
const Board = require('../models/boardModel');
const logger = require('../utils/logger'); 

// Create a new task
async function createTask(taskData) {
    try {
        const { title, description, boardId, assignedTo, dueDate } = taskData;

        // Validate that the board exists
        const board = await Board.findById(boardId);
        if (!board) {
            throw new Error('Board not found');
        }

        // Create the task
        const newTask = new Task({
            title,
            description,
            board: boardId,
            assignedTo,
            dueDate,
            status: 'pending', // Default status
        });

        await newTask.save();

        // Update the board with the new task
        board.tasks.push(newTask._id);
        await board.save();

        return newTask;
    } catch (error) {
        logger.error(`Error creating task: ${error.message}`);
        throw new Error('Could not create task');
    }
}

// Retrieve a task by ID
async function getTaskById(taskId) {
    try {
        const task = await Task.findById(taskId).populate('assignedTo', 'name email').populate('board', 'name');
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    } catch (error) {
        logger.error(`Error retrieving task: ${error.message}`);
        throw new Error('Could not retrieve task');
    }
}

// Update a task
async function updateTask(taskId, updateData) {
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

        if (!updatedTask) {
            throw new Error('Task not found');
        }

        return updatedTask;
    } catch (error) {
        logger.error(`Error updating task: ${error.message}`);
        throw new Error('Could not update task');
    }
}

// Delete a task
async function deleteTask(taskId) {
    try {
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            throw new Error('Task not found');
        }

        // Remove task from the board
        await Board.updateOne({ _id: task.board }, { $pull: { tasks: taskId } });

        return task;
    } catch (error) {
        logger.error(`Error deleting task: ${error.message}`);
        throw new Error('Could not delete task');
    }
}

// List tasks by board ID
async function getTasksByBoard(boardId) {
    try {
        const tasks = await Task.find({ board: boardId }).populate('assignedTo', 'name email').populate('board', 'name');
        return tasks;
    } catch (error) {
        logger.error(`Error retrieving tasks: ${error.message}`);
        throw new Error('Could not retrieve tasks');
    }
}

module.exports = {
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    getTasksByBoard,
};
