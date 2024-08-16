// Import necessary models and utilities
const Board = require('../models/boardModel');

const Organization = require('../models/organizationModel');
const { logger } = require('../utils/logger');
const { validateBoard } = require('../utils/validators');

class boardService {
    
    // Create a new board
    async createBoard(data) {
        try {
            // Validate board data
            const { error } = validateBoard(data);
            if (error) throw new Error(error.details[0].message);

            // Check if the organization exists
            const organization = await Organization.findById(data.organizationId);
            if (!organization) throw new Error('Organization not found');

            // Create the board
            const board = new Board(data);
            await board.save();

            logger.info('Board created successfully');
            return board;
        } catch (error) {
            logger.error(`Error creating board: ${error.message}`);
            throw error;
        }
    }

    // Get board by ID
    async getBoardById(boardId) {
        try {
            const board = await Board.findById(boardId);
            if (!board) throw new Error('Board not found');
            return board;
        } catch (error) {
            logger.error(`Error retrieving board: ${error.message}`);
            throw error;
        }
    }

    // Update board details
    async updateBoard(boardId, updates) {
        try {
            // Validate board updates
            const { error } = validateBoard(updates);
            if (error) throw new Error(error.details[0].message);

            const board = await Board.findByIdAndUpdate(boardId, updates, { new: true });
            if (!board) throw new Error('Board not found');

            logger.info('Board updated successfully');
            return board;
        } catch (error) {
            logger.error(`Error updating board: ${error.message}`);
            throw error;
        }
    }

    // Delete a board
    async deleteBoard(boardId) {
        try {
            const board = await Board.findByIdAndDelete(boardId);
            if (!board) throw new Error('Board not found');

            logger.info('Board deleted successfully');
            return board;
        } catch (error) {
            logger.error(`Error deleting board: ${error.message}`);
            throw error;
        }
    }

    // Get all boards for a specific organization
    async getBoardsByOrganization(organizationId) {
        try {
            const boards = await Board.find({ organizationId });
            return boards;
        } catch (error) {
            logger.error(`Error retrieving boards: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new boardService();
