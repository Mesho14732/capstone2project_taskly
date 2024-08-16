const taskService = require('../../src/services/taskService');
const taskModel = require('../../src/models/taskModel');
const mockData = require('../mocks/mockData');

// Mock the task model
jest.mock('../../src/models/taskModel');

describe('Task Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new task', async () => {
        // Setup mock response
        taskModel.create.mockResolvedValue(mockData.newTask);

        const result = await taskService.createTask(mockData.newTaskData);

        expect(result).toEqual(mockData.newTask);
        expect(taskModel.create).toHaveBeenCalledWith(mockData.newTaskData);
    });

    test('should get all tasks', async () => {
        // Setup mock response
        taskModel.find.mockResolvedValue(mockData.tasks);

        const result = await taskService.getAllTasks();

        expect(result).toEqual(mockData.tasks);
        expect(taskModel.find).toHaveBeenCalled();
    });

});
