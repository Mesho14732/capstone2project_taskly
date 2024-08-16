const request = require('supertest');
const app = require('../../src/app');  
const db = require('../../src/config/dbConfig');  
const Task = require('../../src/models/taskModel');

describe('Task Routes Integration Tests', () => {
    beforeAll(async () => {
        await db.connect();  // Connect to the test database
    });

    afterAll(async () => {
        await db.disconnect();  // Disconnect from the test database
    });

    beforeEach(async () => {
        await Task.deleteMany({});  // Clear tasks collection before each test
    });

    afterEach(async () => {
        await Task.deleteMany({});  // Clear tasks collection after each test
    });
});
    
it('should create a new task', async () => {
    const newTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'Pending',
        dueDate: '2024-08-20'
    };

    const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);  // Expect HTTP 201 status code

    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Test Task');
});

it('should fetch all tasks', async () => {
    const task1 = new Task({ title: 'Task 1', description: 'Description 1', status: 'Pending', dueDate: '2024-08-20' });
    const task2 = new Task({ title: 'Task 2', description: 'Description 2', status: 'Completed', dueDate: '2024-08-21' });
    
    await task1.save();
    await task2.save();

    const response = await request(app)
        .get('/api/tasks')
        .expect(200);  // Expect HTTP 200 status code

    expect(response.body.length).toBe(2);
    expect(response.body[0].title).toBe(task1.title);
    expect(response.body[1].title).toBe(task2.title);
});

it('should update a task', async () => {
    const task = new Task({ title: 'Task to Update', description: 'Update Me', status: 'Pending', dueDate: '2024-08-22' });
    await task.save();

    const updatedTask = {
        title: 'Updated Task',
        status: 'Completed'
    };

    const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .send(updatedTask)
        .expect(200);  

    expect(response.body.title).toBe('Updated Task');
    expect(response.body.status).toBe('Completed');
});

it('should delete a task', async () => {
    const task = new Task({ title: 'Task to Delete', description: 'Delete Me', status: 'Pending', dueDate: '2024-08-23' });
    await task.save();

    await request(app)
        .delete(`/api/tasks/${task._id}`)
        .expect(204);  // Expect HTTP 204 status code, no content

    const foundTask = await Task.findById(task._id);
    expect(foundTask).toBeNull();
});
