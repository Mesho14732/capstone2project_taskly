const boardService = require('../services/boardService');

// Create a new board
const createBoard = async (req, res, next) => {
  try {
    const { name, description, organizationId } = req.body;
    const userId = req.user.id;

    const board = await boardService.createBoard({ name, description, organizationId, userId });
    res.status(201).json({ success: true, data: board });
  } catch (error) {
    next(error); 
  }
};

// Get a board by ID
const getBoardById = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const board = await boardService.getBoardById(boardId);

    if (!board) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }

    res.status(200).json({ success: true, data: board });
  } catch (error) {
    next(error);
  }
};

// Update a board
const updateBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const { name, description } = req.body;

    const updatedBoard = await boardService.updateBoard(boardId, { name, description });

    if (!updatedBoard) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }

    res.status(200).json({ success: true, data: updatedBoard });
  } catch (error) {
    next(error);
  }
};

// Delete a board
const deleteBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    const deleted = await boardService.deleteBoard(boardId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }

    res.status(200).json({ success: true, message: 'Board deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get all boards for a user
const getBoardsByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const boards = await boardService.getBoardsByUser(userId);

    res.status(200).json({ success: true, data: boards });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
  getBoardsByUser
};