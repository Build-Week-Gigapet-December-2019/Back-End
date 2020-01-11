const server = require('./auth-router.js');
const request = require('supertest');
// const request = supertest(server);

const db = require('../db/dbConfig.js');

// beforeEach(async () => {
// this function executes and clears out the table before each test
// await db('parents').truncate();
// });

it('registers a user', async () => {
  const response = await request(server)
    .post('api/auth/register')
    .send("{'username': 'gannon','password': 'link'}");

  expect(response.status).toBe(201);
});
