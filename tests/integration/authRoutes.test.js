const request = require('supertest');
const app = require('../../app'); 
const { expect } = require('chai');
const mongoose = require('mongoose');
const User = require('../../src/models/userModel'); 

describe('Auth Routes Integration Tests', () => {

    before(async () => {
        await mongoose.connect(process.env.TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe('POST /auth/register', () => {
        it('should register a new user with valid data', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('token');
            expect(res.body.user).to.have.property('username', 'testuser');
        });

        it('should return 400 if required fields are missing', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    email: 'test@example.com',
                });

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message').that.includes('Username and password are required');
        });
    });

    describe('POST /auth/login', () => {
        before(async () => {
            await User.create({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        });

        it('should login a user with valid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
        });

        it('should return 401 for invalid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword'
                });

            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('message').that.includes('Invalid credentials');
        });
    });

});
