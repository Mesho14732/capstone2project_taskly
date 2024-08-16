const BoardService = require('../../src/services/boardService');
const BoardModel = require('../../src/models/boardModel');

jest.mock('../../src/models/boardModel'); 

describe('BoardService', () => {
    
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    describe('createBoard', () => {
        it('should create a new board', async () => {
            const boardData = { title: 'New Board', description: 'Board Description' };
            const createdBoard = { ...boardData, _id: 'someObjectId' };
            
            BoardModel.create.mockResolvedValue(createdBoard);

            const result = await BoardService.createBoard(boardData);

            expect(BoardModel.create).toHaveBeenCalledWith(boardData);
            expect(result).toEqual(createdBoard);
        });

        it('should throw an error if creation fails', async () => {
            const boardData = { title: 'New Board' };
            const errorMessage = 'Creation failed';

            BoardModel.create.mockRejectedValue(new Error(errorMessage));

            await expect(BoardService.createBoard(boardData)).rejects.toThrow(errorMessage);
            expect(BoardModel.create).toHaveBeenCalledWith(boardData);
        });
    });

    describe('getBoardById', () => {
        it('should return the board when given a valid ID', async () => {
            const boardId = 'someObjectId';
            const board = { _id: boardId, title: 'Existing Board' };

            BoardModel.findById.mockResolvedValue(board);

            const result = await BoardService.getBoardById(boardId);

            expect(BoardModel.findById).toHaveBeenCalledWith(boardId);
            expect(result).toEqual(board);
        });

        it('should throw an error if the board is not found', async () => {
            const boardId = 'nonexistentId';
            BoardModel.findById.mockResolvedValue(null);

            await expect(BoardService.getBoardById(boardId)).rejects.toThrow('Board not found');
            expect(BoardModel.findById).toHaveBeenCalledWith(boardId);
        });
    });

    describe('updateBoard', () => {
        it('should update the board and return the updated board', async () => {
            const boardId = 'someObjectId';
            const updateData = { title: 'Updated Title' };
            const updatedBoard = { _id: boardId, ...updateData };

            BoardModel.findByIdAndUpdate.mockResolvedValue(updatedBoard);

            const result = await BoardService.updateBoard(boardId, updateData);

            expect(BoardModel.findByIdAndUpdate).toHaveBeenCalledWith(boardId, updateData, { new: true });
            expect(result).toEqual(updatedBoard);
        });

        it('should throw an error if the update fails', async () => {
            const boardId = 'someObjectId';
            const updateData = { title: 'Updated Title' };
            const errorMessage = 'Update failed';

            BoardModel.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));

            await expect(BoardService.updateBoard(boardId, updateData)).rejects.toThrow(errorMessage);
            expect(BoardModel.findByIdAndUpdate).toHaveBeenCalledWith(boardId, updateData, { new: true });
        });
    });

    describe('deleteBoard', () => {
        it('should delete the board and return a success message', async () => {
            const boardId = 'someObjectId';

            BoardModel.findByIdAndDelete.mockResolvedValue({});

            const result = await BoardService.deleteBoard(boardId);

            expect(BoardModel.findByIdAndDelete).toHaveBeenCalledWith(boardId);
            expect(result).toEqual({ message: 'Board deleted successfully' });
        });

        it('should throw an error if deletion fails', async () => {
            const boardId = 'someObjectId';
            const errorMessage = 'Deletion failed';

            BoardModel.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

            await expect(BoardService.deleteBoard(boardId)).rejects.toThrow(errorMessage);
            expect(BoardModel.findByIdAndDelete).toHaveBeenCalledWith(boardId);
        });
    });
});
