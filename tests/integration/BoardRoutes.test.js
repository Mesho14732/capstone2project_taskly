const request = require('supertest');
const app = require('../../app'); 
const { connectDB, disconnectDB } = require('../../src/config/dbConfig'); 
const Board = require('../../src/models/boardModel');
const User = require('../../src/models/userModel');

beforeAll(async () => {
    await connectDB();
  });
  
  afterAll(async () => {
    await disconnectDB();
  });
  
  let token;
let boardId;

beforeEach(async () => {
  // Create a test user and obtain a token
  const user = await User.create({ username: 'testuser', password: 'password' });
  token = user.generateAuthToken();

  // Create a test board
  const board = await Board.create({ title: 'Test Board', owner: user._id });
  boardId = board._id;
});

afterEach(async () => {
  // Clean up database after each test
  await User.deleteMany({});
  await Board.deleteMany({});
});

describe('POST /api/boards', () => {
    it('should create a new board', async () => {
      const res = await request(app)
        .post('/api/boards')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'New Board'
        });
  
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe('New Board');
    });
  });
  
  describe('GET /api/boards/:id', () => {
    it('should return a board if valid ID is provided', async () => {
      const res = await request(app)
        .get(`/api/boards/${boardId}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', boardId.toString());
    });
  
    it('should return 404 if board is not found', async () => {
      const invalidId = '609e0da2f0a0a67c5a8e6e6f';
      const res = await request(app)
        .get(`/api/boards/${invalidId}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.statusCode).toBe(404);
    });
  });
  