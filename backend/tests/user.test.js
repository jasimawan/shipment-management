const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/users');

let userOne;
const userOneId = new mongoose.Types.ObjectId();
bcrypt.hash('abc1234', 10)
  .then(hash => {
    userOne = {
      _id: userOneId,
      email: 'jasim123@example.com',
      name: 'Muhammad Jasim',
      type: 'worker',
      password: hash
    }
  });

beforeEach(async () => {
    jest.setTimeout(30000);
    await User.deleteMany();
    await new User(userOne).save();
});



test('Should signup a new user', async () =>{
    jest.setTimeout(30000);
    await request(app).post('/api/users/signup')
      .send({
      email: 'hello1@example.com',
      name: 'Hello1',
      type: 'worker',
      password: '1234abc'
    }).expect(201);
});

test('should login existing user', async () => {
  jest.setTimeout(30000);
  await request(app).post('/api/users/login').send({
    email: userOne.email,
    password: 'abc1234'
  }).expect(200);
});

test('should not login non existing user', async () => {
  jest.setTimeout(30000);
  await request(app).post('/api/users/login').send({
    email: userOne.email,
    password: 'abcd'
  }).expect(401);
});

test('should get the workers', async () => {
  jest.setTimeout(30000);
  await request(app).get('/api/users')
    .send().expect(200);

});

test('should delete worker', async () => {
  jest.setTimeout(30000);
  await request(app)
    .delete('/api/users/' +userOneId)
    .expect(200);
});

test('should not delete user which is not created', async () => {
  jest.setTimeout(30000);
  await request(app)
    .delete('/api/users/' +'1234')
    .expect(401);
});
