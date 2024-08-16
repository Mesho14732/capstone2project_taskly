const express = require('express');
const boardController = require ('../Controllers/boardController');
const boardRoutes = express.Router();

boardRoutes.post('/create', boardController.createBoard);

// Route to get a board by ID
boardRoutes.get('/:id', boardController.getBoardById);

// Route to update a board by ID
boardRoutes.put('/:id', boardController.updateBoard);

// Route to delete a board by ID
boardRoutes.delete('/:id', boardController.deleteBoard);

// Route to get all boards
boardRoutes.get('/', boardController.getAllBoards);

module.exports = boardRoutes;
